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
    // 설문조사의 모든 질문을 검색
    const questions = await Question.findAll({
      where: { surveyId: surveyId },
    });

    if (!questions.length) {
      return res
        .status(404)
        .send('Survey not found or no questions associated with it.');
    }

    // 첫 번째 행(헤더)에 질문 내용 추가
    const header = questions.map((q) => q.content);
    worksheet.addRow(header);

    // 답변 데이터를 담을 객체 초기화
    let answerRows = {};

    // 모든 답변을 검색
    for (const question of questions) {
      answerRows[question.id] = [];
      const answers = await Answer.findAll({
        where: { questionId: question.id },
      });

      for (const answer of answers) {
        if (answer.objContent) {
          const choice = await Choice.findByPk(answer.objContent);
          answerRows[question.id].push(choice ? choice.option : 'N/A');
        } else {
          answerRows[question.id].push(answer.subContent || 'N/A');
        }
      }
    }

    // 답변 데이터를 엑셀에 추가
    const questionIds = questions.map((q) => q.id);
    const maxAnswers = Math.max(
      ...Object.values(answerRows).map((arr) => arr.length),
    );
    for (let i = 0; i < maxAnswers; i++) {
      let row = questionIds.map((id) => answerRows[id][i] || '');
      worksheet.addRow(row);
    }

    const tempFilePath = `/path/to/excel/survey_answers_${surveyId}.xlsx`;
    await workbook.xlsx.writeFile(tempFilePath);
    res.download(tempFilePath, `survey_answers_${surveyId}.xlsx`);
  } catch (error) {
    console.error('Error creating Excel file', error);
    res.status(500).send('Error creating Excel file');
  }
};

module.exports = { createAndDownloadExcel };
