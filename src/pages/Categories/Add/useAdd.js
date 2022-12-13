import { useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useIntl } from 'react-intl';

import { DIALOG_TYPE } from '../useCategories';
import { useError } from 'hooks/useError';

import api from 'utils/api';

export const useAdd = (props) => {
    const { type, ids, onSuccess } = props;

    const queryClient = useQueryClient();
    const { formatMessage } = useIntl();
    const { handleError } = useError();

    const {
        addCategory: addCategoryMutation,
        addSubcategory: addSubcategoryMutation,
    } = api;

    const { mutate: addCategory } = useMutation(
        (mutationData) => {
            addCategoryMutation(mutationData);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('categories');
                onSuccess();
                toast(
                    formatMessage({
                        id: 'add.successCategory',
                        defaultMessage: 'Kategoria dodana poprawnie.',
                    }),
                    { type: 'success' }
                );
            },
            onError: () => handleError(),
        }
    );

    const { mutate: addSubcategory } = useMutation(
        (mutationData) => {
            const categoryId = ids?.categoryId;

            addSubcategoryMutation(mutationData, categoryId);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('categories');
                onSuccess();
                toast(
                    formatMessage({
                        id: 'add.successSubcategory',
                        defaultMessage: 'Podkategoria dodana poprawnie.',
                    }),
                    { type: 'success' }
                );
            },
            onError: () => handleError(),
        }
    );

    const handleAddCategory = useCallback(
        async (formValues) => {
            await addCategory(formValues);
        },
        [addCategory]
    );

    const handleAddSubcategory = useCallback(
        async (formValues) => {
            // TODO: Default description
            await addSubcategory(formValues);
        },
        [addSubcategory]
    );

    const isCategoryAdd = type === DIALOG_TYPE.category;

    return { isCategoryAdd, handleAddCategory, handleAddSubcategory };
};
