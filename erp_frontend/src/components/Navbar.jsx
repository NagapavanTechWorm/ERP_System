import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Timer from './Timer';

const Navbar = ({ setData, setPresent }) => {
  const [timer, setTimer] = useState(false);
  const [duration, setDuration] = useState(10); // Initial duration
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;

  const handleTimer = () => {
    setTimer(!timer);
  };

  useEffect(() => {
    let timerInterval;

    const fetchData = async () => {
      if (duration === 0) {
        try {
          const response = await axios.get("http://localhost:3000/login-sms/");
          const fetchedData = response.data;
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
    };

    fetchData();

    if (timer) {
      timerInterval = setInterval(() => {
        setDuration(prevDuration => (prevDuration > 0 ? prevDuration - 1 : 0));
      }, 1000);
    } else {
      clearInterval(timerInterval);
    }

    return () => clearInterval(timerInterval);

  }, [timer, duration, setData, setPresent]);

  return (
    <nav className='bg-base-300'>
      <div className='navbar align-elements p-1 md:p-4'>
        <div className='navbar-start'>
          <h1 className='font-bold text-2xl md:text-4xl'>AIEMS</h1>
        </div>
        <div className='navbar-center'>
          <div className='text-2xl md:text-5xl font-semibold'>
            {timer ? (
              <Timer duration={duration} />
            ) : (
              <div className='flex gap-5'>
                <div>
                  <span className='countdown font-mono '>
                    <span style={{ '--value': minutes }}></span>
                  </span>
                  min
                </div>
                <div>
                  <span className='countdown font-mono '>
                    <span style={{ '--value': seconds }}></span>
                  </span>
                  sec
                </div>
              </div>
            )}
          </div>
        </div>
        <div className='navbar-end'>
          <button
            className='btn btn-error font-semibold text-sm md:text-xl md:py-1'
            onClick={handleTimer}
          >
            {timer ? 'Stop/Reset' : 'Close Door'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
