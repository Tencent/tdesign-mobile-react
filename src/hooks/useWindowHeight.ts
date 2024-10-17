import { useState } from 'react';

const useWindowHeight = () => {
  const [height, setHeight] = useState(window.innerHeight);
  window.onresize = () => {
    const height = window.innerHeight;
    setHeight(height);
  };
  return height;
};

export default useWindowHeight;
