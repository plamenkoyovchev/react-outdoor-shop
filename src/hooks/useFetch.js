import { useState, useEffect } from "react";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${baseUrl}${url}`);
        if (response.ok) {
          const data = await response.json();
          setData(data);
          setError("");
        } else {
          throw response;
        }
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return {
    data,
    loading,
    error,
  };
};

export default useFetch;
