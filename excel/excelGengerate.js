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
      include: [{ model: Answer, required: false }],
    });

    if (!questions.length) {
      return res
        .status(404)
        .send('Survey not found or no questions associated with it.');
    }

    for (const question of questions) {
      const row = [question.id, question.content];

      for (const answer of question.Answers) {
        if (answer.objContent) {
          // objContent 필드를 사용하여 Choice 모델의 데이터를 조회
          const choice = await Choice.findByPk(answer.objContent);
          if (choice) {
            row.push(choice.content); // 객관식 답변
          }
        } else {
          row.push(answer.subContent); // 서술식 답변
        }
      }

      worksheet.addRow(row);
    }

    const tempFilePath = `${dir}/survey_answers_${surveyId}.xlsx`;
    await workbook.xlsx.writeFile(tempFilePath);
    res.download(tempFilePath, `survey_answers_${surveyId}.xlsx`);
  } catch (error) {
    console.error('Error creating Excel file', error);
    res.status(500).send('Error creating Excel file');
  }
};

module.exports = { createAndDownloadExcel };
