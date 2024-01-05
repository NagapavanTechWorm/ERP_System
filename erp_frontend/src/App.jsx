import { useState, useEffect } from "react"
import { Navbar, Table,Graph ,CalenderCard} from "./components"
import { Calendar } from "antd";

function App() {
  const [data, setData] = useState([
    {
      name:"Rishi",
      usn:"1AR21CS036",
      branch:"CSE",
      sem:"5th",
      status:"present"
    },
    {
      name:"Nagapavan A",
      usn:"1AR21CS029",
      branch:"CSE",
      sem:"5th",
      status:"absent"
    },
    {
      name:"Rudresh P",
      usn:"1AR21CS038",
      branch:"CSE",
      sem:"5th",
      status:"granted"
    },
  ]);
  const [filter, setFilter] = useState("allStudents");
  return (
    <main className="pb-20">
      <Navbar/>
      <Graph/>
      <Table setFilter={setFilter} filter={filter} data={data} setData={setData}/>  
      <div className="flex justify-center">
        <button className="text-lg px-2 py-2 rounded-md w-5/12 font-bold text-white bg-red-400">Send Message</button>
      </div>
    </main>
  )
}

export default App
