import React, { useState } from 'react'
import Timer from './Timer';

const Navbar = () => { 
    const [timer, setTimer] = useState(false);
    const handleTimer = ()=>{
        setTimer(!timer);
    }

      const duration = 20*60; //input time
        const minutes = Math.floor(duration/60);
        const seconds = duration % 60;

  return ( 
    <nav className='bg-base-300'>
        <div className='navbar align-elements p-1 md:p-4'>
        <div className='navbar-start'>
            <h1 className='font-bold text-2xl md:text-4xl'>AIEMS</h1>
        </div>
        <div className='navbar-center'>
            <div className='text-2xl  md:text-5xl font-semibold'>{timer ? <Timer duration={duration} />:
            <div className="flex gap-5"> 
    <div>
      <span className="countdown font-mono ">
        <span style={{"--value":minutes}}></span>
      </span>
      min
    </div> 
    <div>
      <span className="countdown font-mono ">
        <span style={{"--value":seconds}}></span>
      </span>
      sec
    </div>
  </div>
    }</div>
        </div>
        <div className='navbar-end'>
            <button className='btn btn-error font-semibold text-sm md:text-xl md:py-1' onClick={handleTimer}>{timer?"Stop/Reset":"Close Door"}</button>
        </div>
    </div>
    </nav>
  )
}

export default Navbar;