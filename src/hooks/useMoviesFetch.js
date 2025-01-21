import { useState, useEffect } from 'react';
import axios from 'axios';

const useMoviesFetch = (dataUrl, queryLength) => {
    const [data, setData] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    useEffect(() => {
        let ignore = false;
        const controller = new AbortController();

        const fetchData = async (url) => {
            setIsLoading(true);
            try {
                const response = await axios.get(url, {
                    signal: controller.signal
                });
                if (!ignore) {
                    setData(response.data);
                    setFetchError(null);
                }
            } catch (err) {
                if (!ignore) {
                    setFetchError(err.message);
                    setData([]);
                }
            } finally {
                !ignore && setIsLoading(false);
            }
        }


        if (queryLength > 0 || queryLength == null) {
            fetchData(dataUrl);
        }

        return () => {
            ignore = true;
            controller.abort()
        }

    }, [dataUrl, queryLength]);
    return { data, fetchError, isLoading };
}

export default useMoviesFetch