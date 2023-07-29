import { useEffect, useState } from "react";

const useMediaQuery = (breakpoint) => {
  const [isMatch, setIsMatch] = useState(false);

  useEffect(() => {
    const handleResize = (e) =>
      setIsMatch(
        typeof window !== "undefined" && window.innerWidth < breakpoint
      );

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [breakpoint]);

  return isMatch;
};

export default useMediaQuery;
