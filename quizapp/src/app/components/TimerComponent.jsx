'use client'
import React from 'react';
import { useTimer } from 'react-timer-hook';

function MyTimer({ expiryTimestamp, setResultScreen }) {
  const {
    seconds,
  } = useTimer({ expiryTimestamp, onExpire: () => setResultScreen(0) });


  return (
    <div style={{textAlign: 'center'}}>
      <div style={{fontSize: '100px'}}>
        <span>{seconds}</span>
      </div>
      
    </div>
  );
}

export default function TimerComponent({ setResultScreen }) {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 10); // 10 minutes timer
  return (
    <div>
      <MyTimer expiryTimestamp={time} setResultScreen={setResultScreen} />
    </div>
  );
}