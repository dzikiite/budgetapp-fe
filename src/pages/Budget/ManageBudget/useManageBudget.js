import { useMemo, useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useIntl } from 'react-intl';

import { useInvalidateQueries } from 'hooks/useInvalidateQueries';
import { useError } from 'hooks/useError';

import api from 'utils/api';

export const useManageBudget = (props) => {
    const { budgetData } = props;

    const { invalidateQuery } = useInvalidateQueries();
    const { formatMessage } = useIntl();
    const { handleError } = useError();

    const { deleteInflow: deleteInflowMutation } = api;

    const { mutate: deleteInflow } = useMutation(
        (mutationData) =>
            deleteInflowMutation(mutationData.budgetId, mutationData.inflowId),
        {
            onSuccess: () => {
                invalidateQuery('budgets');
                toast(
                    formatMessage({
                        id: 'manageBudget.successDelete',
                        defaultMessage: 'Wpływ budżetowy został usunięty.',
                    }),
                    { type: 'success' }
                );
            },
            onError: () => handleError(),
        }
    );

    const inflows = useMemo(() => {
        if (!budgetData?.inflows) {
            return [];
        }

        return budgetData.inflows;
    }, [budgetData]);

    const handleDeleteInflow = useCallback(
        async (inflowId) => {
            await deleteInflow({ budgetId: budgetData?.budget_id, inflowId });
        },
        [deleteInflow, budgetData]
    );

    return { inflows, handleDeleteInflow };
};
