import { useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useIntl } from 'react-intl';

import { DIALOG_TYPE } from '../useCategories';
import { useError } from 'hooks/useError';
import { useInvalidateQueries } from 'hooks/useInvalidateQueries';

import api from 'utils/api';

export const useEdit = (props) => {
    const { type, ids, onSuccess } = props;
    const {
        editCategory: editCategoryMutation,
        editSubcategory: editSubcategoryMutation,
    } = api;

    const { formatMessage } = useIntl();
    const { handleError } = useError();
    const { invalidateQuery } = useInvalidateQueries();

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
                invalidateQuery('categories');
            },
            onError: () => handleError(),
        }
    );

    const { mutate: editSubcategory } = useMutation(
        (mutationData) => {
            const subcategoryId = ids?.subcategoryId;

            editSubcategoryMutation(mutationData, subcategoryId);
        },
        {
            onSuccess: () => {
                onSuccess();
                toast(
                    formatMessage({
                        id: 'edit.successSubcategory',
                        defaultMessage: 'Podkategoria zapisana poprawnie.',
                    }),
                    { type: 'success' }
                );
                invalidateQuery('categories');
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

    const handleEditSubcategory = useCallback(
        async (formValues) => {
            await editSubcategory(formValues);
        },
        [editSubcategory]
    );

    const isCategoryEdit = type === DIALOG_TYPE.category;

    return { isCategoryEdit, handleEditCategory, handleEditSubcategory };
};
