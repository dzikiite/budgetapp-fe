import { useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useIntl } from 'react-intl';

import { DIALOG_TYPE } from '../useCategories';
import { useError } from 'hooks/useError';

import api from 'utils/api';

export const useEdit = (props) => {
    const { type, ids, onSuccess } = props;
    const { editCategory: editCategoryMutation } = api;

    const queryClient = useQueryClient();
    const { formatMessage } = useIntl();
    const { handleError } = useError();

    const { mutate: editCategory } = useMutation(
        (mutationData) => {
            const categoryId = ids?.categoryId;

            editCategoryMutation(mutationData, categoryId);
        },
        {
            onSuccess: () => {
                onSuccess();
                toast(
                    formatMessage({
                        id: 'edit.successCategory',
                        defaultMessage: 'Kategoria zapisana poprawnie.',
                    }),
                    { type: 'success' }
                );
                // TODO work on query invalidation
                queryClient.invalidateQueries({
                    queryKey: ['categories'],
                });
            },
            onError: () => handleError(),
        }
    );

    const handleEditCategory = useCallback(
        async (formValues) => {
            await editCategory(formValues);
        },
        [editCategory]
    );

    const isCategoryEdit = type === DIALOG_TYPE.category;

    return { isCategoryEdit, handleEditCategory };
};
