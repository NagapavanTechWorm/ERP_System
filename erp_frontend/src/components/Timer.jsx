import React, { useState, useEffect } from 'react';

const Timer = ({ duration }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    const updateTimer = () => {
      setTimeLeft(prevTimeLeft => (prevTimeLeft > 0 ? prevTimeLeft - 1 : 0));
    };

    const intervalId = setInterval(updateTimer, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // Convert seconds to minutes and seconds
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
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
  );
};
export default Timer;