import React from 'react';
import { IoSearch } from "react-icons/io5";

const Table = () => {
  const data = [
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
  ];
  return (
    <div className="overflow-x-auto border-2 rounded-md mx-10 my-10">
      <div className='m-6 flex flex-wrap gap-3'>
        <div className="flex flex-col gap-3">
          <h1 className='text-3xl font-bold text-sky-500'>Attendance Report</h1>
          <div className="flex gap-2">
            <input type="text" className='border-2 text-lg rounded-md px-2 min-w-max border-sky-300' placeholder='Search by name or USN'/>
            <button className='border-2 rounded-md border-sky-300 px-2'><IoSearch className='text-sky-500'/></button>
          </div>
        </div>
      
        <div className="self-center ml-auto flex gap-3 flex-wrap">
          <button className={`rounded-md px-2 py-1 lg:text-lg h-min ${true?"bg-blue-500 text-white":"bg-blue-200 text-gray-400"}`}>All Students</button>
          <button className={`rounded-md px-2 py-1 lg:text-lg h-min ${false?"bg-blue-500 text-white":"bg-blue-200 text-gray-400"}`}>Present</button>
          <button className={`rounded-md px-2 py-1 lg:text-lg h-min ${false?"bg-blue-500 text-white":"bg-blue-200 text-gray-400"}`}>Absentees</button>
          <button className={`rounded-md px-2 py-1 lg:text-lg h-min ${false?"bg-blue-500 text-white":"bg-blue-200 text-gray-400"}`}>Leave Granted</button>
        </div>

      </div>
      <table className="table table-zebra text-lg">
        {/* head */}
        <thead>
          <tr className='text-lg'>
            <th></th>
            <th>Name</th>
            <th>USN</th>
            <th>Branch/Sem</th>
            <th className='flex'><span className='mx-auto'>Controls</span></th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {data.map((item,index)=>{
            return <tr>
            <th>{index+1}</th>
            <td>{item.name}</td>
            <td>{item.usn}</td>
            <td>{item.branch}/{item.sem}</td>
            <td className='flex justify-center gap-3'>
              <button className={`px-3 rounded-md py-2 text-sm lg:text-lg text-white ${item.status =="present"?"bg-green-500 font-semibold":"bg-green-200 font-thin opacity-80"}`}>Present</button>
              <button className={`px-3 rounded-md py-2 text-sm lg:text-lg text-white ${item.status =="absent"?"bg-red-400 font-semibold":"bg-red-200 font-thin opacity-80"}`}>Absent</button>
              <button className={`px-3 rounded-md py-2 text-sm lg:text-lg text-white ${item.status =="granted"?"bg-yellow-400 font-semibold":"bg-yellow-200 font-thin opacity-80"}`}>Leave Granted</button>
            </td>
          </tr>
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Table