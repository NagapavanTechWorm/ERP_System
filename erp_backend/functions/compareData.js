import processLoginDat from "./processLoginDat.js";
import readExcel from "./readFile.js";
import sendSMS from "./sendSMS.js";

async function compareData(loginFilePath, targetDate, startTime, endTime) {
  const userFilePath = 'user.xlsx';

  try { 
    const userWorkbook = await readExcel(userFilePath);
    const loginWorkbook = await processLoginDat(loginFilePath, targetDate, startTime, endTime);

    const userWorksheet = userWorkbook.getWorksheet('UserSheet');
    const loginWorksheet = loginWorkbook.getWorksheet('LoginSheet');

    const userData = [];

    userWorksheet.eachRow({ includeEmpty: true }, async (row, rowNumber) => {
      if (rowNumber > 1) { // Skip header row
        const userId = row.values[1];
        const userName = row.values[2];
        const status = findStatus(userId, loginWorksheet);
        userData.push({ id: userId, name: userName, status });
        userWorksheet.getCell(`C${rowNumber}`).value = status;

        if (status === 'absent') {
          const userPhoneNumber = row.getCell(4).value; // Assuming phone number is in column 4
          const smsMessage = `Dear ${userName}, you were absent on ${targetDate}. Please check your attendance.`;
          await sendSMS(userPhoneNumber, smsMessage);
        }
      }
    });

    await userWorkbook.xlsx.writeFile('user_uped.xlsx');

    // Fetch the modified Excel file and send SMS messages
    const updatedUserWorkbook = await readExcel('user_uped.xlsx');
    const updatedUserWorksheet = updatedUserWorkbook.getWorksheet('UserSheet');

    // Iterate through the rows and send SMS messages
    updatedUserWorksheet.eachRow({ includeEmpty: true }, async (row, rowNumber) => {
      if (rowNumber > 1) { // Skip header row
        const userPhoneNumber = row.getCell(4).value; // Assuming phone number is in column 4
        const status = row.getCell(3).value; // Assuming status is in column 3
        const userName = row.getCell(2).value;

        if (status === 'absent') {
          const smsMessage = `Dear ${userName}, you were absent on ${targetDate}. Please check your attendance.`;
          await sendSMS(userPhoneNumber, smsMessage);
        }
      }
    });

    const responseData = {
      data: userData,
      message: 'Comparison data retrieved successfully',
    };

    return responseData;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

function findStatus(userId, loginWorksheet) {
  let status = 'absent';

  loginWorksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
    if (rowNumber > 1) { // Skip header row
      const loginId = row.values[1];
      if (loginId === userId) {
        status = 'present';
      }
    }
  });

  return status;
}

export default compareData;
