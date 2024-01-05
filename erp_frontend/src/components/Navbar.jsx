import React, { useState } from 'react'
import Timer from './Timer';

const Navbar = () => { 
    const [timer, setTimer] = useState(false);
    const handleTimer = ()=>{
        setTimer(!timer);
    }
  return ( 
    <nav className='bg-base-300'>
        <div className='navbar align-elements p-4'>
        <div className='navbar-start'>
            <h1 className='font-bold text-4xl'>AIEMS</h1>
        </div>
        <div className='navbar-center'>
            <p className='text-5xl font-semibold'>{timer ? <Timer duration={2 * 60} />:"Timer"}</p>
        </div>
        <div className='navbar-end'>
            <button className='btn btn-error font-semibold text-xl' onClick={handleTimer}>{timer?"Stop":"Close Door"}</button>
        </div>
    </div>
    </nav>
  )
}

export default Navbar;