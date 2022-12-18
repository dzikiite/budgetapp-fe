import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';

export const useInvalidateQueries = () => {
    const queryClient = useQueryClient();

    const invalidateQuery = useCallback(
        (queryKey) => {
            setTimeout(() => {
                queryClient.invalidateQueries([queryKey]);
            }, 150);
        },
        [queryClient]
    );

    return { invalidateQuery };
};
