import { useMemo, useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';

import { useError } from 'hooks/useError';

import api from 'utils/api';

export const DIALOG_TYPE = {
    subcategory: 'subcategory',
    category: 'category',
};

export const useCategories = () => {
    const { getCategories } = api;

    const { handleError } = useError();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogType, setDialogType] = useState(null);
    const [idInEdit, setIdInEdit] = useState(null);

    // TODO: Handle error and loading state
    const { data, error } = useQuery({
        queryKey: ['categories'],
        queryFn: getCategories,
        onError: () => {
            handleError();
        },
    });

    const categories = useMemo(() => {
        if (data && !error) {
            return data.categoriesData;
        }

        return [];
    }, [data, error]);

    const editInitialValues = useMemo(() => {
        if (!categories || !idInEdit) {
            return {};
        }

        if (dialogType === DIALOG_TYPE.category) {
            const category =
                categories.filter(
                    (categoryItem) =>
                        categoryItem.category_id === idInEdit.categoryId
                )?.[0] || {};

            if (!category) {
                return {};
            }

            return {
                name: category.category_name,
            };
        }

        if (dialogType === DIALOG_TYPE.subcategory) {
            const subcategory = categories
                .filter(
                    (categoryItem) =>
                        categoryItem.category_id === idInEdit.categoryId
                )?.[0]
                ?.subcategories?.filter(
                    (subcategoryItem) =>
                        subcategoryItem.subcategory_id ===
                        idInEdit.subcategoryId
                )?.[0];

            if (!subcategory) {
                return {};
            }

            return {
                name: subcategory.subcategory_name,
                description: subcategory.subcategory_description,
            };
        }

        return {};
    }, [categories, idInEdit, dialogType]);

    const handleCloseDialog = useCallback(() => {
        setIsDialogOpen(false);
        setDialogType(null);
        setIdInEdit(null);
    }, []);

    const handleOpenDialog = useCallback(() => {
        setIsDialogOpen(true);
    }, []);

    const handleAddCategory = useCallback(() => {
        setIsDialogOpen(true);
        setDialogType(DIALOG_TYPE.category);
        setIdInEdit(null);
    }, []);

    const handleEditCategory = useCallback((id) => {
        setIsDialogOpen(true);
        setDialogType(DIALOG_TYPE.category);
        setIdInEdit(id);
    }, []);

    const handleAddSubcategory = useCallback((id) => {
        setIsDialogOpen(true);
        setDialogType(DIALOG_TYPE.subcategory);
        setIdInEdit(id);
    }, []);

    const handleEditSubcategory = useCallback((id) => {
        setIsDialogOpen(true);
        setDialogType(DIALOG_TYPE.subcategory);
        setIdInEdit(id);
    }, []);

    const handleCancel = useCallback(() => {
        setDialogType(null);
        setIdInEdit(null);
    }, []);

    const isEdit =
        (dialogType === DIALOG_TYPE.category && idInEdit?.categoryId) ||
        (dialogType === DIALOG_TYPE.subcategory && idInEdit?.subcategoryId);

    return {
        categories,
        isDialogOpen,
        handleCloseDialog,
        handleOpenDialog,
        dialogType,
        isEdit,
        idInEdit,
        handleAddCategory,
        handleEditCategory,
        handleAddSubcategory,
        handleEditSubcategory,
        handleCancel,
        editInitialValues,
    };
};
