import { useState, useEffect } from 'react';
import axios from 'axios';

const useWatchlistFetch = (dataUrl) => {
    const [data, setData] = useState([]);
    const [fetchWatchlistError, setFetchWatchlistError] = useState(null);
    const [isWatchlistLoading, setIsWatchlistLoading] = useState(null);

    useEffect(() => {
        let ignore = false;
        const controller = new AbortController();

        const fetchData = async (url) => {
            setIsWatchlistLoading(true);
            try {
                const response = await axios.get(url, {
                    signal: controller.signal
                });
                if (!ignore) {
                    setData(response.data);
                    setFetchWatchlistError(null);
                }
            } catch (err) {
                if (!ignore) {
                    setFetchWatchlistError(err.message);
                    console.log(err.message)
                    setData([]);
                }
            } finally {
                !ignore && setIsWatchlistLoading(false);
            }
        }



        fetchData(dataUrl);


        return () => {
            ignore = true;
            controller.abort()
        }

    }, [dataUrl]);
    return { data, fetchWatchlistError, isWatchlistLoading };
}

export default useWatchlistFetch