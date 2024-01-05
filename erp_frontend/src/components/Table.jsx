import React, { useState } from 'react';
import { IoSearch } from "react-icons/io5";

const Table = ({data, setFilter, filter, setData}) => {
  
  return (
    <div className="overflow-x-auto border-2 align-elements rounded-md mx-auto my-10">
      <div className='m-6 flex flex-wrap gap-3'>
        <div className="flex flex-col gap-3">
          <h1 className='text-3xl font-bold text-sky-500'>Attendance Report</h1>
          <div className="flex gap-2">
            <input type="text" className='border-2 text-lg rounded-md px-2 min-w-max border-sky-300' placeholder='Search by name or USN'/>
            <button className='border-2 rounded-md border-sky-300 px-2 hover:bg-sky-300 hover:text-white text-sky-300'><IoSearch/></button>
          </div>
        </div>
      
        <div className="self-center ml-auto flex gap-3 flex-wrap">
          <button className={`rounded-md px-2 py-1 hover:scale-110 lg:text-lg h-min ${filter == "allStudents"?"bg-blue-500 text-white":"bg-blue-200 text-gray-400"}`} onClick={()=>{setFilter("allStudents")}}>All Students</button>
          <button className={`rounded-md px-2 py-1 hover:scale-110 lg:text-lg h-min ${filter == "present"?"bg-blue-500 text-white":"bg-blue-200 text-gray-400"}`} onClick={()=>{setFilter("present")}}>Present</button>
          <button className={`rounded-md px-2 py-1 hover:scale-110 lg:text-lg h-min ${filter == "absent"?"bg-blue-500 text-white":"bg-blue-200 text-gray-400"}`} onClick={()=>{setFilter("absent")}}>Absentees</button>
          <button className={`rounded-md px-2 py-1 hover:scale-110 lg:text-lg h-min ${filter == "granted"?"bg-blue-500 text-white":"bg-blue-200 text-gray-400"}`} onClick={()=>{setFilter("granted")}}>Leave Granted</button>
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
            return <tr key={index}>
            <th>{index+1}</th>
            <td>{item.name}</td>
            <td>{item.usn}</td>
            <td>{item.branch}/{item.sem}</td>
            <td className='flex justify-center gap-3'>
            <button
                onClick={() => setData((prev) => {
                  const newData = [...prev]; // Create a new array to avoid mutating the original state
                  newData[index] = { ...newData[index], status: "present" }; // Update the status of the specific item
                  return newData;
                })}
              className={`px-3 hover:scale-110 rounded-md py-2 text-sm lg:text-lg text-white ${item.status === "present" ? "bg-green-400 font-semibold" : "bg-green-200 font-thin opacity-80"}`}>Present</button>
              
              <button
                onClick={() => setData((prev) => {
                  const newData = [...prev]; // Create a new array to avoid mutating the original state
                  newData[index] = { ...newData[index], status: "absent" }; // Update the status of the specific item
                  return newData;
                })}
              className={`px-3 hover:scale-110 rounded-md py-2 text-sm lg:text-lg text-white ${item.status === "absent" ? "bg-red-400 font-semibold" : "bg-red-200 font-thin opacity-80"}`}>Absent</button>
              
              <button
                onClick={() => setData((prev) => {
                  const newData = [...prev]; // Create a new array to avoid mutating the original state
                  newData[index] = { ...newData[index], status: "granted" }; // Update the status of the specific item
                  return newData;
                })}
              className={`px-3 hover:scale-110 rounded-md py-2 text-sm lg:text-lg text-white ${item.status === "granted" ? "bg-yellow-400 font-semibold" : "bg-yellow-200 font-thin opacity-80"}`}>Leave Granted</button>

            </td>
          </tr>
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Table