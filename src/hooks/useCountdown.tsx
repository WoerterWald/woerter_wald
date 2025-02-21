import { useEffect, useState } from 'react';

const getSecondsUntilMidnight = () => {
  const now = Date.now();
  const midnight = new Date().setHours(24, 0, 0, 0);

  return Math.max(0, Math.floor((midnight - now) / 1000));
};

function formatTime(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hours}h ${minutes}m ${secs}s`;
}

export const useCountdown = () => {
  const [timeLeft, setTimeLeft] = useState(getSecondsUntilMidnight());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getSecondsUntilMidnight());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return formatTime(timeLeft);
};
