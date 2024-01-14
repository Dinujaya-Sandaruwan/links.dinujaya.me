import { useState, useEffect } from "react";

// Hook for adding userId to local storage
export const useLocalStorageAdd = (userId) => {
  useEffect(() => {
    localStorage.setItem("userId", userId);
  }, [userId]);
};
