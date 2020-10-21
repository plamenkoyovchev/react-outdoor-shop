import { useEffect, useState } from "react";

const useFetchAll = (urls) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const promises = urls.map((url) => 
            fetch(`${process.env.REACT_APP_API_BASE_URL}${url}`)
                .then((response) => {
                    if(response.ok) {
                        return response.json();
                    }

                    throw response;
                }));

        Promise.all(promises)
                .then((json) => setData(json))
                .catch((e) => setError(e))
                .finally(() => setLoading(false));
    }, [urls]);

    return {data, loading, error};
};

export default useFetchAll;