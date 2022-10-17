import { useCallback } from 'react';

export const useCreateAccount = () => {
    const onSubmit = useCallback((formValues) => {
        console.log('values: ', formValues);
    }, []);

    return {
        onSubmit,
    };
};
