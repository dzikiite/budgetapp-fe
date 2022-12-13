import { useState, useEffect } from 'react';

export const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
        initialHeight: undefined,
    });

    useEffect(() => {
        function handleResize(initial) {
            setWindowSize((prevState) => ({
                ...(initial
                    ? { initialHeight: window.innerHeight }
                    : prevState),
                width: window.innerWidth,
                height: window.innerHeight,
            }));
        }

        handleResize(true);

        window.addEventListener('resize', () => handleResize(false));

        return () =>
            window.removeEventListener('resize', () => handleResize(false));
    }, []);

    return windowSize;
};
