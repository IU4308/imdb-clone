import { useState, useEffect } from 'react';
import axios from 'axios';

const useMetaFetch = (dataUrl) => {
    const [meta, setMeta] = useState({});
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
                    setMeta(response.data);
                    setFetchError(null);
                }
            } catch (err) {
                if (!ignore) {
                    setFetchError(err.message);
                    setMeta({});
                }
            } finally {
                !ignore && setIsLoading(false);
            }
        }

        fetchData(dataUrl);


        return () => {
            ignore = true;
            controller.abort()
        }

    }, [dataUrl]);
    return { meta, fetchError, isLoading };
}

export default useMetaFetch
