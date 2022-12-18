import { useMemo, useState, useCallback } from 'react';

import { useDataContext } from 'context/data/dataContext';

export const DIALOG_VIEWS = {
    manageBudget: 'manageBudget',
    editAllocated: 'editAllocated',
    editOutflows: 'editOutflows',
};

export const useBudget = (props) => {
    const { budgetId } = props;

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentView, setCurrentView] = useState(null);
    const [selectedSubcategoryData, setSelectedSubcategoryData] =
        useState(null);

    const [{ budgets }] = useDataContext();

    const budgetData = useMemo(() => {
        if (budgets.length > 0) {
            return budgets.filter(
                (budget) => budget.budget_id === parseInt(budgetId, 10)
            )?.[0];
        }

        return null;
    }, [budgets, budgetId]);

    const budgetAmounts = useMemo(() => {
        const { categories } = budgetData || {};

        const sums = {
            allocatedAmount: 0.0,
            restAmount: 0.0,
            totalAmount: 0.0,
        };

        if (!categories || categories?.length === 0) {
            return sums;
        }

        categories.forEach((category) =>
            category.subcategories.forEach((subcategory) => {
                sums.allocatedAmount += subcategory.allocated_amount;
            })
        );

        sums.restAmount = budgetData.total_amount - sums.allocatedAmount;
        sums.totalAmount = budgetData.total_amount;

        return sums;
    }, [budgetData]);

    const handleOpenDialog = useCallback((view) => {
        setCurrentView(view);
        setIsDialogOpen(true);
    }, []);

    const handleCloseDialog = useCallback(() => {
        setCurrentView(null);
        setIsDialogOpen(false);
    }, []);

    const handleEditSubcategoryAllocatedAmount = useCallback((data) => {
        setCurrentView(DIALOG_VIEWS.editAllocated);
        setSelectedSubcategoryData(data);
        setIsDialogOpen(true);
    }, []);

    const handleEditSubcategoryOutflows = useCallback((data) => {
        setCurrentView(DIALOG_VIEWS.editOutflows);
        setSelectedSubcategoryData(data);
        setIsDialogOpen(true);
    }, []);

    return {
        budgetData,
        handleOpenDialog,
        handleCloseDialog,
        isDialogOpen,
        currentView,
        budgetAmounts,
        handleEditSubcategoryAllocatedAmount,
        selectedSubcategoryData,
        handleEditSubcategoryOutflows,
    };
};
