const nodemailer = require('nodemailer');
const sharp = require('sharp');
const path = require('path');
const { Survey } = require('../models');

// 이미지 압축 함수
const compressImage = async (inputPath, outputPath) => {
  const extension = path.extname(inputPath).toLowerCase();
  try {
    if (extension === '.jpg' || extension === '.jpeg') {
      await sharp(inputPath).jpeg({ quality: 60 }).toFile(outputPath);
    } else if (extension === '.png') {
      await sharp(inputPath).png({ compressionLevel: 5 }).toFile(outputPath);
    } else {
      throw new Error('Unsupported file format');
    }
  } catch (error) {
    console.error('Error compressing image:', error);
    throw error;
  }
};

// 이메일 전송 함수
const sendMail = (transporter, options) => {
  return new Promise((resolve, reject) => {
    transporter.sendMail(options, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
};

// 설문조사 이메일 전송 함수
const sendSurveyEmailWithSurveyId = async (surveyId, emails) => {
  try {
    const survey = await Survey.findByPk(surveyId);
    if (!survey) {
      throw new Error('설문조사를 찾을 수 없습니다');
    }

    const originalImagePath = path.join(process.cwd(), 'image', '깃허브.png');
    const compressedFileName = `compressed-${path.basename(originalImagePath)}`;
    const compressedImagePath = path.join(
      process.cwd(),
      'image',
      compressedFileName,
    );

    await compressImage(originalImagePath, compressedImagePath);

    // 이메일 전송 설정 (OAuth2 인증 사용)
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: true, // true for 465, false for other ports
      auth: {
        type: 'OAuth2',
        user: process.env.GMAIL_OAUTH_USER,
        clientId: process.env.GMAIL_OAUTH_CLIENT_ID,
        clientSecret: process.env.GMAIL_OAUTH_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_OAUTH_REFRESH_TOKEN,
      },
    });

    // 모든 이메일에 대한 프로미스 생성
    const emailPromises = emails.map((email) => {
      const mailOptions = {
        from: `"Survey Team" <${process.env.EMAIL}>`,
        to: email,
        subject: '설문조사 참여 요청',
        html: `
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="background-color: #eeeeee; padding: 20px;">
                <table cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="background-color: #ffffff; padding: 20px; text-align: center;">
                      <h1 style="color: #333333;">설문조사 참여 요청</h1>
                      <img src="cid:compressedImage" alt="설명_텍스트" style="max-width: 100%; height: auto;">
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
            filename: compressedFileName,
            path: compressedImagePath,
            cid: 'compressedImage',
          },
        ],
      };

      return sendMail(transporter, mailOptions);
    });

    // 모든 이메일 전송
    await Promise.all(emailPromises);

    console.log('All emails sent');
    return { message: '이메일 발송 요청 완료' };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = { sendSurveyEmailWithSurveyId };
