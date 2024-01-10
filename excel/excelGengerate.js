const Excel = require('exceljs');
const fs = require('fs');

const dir = '/path/to/excel';

// 'excel' 폴더가 없으면 생성
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const createAndDownloadExcel = async (req, res) => {
  let workbook = new Excel.Workbook();
  let worksheet = workbook.addWorksheet('My Sheet');

  // 데이터 추가
  worksheet.addRow(['ID', 'Name', 'Age']);
  worksheet.addRow([1, 'John Doe', 30]);

  // 파일을 'excel' 폴더에 저장
  const tempFilePath = `${dir}/file.xlsx`;
  try {
    await workbook.xlsx.writeFile(tempFilePath);
    res.download(tempFilePath, 'report.xlsx');
  } catch (error) {
    res.status(500).send('Error creating Excel file');
  }
};

module.exports = { createAndDownloadExcel };
