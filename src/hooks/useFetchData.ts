import { useState, useEffect } from "react";

const useFetchData = (list: any, master: string, api: string) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${api}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ names: list, master }),
        });
        const result = await response.json();
        if (result.data) {
          setData(result.data);
        } else {
          setIsError(true);
        }
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [list, master, api]);

  console.log("12313");
  return { data, isLoading, isError };
};

export default useFetchData;
