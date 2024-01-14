import { useState, useEffect } from "react";

// Hook for reading userId from local storage
export const useLocalStorageRead = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    setUserId(storedUserId);
  }, []);

  return userId;
};
