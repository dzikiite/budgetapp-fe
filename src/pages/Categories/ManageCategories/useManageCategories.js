import { useMemo, useCallback } from 'react';
import { useIntl } from 'react-intl';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { useError } from 'hooks/useError';
import { useInvalidateQueries } from 'hooks/useInvalidateQueries';
import { useDataContext } from 'context/data/dataContext';

import api from 'utils/api';

export const useManageCategories = () => {
    const {
        deleteSubcategory: deleteSubcategoryMutation,
        deleteCategory: deleteCategoryMutation,
    } = api;

    const [{ categories }] = useDataContext();

    const { formatMessage } = useIntl();
    const { handleError } = useError();
    const { invalidateQuery } = useInvalidateQueries();

    const { mutate: deleteSubcategory } = useMutation(
        (id) => {
            deleteSubcategoryMutation(id);
        },
        {
            onSuccess: () => {
                toast(
                    formatMessage({
                        id: 'edit.deleteSubcategory',
                        defaultMessage:
                            'Podkategoria została poprawnie usunięta.',
                    }),
                    { type: 'success' }
                );
                invalidateQuery('categories');
            },
            onError: () => handleError(),
        }
    );

    const { mutate: deleteCategory } = useMutation(
        (id) => {
            deleteCategoryMutation(id);
        },
        {
            onSuccess: () => {
                toast(
                    formatMessage({
                        id: 'edit.deleteCategory',
                        defaultMessage: 'Kategoria została poprawnie usunięta.',
                    }),
                    { type: 'success' }
                );
                invalidateQuery('categories');
            },
            onError: () => handleError(),
        }
    );

    const suggestedCategoryMock = useMemo(
        () => ({
            categoryTitle: formatMessage({
                id: 'addCategories.categoryTitleMock',
                defaultMessage: '+ Dodaj kategorię (np. spożywcze)',
            }),
            subcategoryTitle: formatMessage({
                id: 'addCategories.subcategoryTitleMock',
                defaultMessage: '+ Dodaj podkategorię (np. napoje)',
            }),
            subcategoryDescription: formatMessage({
                id: 'addCategories.subcategoryDescrptionMock',
                defaultMessage:
                    'Wprowadź opis podkategorii. Opis może zostać pusty.',
            }),
        }),
        [formatMessage]
    );

    const checkIsEmptyCategory = useCallback(
        (id) =>
            !categories.some(
                (category) =>
                    category.category_template_id === parseInt(id, 10) &&
                    category.subcategories_templates.length
            ),
        [categories]
    );

    const handleDeleteSubcategory = useCallback(
        async (id) => {
            await deleteSubcategory(id);
        },
        [deleteSubcategory]
    );

    const handleDeleteCategory = useCallback(
        async (id) => {
            if (checkIsEmptyCategory(id)) {
                await deleteCategory(id);
            } else {
                toast(
                    formatMessage({
                        id: 'edit.deleteCategoryNotEmpty',
                        defaultMessage:
                            'Usuwana kategoria posiada swoje podkategorie. Usuń je w pierwszej kolejności.',
                    }),
                    { type: 'error' }
                );
            }
        },
        [checkIsEmptyCategory, deleteCategory, formatMessage]
    );

    return {
        suggestedCategoryMock,
        handleDeleteSubcategory,
        handleDeleteCategory,
    };
};
