import ExcelJS from 'exceljs';

async function readExcel(filePath) {
    return new Promise((resolve, reject) => {
      const workbook = new ExcelJS.Workbook();
      workbook.xlsx.readFile(filePath)
        .then(() => {
          resolve(workbook);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  export default readExcel;