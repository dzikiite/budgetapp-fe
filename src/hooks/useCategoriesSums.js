import { useCallback } from 'react';

export const useCategoriesSums = () => {
    const getCategoriesSums = useCallback((categories) => {
        if (!categories) {
            return [];
        }

        return categories.map((category) => {
            let categoryTotalAllocated = 0.0;
            let categoryTotalExecution = 0.0;

            const subcategories = category.subcategories.map((subcategory) => {
                const totalOutflows = subcategory.outflows.reduce(
                    (acc, current) => acc + current.amount,
                    0.0
                );

                categoryTotalAllocated += subcategory.allocated_amount;
                categoryTotalExecution += totalOutflows;

                return {
                    ...subcategory,
                    total_outflows: totalOutflows,
                    rest_amount: subcategory.allocated_amount - totalOutflows,
                };
            });

            const categoryRestAmount =
                categoryTotalAllocated - categoryTotalExecution;

            return {
                ...category,
                categoryTotalAllocated,
                categoryTotalExecution,
                categoryRestAmount,
                subcategories,
            };
        });
    }, []);

    return { getCategoriesSums };
};
