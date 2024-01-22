import { useState, useEffect } from "react"
import { Navbar, Table,Graph ,CalenderCard} from "./components"
import { Calendar } from "antd";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [present,setPresent] = useState({present:0,absent:0});
  const [filter, setFilter] = useState("allStudents");
  useEffect(()=>{
    getData();
  },[])

  async function getData() {
    try {
      const response = await axios.get("http://localhost:3000/user/");
      const fetchedData = response.data.data;
      console.log(fetchedData);
      // Calculate the number of students present and absent

      const presentCount = fetchedData.filter(student => student.status === "present").length;
      const absentCount = fetchedData.length - presentCount;

      // Update state
      setData(fetchedData);
      setPresent({ present: presentCount, absent: absentCount });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <main className="pb-20">
      <Navbar setData={setData} setPresent={setPresent} />
      <Graph present={present.present} absent={present.absent}/>
      <Table setFilter={setFilter} filter={filter} data={data} setData={setData}/>  
      <div className="flex justify-center">
        <button className="text-lg px-2 py-2 rounded-md w-5/12 font-bold text-white bg-red-400">Send Message</button>
      </div>
    </main>
  )
}

export default App
