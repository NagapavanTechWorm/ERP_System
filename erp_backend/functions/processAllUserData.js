import ExcelJS from 'exceljs';
import readExcel from './readFile.js';

async function processAllUserData(filePath) {
    return new Promise(async (resolve, reject) => {
      try {
        const userWorkbook = await readExcel(filePath);
        const userWorksheet = userWorkbook.getWorksheet('UserSheet');
  
        const allUserData = [];
  
        userWorksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
          if (rowNumber > 1) { // Skip header row
            const userId = row.getCell(1).value;
            const userName = row.getCell(2).value;
            const status = row.getCell(3).value; // Assuming status is in column 3
            const number = row.getCell(4).value;
            allUserData.push({ id: userId, name: userName, status, number });
          }
        });
  
        const responseData = {
          data: allUserData,
          message: 'User data retrieved successfully',
        };
  
        resolve(responseData);
      } catch (error) {
        console.error('Error processing user data:', error);
        reject(error);
      }
    });
  }

  export default processAllUserData;