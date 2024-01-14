import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetUrls = () => {
  const userId = "2bd46515-cd09-4b18-8673-254efd5d7d07";
  // Fetch URLS from the API using axios
  const fetchURLs = axios
    .get(`http://localhost:5005/user/${userId}`)
    .then((res) => res.data)
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Server responded with an error:", error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received from the server");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up the request:", error.message);
      }
    });
  // Use the useQuery hook to fetch and manage data
  return useQuery({
    queryKey: ["URLs"],
    queryFn: () => fetchURLs,
  });
};

export default useGetUrls;
