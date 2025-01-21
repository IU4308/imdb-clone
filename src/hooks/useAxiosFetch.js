import { useState, useEffect } from 'react';
import axios from 'axios';

const useAxiosFetch = (dataUrl, queryLength) => {
    const [data, setData] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    // console.log(dataUrl, queryLength)
    useEffect(() => {
        let ignore = false;
        const controller = new AbortController();

        const fetchData = async (url) => {
            console.log(dataUrl)
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
                    console.log('hello111')
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
    // console.log(data)
    // console.log(fetchError)
    return { data, fetchError, isLoading };
}

export default useAxiosFetch