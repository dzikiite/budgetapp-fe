import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { PATHS } from 'utils/constants';

export const useDashboardHeader = () => {
    const navigate = useNavigate();

    const handleAddBudget = useCallback(() => {
        navigate(PATHS.budgets);
    }, [navigate]);

    return { handleAddBudget };
};
