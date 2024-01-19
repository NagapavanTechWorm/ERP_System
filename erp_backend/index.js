import express from "express";
import processAllUserData from "./functions/processAllUserData.js"
import compareData from "./functions/compareData.js";
import { config } from 'dotenv';
import CORSMiddleware from "./functions/Cors.js"

config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(CORSMiddleware);



app.get("/user", async (req, res) => {
  const userFilePath = 'user.xlsx';

  try {
    const userData = await processAllUserData(userFilePath);
    res.json(userData);
  } catch (err) {
    console.error('Error processing user data:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get("/login-sms", async (req, res) => {
  const loginFilePath = './data/login.dat';
  const targetDate = '03-12-2023';
  const startTime = '20:00';
  const endTime = '22:00';

  try {
    const comparisonData = await compareData(loginFilePath, targetDate, startTime, endTime);
    res.json(comparisonData.data);
  } catch (err) {
    console.error('Error processing login data:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server on PORT ${PORT}`);
});



