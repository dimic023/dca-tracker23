import { useState, useEffect } from "react";
//import { IS_WINDOW_LOADED } from "utils";

const IS_WINDOW_LOADED = typeof window !== "undefined" ? true : false;

const useWindowSize = () => {
  const [isSmall, setIsSmall] = useState(false);

  const updateSize = () => {
    if (IS_WINDOW_LOADED) {
      const width = window.innerWidth;
      width > 1024 ? setIsSmall(false) : setIsSmall(true);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  });

  return isSmall;
};

export default useWindowSize;
