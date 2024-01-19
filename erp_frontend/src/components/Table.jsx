import React, { useState } from 'react';
import { IoSearch } from "react-icons/io5";

const Table = ({data, setFilter, filter, setData}) => {
  
  return (
    <div className="overflow-x-auto border-2 align-elements rounded-md mx-auto my-10">
      <div className='m-6 flex flex-wrap gap-3'>
          <h1 className='text-3xl font-bold text-sky-500'>Attendance Report</h1>
      </div>
      <table className="table table-zebra text-lg">
        {/* head */}
        <thead>
          <tr className='text-lg'>
            <th></th>
            <th>Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {data.map((item,index)=>{
            return <tr key={index}>
            <th>{index+1}</th>
            <td>{item.name}</td>
            <td className={`${item.status == "absent"?"text-red-400":"text-green-400"}`}>{item.status}</td>
          </tr>
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Table