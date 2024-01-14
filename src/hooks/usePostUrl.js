import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";

const usePostUrl = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) =>
      axios
        .post("http://localhost:5005/shortUrls", {
          data,
        })
        .then((res) => res.data),
    onSuccess: (savedData, newData) => {
      //   Invalidating the cache will cause a refetch of the data
      queryClient.invalidateQueries({
        queryKey: ["urls"],
      });
      console.log(savedData, newData);
    },
  });
};

export default usePostUrl;
