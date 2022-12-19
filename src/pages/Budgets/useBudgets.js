import { useMemo, useState, useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useIntl } from 'react-intl';

import { useDataContext } from 'context/data/dataContext';
import { useInvalidateQueries } from 'hooks/useInvalidateQueries';
import { useError } from 'hooks/useError';

import api from 'utils/api';
import { PATHS } from 'utils/constants';

export const useBudgets = () => {
    const { addBudget: addBudgetMutation } = api;

    const { invalidateQuery } = useInvalidateQueries();
    const navigate = useNavigate();
    const [{ budgets }] = useDataContext();
    const { formatMessage } = useIntl();
    const { handleError } = useError();

    const [searchPhrase, setSearchPhrase] = useState('');

    const { mutate: addBudget } = useMutation(
        (mutationData) => {
            addBudgetMutation(mutationData);
        },
        {
            onSuccess: () => {
                invalidateQuery('budgets');
                toast(
                    formatMessage({
                        id: 'budgets.addSuccess',
                        defaultMessage: 'Budżety został dodany poprawnie',
                    }),
                    { type: 'success' }
                );
            },
            onError: () => handleError(),
        }
    );

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

    return {
        budgets,
        handleBudgetClick,
        handleAddBudget,
        filteredBudgets,
        setSearchPhrase,
        isSearchPhrase,
    };
};
