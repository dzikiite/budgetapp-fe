import { useMemo, useState, useCallback, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { useError } from 'hooks/useError';
import { useDataContext } from 'context/data/dataContext';

import api from 'utils/api';
import { PATHS } from 'utils/constants';

export const useBudgets = () => {
    const { getBudgets, addBudget: addBudgetMutation } = api;

    const { handleError } = useError();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [, { setBudgets }] = useDataContext();

    const [searchPhrase, setSearchPhrase] = useState('');

    const { data } = useQuery({
        queryKey: ['budgets'],
        queryFn: getBudgets,
        onError: () => handleError(),
    });

    const { mutate: addBudget } = useMutation(
        (mutationData) => {
            addBudgetMutation(mutationData);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['budgets'] });
            },
        }
    );

    const budgets = useMemo(() => {
        if (data?.budgets) {
            return data.budgets;
        }

        return [];
    }, [data]);

    const filteredBudgets = useMemo(() => {
        if (!searchPhrase) {
            return budgets;
        }

        if (searchPhrase.length < 3) {
            return budgets;
        }

        return budgets.filter((budget) =>
            budget.budget_name
                .toLowerCase()
                .includes(searchPhrase.toLocaleLowerCase())
        );
    }, [searchPhrase, budgets]);

    const handleBudgetClick = useCallback(
        (budgetId) => {
            navigate(`${PATHS.budget}/${budgetId}`);
        },
        [navigate]
    );

    const handleAddBudget = useCallback(
        async (formValues) => {
            await addBudget(formValues);
        },
        [addBudget]
    );

    const isSearchPhrase = !!searchPhrase;

    useEffect(() => {
        if (budgets.length > 0) {
            setBudgets(budgets);
        }
    }, [budgets, setBudgets]);

    return {
        budgets,
        handleBudgetClick,
        handleAddBudget,
        filteredBudgets,
        setSearchPhrase,
        isSearchPhrase,
    };
};
