'use client'
import React from 'react';
import { useTimer } from 'react-timer-hook';

function MyTimer({ expiryTimestamp, setResultScreen }) {
  const {
    minutes,
    seconds,
  } = useTimer({ expiryTimestamp, onExpire: () => setResultScreen(0) });

  const time = seconds + minutes * 60;

  return (
    <div style={{textAlign: 'center'}}>
      <div style={{fontSize: '100px'}}>
        <span>{time}</span>
      </div>
      
    </div>
  );
}

export default function TimerComponent({ setResultScreen, timePerQuestion }) {
  const time = new Date();
  console.log("Time per question is NOW:", timePerQuestion);
  time.setSeconds(time.getSeconds() + timePerQuestion);
  return (
    <div>
      <MyTimer expiryTimestamp={time} setResultScreen={setResultScreen} />
    </div>
  );
}