import { useState, useLayoutEffect } from 'react';

function getWindowDimensions() {
  const { innerWidth: widthe, innerHeight: heighte } = window;
  return {
    widthe,
    heighte
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useLayoutEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}