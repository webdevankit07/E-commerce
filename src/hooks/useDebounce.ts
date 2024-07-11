import { useEffect, useRef } from 'react';

const useDebounce = (callback: (...args: any[]) => void, delay: number) => {
    const timeoutRef = useRef<number | null>(null);

    useEffect(() => {
        return () => {
            if (timeoutRef.current !== null) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const debouncedCallback = (...args: any[]) => {
        if (timeoutRef.current !== null) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = window.setTimeout(() => {
            callback(...args);
        }, delay);
    };

    return debouncedCallback;
};

export default useDebounce;
