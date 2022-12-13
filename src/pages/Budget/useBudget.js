import { useMemo } from 'react';

import { useDataContext } from 'context/data/dataContext';

export const useBudget = (props) => {
    const { budgetId } = props;

    const [{ budgets }] = useDataContext();

    const budgetData = useMemo(() => {
        if (budgets.length > 0) {
            return budgets.filter(
                (budget) => budget.budget_id === parseInt(budgetId, 10)
            )?.[0];
        }

        return null;
    }, [budgets, budgetId]);

    return { budgetData };
};
