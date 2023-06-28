import { Dispatch, SetStateAction, useEffect, useState } from "react";

const useSearchDebounce = (initialTerm = "", delay = 100) => {
  const [currentTerm, setCurrentTerm] = useState(initialTerm);
  const [searchTerm, setSearchTerm] = useState(initialTerm);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    timer = setTimeout(() => {
      if (currentTerm !== searchTerm) {
        setSearchTerm(currentTerm);
      }
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [currentTerm]);

  return [searchTerm, setCurrentTerm] as [
    string,
    Dispatch<SetStateAction<string>>
  ];
};

export default useSearchDebounce;
