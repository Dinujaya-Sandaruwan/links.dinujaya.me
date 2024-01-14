import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetUrls = (userId) => {
  const getURLs = () =>
    axios
      .get(`http://localhost:5005/user/${userId}`)
      .then((res) => res.data)
      .catch((error) => {
        // Handle errors here if needed
        throw error;
      });

  return useQuery({
    queryKey: ["urls"],
    queryFn: getURLs,
  });
};

export default useGetUrls;
