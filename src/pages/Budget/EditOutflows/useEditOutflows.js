import { useMemo, useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';

import { useError } from 'hooks/useError';
import { useInvalidateQueries } from 'hooks/useInvalidateQueries';

import api from 'utils/api';

export const useEditOutflows = (props) => {
    const { budgetData, subcategoryData } = props;

    const {
        addOutflow: addOutflowMutation,
        deleteOutflow: deleteOutflowMutation,
    } = api;

    const { formatMessage } = useIntl();
    const { handleError } = useError();
    const { invalidateQuery } = useInvalidateQueries();

    const { mutate: addOutflow } = useMutation(
        (mutationData) => {
            addOutflowMutation(
                subcategoryData.id,
                budgetData.budget_id,
                mutationData
            );
        },
        {
            onSuccess: () => {
                invalidateQuery('budgets');
                toast(
                    formatMessage({
                        id: 'editOutflows.outflowAddSuccess',
                        defaultMessage: 'Wydatek został dodany poprawnie.',
                    }),
                    { type: 'success' }
                );
            },
            onError: () => handleError(),
        }
    );

    const { mutate: deleteOutflow } = useMutation(
        (outflowId) => deleteOutflowMutation(outflowId),
        {
            onSuccess: () => {
                invalidateQuery('budgets');
                toast(
                    formatMessage({
                        id: 'editOutflows.outflowDeleteSuccess',
                        defaultMessage: 'Wydatek został poprawnie usunięty.',
                    }),
                    { type: 'success' }
                );
            },
            onError: () => handleError(),
        }
    );

    const outflows = useMemo(() => {
        if (!budgetData) {
            return [];
        }

        const { categories } = budgetData;

        let subcategoryOutflows = [];

        categories.forEach((category) =>
            category.subcategories.forEach((subcategory) => {
                if (subcategory.subcategory_id === subcategoryData.id) {
                    subcategoryOutflows = subcategory.outflows;
                }
            })
        );

        return subcategoryOutflows;
    }, [budgetData, subcategoryData]);

    const handleDeleteOutflow = useCallback(
        async (outflowId) => {
            await deleteOutflow(outflowId);
        },
        [deleteOutflow]
    );

    const handleAddOutflow = useCallback(
        async (formValues) => {
            const defaultName = formatMessage({
                id: 'editOutflows.defaultName',
                defaultMessage: 'Wydatek',
            });

            if (!formValues?.name) {
                await addOutflow({ ...formValues, name: defaultName });
            } else {
                await addOutflow(formValues);
            }
        },
        [formatMessage, addOutflow]
    );

    return { outflows, handleDeleteOutflow, handleAddOutflow };
};
