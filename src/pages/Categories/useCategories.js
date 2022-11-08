import { useMemo, useEffect, useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import api from 'utils/api';

export const useCategories = () => {
    const { getCategories } = api;

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // TODO: Handle error and loading state
    const { data, error } = useQuery({
        queryKey: ['categories'],
        queryFn: getCategories,
    });

    const categories = useMemo(() => {
        if (data && !error) {
            return data.categoriesData;
        }

        return [];
    }, [data, error]);

    const handleCloseDialog = useCallback(() => {
        setIsDialogOpen(false);
    }, []);

    return {
        categories,
        isDialogOpen,
        handleCloseDialog,
    };
};
