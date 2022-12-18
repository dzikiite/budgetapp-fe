import { useMemo, useState, useCallback } from 'react';

import { useDataContext } from 'context/data/dataContext';

export const DIALOG_TYPE = {
    subcategory: 'subcategory',
    category: 'category',
};

export const useCategories = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogType, setDialogType] = useState(null);
    const [idInEdit, setIdInEdit] = useState(null);

    const [{ categories }] = useDataContext();

    console.log('categories: ', categories);

    const editInitialValues = useMemo(() => {
        if (!categories || !idInEdit) {
            return {};
        }

        if (dialogType === DIALOG_TYPE.category) {
            const category =
                categories.filter(
                    (categoryItem) =>
                        categoryItem.category_template_id ===
                        idInEdit.categoryId
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
                        categoryItem.category_template_id ===
                        idInEdit.categoryId
                )?.[0]
                ?.subcategories_templates?.filter(
                    (subcategoryItem) =>
                        subcategoryItem.subcategory_template_id ===
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
