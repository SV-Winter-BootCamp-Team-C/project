const nodemailer = require('nodemailer');
const { Survey } = require('../models');

const sendSurveyEmailWithSurveyId = async (surveyId, emails) => {
  try {
    const survey = await Survey.findByPk(surveyId);
    if (!survey) {
      throw new Error('설문조사를 찾을 수 없습니다');
    }

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: true,
      auth: {
        type: 'OAuth2',
        user: process.env.GMAIL_OAUTH_USER,
        clientId: process.env.GMAIL_OAUTH_CLIENT_ID,
        clientSecret: process.env.GAMIL_OAUTH_CLIENT_SECRET,
        refreshToken: process.env.GAMIL_OAUTH_REFRESH_TOKEN,
      },
    });

    await Promise.all(
      emails.map((email) =>
        transporter.sendMail({
          from: `"Survey Team" <${process.env.EMAIL}>`,
          to: email,
          subject: '설문조사 참여 요청',
          text: `설문조사에 참여해주세요: ${survey.url}`,
          html: `<b>설문조사 링크:</b> <a href="${survey.url}">${survey.url}</a>`,
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
