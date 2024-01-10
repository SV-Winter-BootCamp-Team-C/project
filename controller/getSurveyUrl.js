const { Survey } = require('../models');

const getUrl = async (req, res) => {
  try {
    const surveyId = req.params.id;
    const survey = await Survey.findByPk(surveyId);

    if (!survey) {
      return res.status(404).json({ message: '설문이 존재하지 않습니다.' });
    } else {
      return res.json({ url: survey.url });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'URL을 생성하는데 실패하였습니다' });
  }
};

module.exports = { getUrl };
