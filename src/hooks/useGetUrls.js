import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetUrls = () => {
  const userId = "2bd46515-cd09-4b18-8673-254efd5d7d07";

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
