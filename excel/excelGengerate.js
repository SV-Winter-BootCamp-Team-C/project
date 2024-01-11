const Excel = require('exceljs');
const fs = require('fs');
const { Question, Answer, Choice } = require('../models');

const dir = '/path/to/excel';

// 'excel' 폴더가 없으면 생성
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const createAndDownloadExcel = async (req, res) => {
  const surveyId = req.params.surveyId;
  let workbook = new Excel.Workbook();
  let worksheet = workbook.addWorksheet('Survey Answers');

  try {
    const questions = await Question.findAll({
      where: { surveyId: surveyId },
    });

    if (!questions.length) {
      return res
        .status(404)
        .send('Survey not found or no questions associated with it.');
    }

    const header = ['UserID', ...questions.map((q) => q.content)];
    worksheet.addRow(header);

    let userData = {};

    for (const question of questions) {
      const answers = await Answer.findAll({
        where: { questionId: question.id },
      });

      for (const answer of answers) {
        const userId = answer.userId;
        if (!userData[userId]) {
          userData[userId] = {};
        }
        if (!userData[userId][question.id]) {
          userData[userId][question.id] = [];
        }

        if (answer.objContent) {
          const choice = await Choice.findByPk(answer.objContent);
          userData[userId][question.id].push(choice ? choice.option : 'N/A');
        } else {
          userData[userId][question.id].push(answer.subContent || 'N/A');
        }
      }
    }

    Object.keys(userData).forEach((userId) => {
      const userRow = [userId];
      questions.forEach((question) => {
        const answers = userData[userId][question.id] || [];
        userRow.push(answers.join(', '));
      });
      worksheet.addRow(userRow);
    });

    const tempFilePath = `/path/to/excel/survey_answers_${surveyId}.xlsx`;
    await workbook.xlsx.writeFile(tempFilePath);
    res.download(tempFilePath, `survey_answers_${surveyId}.xlsx`);
  } catch (error) {
    console.error('Error creating Excel file', error);
    res.status(500).send('Error creating Excel file');
  }
};

module.exports = { createAndDownloadExcel };
