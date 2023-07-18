import { useEffect, useState } from "react";

const useWidthHook = () => {

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {

    window.addEventListener('resize', () => {
      setWidth(window.innerWidth);
    });


  }, []);

  return { width };

};

export default useWidthHook;