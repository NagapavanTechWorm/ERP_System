import fs from 'fs';
import csv from 'csv-parser';
import ExcelJS from 'exceljs';
import { format } from 'date-fns';

async function process(filePath, targetDate, startTime, endTime) {
  return new Promise((resolve, reject) => {
    // Array to store login records
    const loginRecordsArray = [];

    // Read the CSV file
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        // Extract the punch records from the last entry
        const punchRecords = row['Punch Records '].split(' ');
        const filteredRecords = punchRecords.filter(record => record !== '');

        if (
          filteredRecords[filteredRecords.length - 1] &&
          row.Date === targetDate &&
          isTimeInRange(filteredRecords[filteredRecords.length - 1], startTime, endTime)
        ) {
          const match = filteredRecords[filteredRecords.length - 1].match(/(\d{2}:\d{2}):?/);
          const extractedTime = match[1];

          // Format the date in "DD-MM-YYYY" format
          const formattedDate = format(new Date(row.Date), 'dd-MM-yyyy');

          // Create an object for each login record
          const loginRecord = {
            ID: row[' Employee Code '],
            Date: formattedDate,
            Time: extractedTime,
          };

          // Push the login record object to the array
          loginRecordsArray.push(loginRecord);
        }
      })
      .on('end', async () => {
        try {
          if (loginRecordsArray.length === 0) {
            console.log(`No data found for the specified date ${targetDate} and time range ${startTime} to ${endTime}`);
            resolve([]);
            return;
          }

          // Save filtered login records to Excel using exceljs
          const workbook = await saveLoginRecordsToExcel(loginRecordsArray);
          console.log('Login records saved to login.xlsx');
          resolve(workbook);
        } catch (error) {
          console.error('Error:', error);
          reject(error);
        }
      });
  });
}

async function saveLoginRecordsToExcel(loginRecordsArray) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Login Records');

  // Define headers
  worksheet.columns = [
    { header: 'ID', key: 'ID' },
    { header: 'Date', key: 'Date' },
    { header: 'Time', key: 'Time' },
  ];

  // Add data to the worksheet
  worksheet.addRows(loginRecordsArray);

  // Save workbook to file
  await workbook.xlsx.writeFile('login.xlsx');
  return workbook;
}

function isTimeInRange(time, startTime, endTime) {
  return time >= startTime && time <= endTime;
}

export default process;
