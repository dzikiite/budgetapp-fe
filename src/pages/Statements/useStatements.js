import { useMemo, useState, useCallback, useEffect } from 'react';
import { useIntl } from 'react-intl';

import { useDataContext } from 'context/data/dataContext';
import { useCategoriesSums } from 'hooks/useCategoriesSums';

export const useStatements = () => {
    const [selectedBudget, setSelectedBudget] = useState(null);

    const { formatMessage } = useIntl();

    const [{ budgets }] = useDataContext();
    const { getCategoriesSums } = useCategoriesSums();

    const budgetsMenu = useMemo(() => {
        if (!budgets || budgets?.length === 0) {
            return [];
        }

        return budgets.map((budget) => ({
            name: budget.budget_name,
            id: budget.budget_id,
            isActive: selectedBudget === budget.budget_id,
        }));
    }, [budgets, selectedBudget]);

    const currentBudgetData = useMemo(() => {
        if (!budgets || !selectedBudget) {
            return null;
        }

        return budgets.filter(
            (budget) => budget.budget_id === selectedBudget
        )?.[0];
    }, [budgets, selectedBudget]);

    const statementData = useMemo(() => {
        const { categories, budget_name: budgetName } = currentBudgetData || {};

        if (!categories || categories?.length === 0) {
            return null;
        }

        const categoriesWithSums = getCategoriesSums(categories);

        return {
            theme: 'dark1',
            backgroundColor: '#141620',
            title: {
                text: formatMessage(
                    {
                        id: 'statements.title',
                        defaultMessage: 'Wydatki w budżecie {name}',
                    },
                    { name: budgetName }
                ),
            },
            axisY: {
                suffix: ' zł',
            },
            animationEnabled: true,
            data: [
                {
                    type: 'column',
                    dataPoints: categoriesWithSums.map((category) => ({
                        label: category.category_name,
                        y: category.categoryTotalAllocated,
                    })),
                },
            ],
        };
    }, [getCategoriesSums, currentBudgetData, formatMessage]);

    const handleSelectBudget = useCallback((id) => {
        setSelectedBudget(id);
    }, []);

    useEffect(() => {
        if (!selectedBudget) {
            const firstBudgetId = budgets?.[0]?.budget_id;

            setSelectedBudget(firstBudgetId);
        }
    }, [budgets, selectedBudget]);

    return { budgetsMenu, handleSelectBudget, statementData };
};
