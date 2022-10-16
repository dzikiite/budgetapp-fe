import { useCallback } from 'react';

export const useSignIn = () => {
    const onSubmit = useCallback((formValues) => {
        console.log('values: ', formValues);
    }, []);

    return {
        onSubmit,
    };
};
