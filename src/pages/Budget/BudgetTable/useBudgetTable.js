import { useMemo } from 'react';

import { useCategoriesSums } from 'hooks/useCategoriesSums';

export const useBudgetTable = (props) => {
    const { budgetData } = props;
    const { categories } = budgetData;

    const { getCategoriesSums } = useCategoriesSums();

    const categoriesWithSums = useMemo(
        () => getCategoriesSums(categories),
        [categories, getCategoriesSums]
    );

    return { categoriesWithSums };
};
