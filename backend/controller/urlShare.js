const nodemailer = require('nodemailer');
const sharp = require('sharp');
const { Survey } = require('../models');

// 이미지 압축 함수
const compressImage = async (inputPath, outputPath, width) => {
  try {
    await sharp(inputPath).resize(width).toFile(outputPath);
  } catch (error) {
    console.error('Error compressing image:', error);
    throw error;
  }
};

// 설문조사 이메일 전송 함수
const sendSurveyEmailWithSurveyId = async (surveyId, emails) => {
  try {
    const survey = await Survey.findByPk(surveyId);
    if (!survey) {
      throw new Error('설문조사를 찾을 수 없습니다');
    }

    // 이미지 압축
    const originalImagePath =
      'backend/image/F18F2559-787E-41CC-BDEE-72A715DAE3E2.jpg'; // 원본 이미지 경로
    console.log('이미지를 가지고 왔습니다.', { originalImagePath });
    const compressedImagePath =
      'backend/image/F18F2559-787E-41CC-BDEE-72A715DAE3E2.jpg'; // 압축된 이미지 저장 경로
    const imageWidth = 600; // 압축될 이미지의 너비
    await compressImage(originalImagePath, compressedImagePath, imageWidth);

    // 이메일 전송 설정
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: true,
      auth: {
        type: 'OAuth2',
        user: process.env.GMAIL_OAUTH_USER,
        clientId: process.env.GMAIL_OAUTH_CLIENT_ID,
        clientSecret: process.env.GMAIL_OAUTH_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_OAUTH_REFRESH_TOKEN,
      },
    });

    // 이메일 전송
    await Promise.all(
      emails.map((email) =>
        transporter.sendMail({
          from: `"Survey Team" <${process.env.EMAIL}>`,
          to: email,
          subject: '설문조사 참여 요청',
          text: `설문조사에 참여해주세요: ${survey.url}`,
          html: `
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="background-color: #eeeeee; padding: 20px;">
                <table cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="background-color: #ffffff; padding: 20px; text-align: center;">
                      <h1 style="color: #333333;">설문조사 참여 요청</h1>
                      <!-- 이미지 추가 -->
                      <img src="cid:logoImg" alt="설명_텍스트" style="max-width: 100%; height: auto;">,
                      

                      <p style="color: #555555; font-size: 16px;">
                        귀하를 설문조사에 초대합니다. 아래 링크를 클릭하여 참여해 주세요.
                      </p>
                      <a href="${survey.url}" style="background-color: #918DCA; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 20px;">
                        설문조사 참여하기
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>`,
          attachments: [
            {
              filename: 'F18F2559-787E-41CC-BDEE-72A715DAE3E2.jpg',
              path: compressedImagePath,
              cid: 'logoImg',
            },
          ],
        }),
      ),
    );

    console.log('All emails sent');
    return { message: '이메일 발송 요청 완료' };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = { sendSurveyEmailWithSurveyId };
