import { useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useIntl } from 'react-intl';

import { useError } from 'hooks/useError';
import { useInvalidateQueries } from 'hooks/useInvalidateQueries';

import api from 'utils/api';

export const useAddForm = (props) => {
    const { budgetId } = props;

    const { addInflow: addInflowMutation } = api;

    const { formatMessage } = useIntl();
    const { handleError } = useError();
    const { invalidateQuery } = useInvalidateQueries();

    const { mutate: addInflow } = useMutation(
        (mutationData) => {
            addInflowMutation(budgetId, mutationData);
        },
        {
            onSuccess: () => {
                invalidateQuery('budgets');
                toast(
                    formatMessage({
                        id: 'addForm.successAdd',
                        defaultMessage: 'Wpływ budżetowy został dodany.',
                    }),
                    { type: 'success' }
                );
            },
            onError: () => handleError(),
        }
    );

    const handleAddInflow = useCallback(
        async (formValues) => {
            console.log('formValues: ', formValues);
            await addInflow(formValues);
        },
        [addInflow]
    );

    return { handleAddInflow };
};
