import { useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDataContext } from 'context/data/dataContext';

import { PATHS } from 'utils/constants';

export const useBudgetsSummary = () => {
    const [{ budgets }] = useDataContext();

    const navigate = useNavigate();

    const budgetsData = useMemo(() => {
        if (budgets?.length === 0) {
            return [];
        }

        return budgets
            .reverse()
            .map((budget, index) => ({
                position: index + 1,
                name: budget.budget_name,
                totalAmount: budget.total_amount,
                id: budget.budget_id,
            }))
            .slice(0, 4);
    }, [budgets]);

    const handleSeeMore = useCallback(() => {
        navigate(PATHS.budgets);
    }, [navigate]);

    return { budgetsData, handleSeeMore };
};
