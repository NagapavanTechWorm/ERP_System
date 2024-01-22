import fs from 'fs';
import ExcelJS from 'exceljs';

async function processLoginDat(filePath, targetDate, startTime, endTime) {
    return new Promise((resolve, reject) => {
      const rawData = fs.readFileSync(filePath, 'utf-8');
      const lines = rawData.trim().split('\n');
  
      const loginData = [];
  
      lines.forEach((line) => {
        const [id, date, time] = line.trim().split(/\s+/);
        if (date === targetDate && isTimeInRange(time, startTime, endTime)) {
          loginData.push({ id, date, time });
        }
      });
  
      if (loginData.length === 0) {
        console.log(`No data found for the specified date ${targetDate} and time range ${startTime} to ${endTime}`);
        resolve([]);
        return;
      }
  
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('LoginSheet');
  
      worksheet.addRow(['ID', 'Date', 'Time']);
  
      loginData.forEach((data) => {
        worksheet.addRow(Object.values(data));
        console.log(data);
      });
  
      workbook.xlsx.writeFile(`login.xlsx`)
        .then(() => {
          console.log(`Login Excel file for ${targetDate} created successfully!`);
          resolve(workbook);
        })
        .catch((error) => {
          console.error('Error:', error);
          reject(error);
        });
    });
  }

  function isTimeInRange(time, startTime, endTime) {
    return time >= startTime && time <= endTime;
  }
  

  export default processLoginDat;