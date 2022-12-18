import { useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useIntl } from 'react-intl';

import { useInvalidateQueries } from 'hooks/useInvalidateQueries';

import api from 'utils/api';

export const useEditAllocated = (props) => {
    const { subcategoryId, onSuccess } = props;

    const { formatMessage } = useIntl();
    const { invalidateQuery } = useInvalidateQueries();

    const { updateAllocatedAmount: updateAllocatedAmountMutation } = api;

    const { mutate: updateAllocatedAmount } = useMutation(
        (mutationData) => {
            updateAllocatedAmountMutation(subcategoryId, mutationData);
        },
        {
            onSuccess: () => {
                onSuccess();
                toast(
                    formatMessage({
                        id: 'editAllocated.success',
                        defaultMessage: 'Zmiana została zapisana',
                    }),
                    { type: 'success' }
                );
                invalidateQuery('budgets');
            },
        }
    );

    const handleEditAllocated = useCallback(
        async (formValues) => {
            await updateAllocatedAmount(formValues);
        },
        [updateAllocatedAmount]
    );

    return { handleEditAllocated };
};
