import React, { createContext, useContext, useMemo } from 'react';
import { node } from 'prop-types';
import { useQuery } from '@tanstack/react-query';

import { useUserContext } from 'context/user/userContext';
import { useError } from 'hooks/useError';

import api from 'utils/api';

const DataContext = createContext(null);

const DataContextProvider = ({ children }) => {
    const { getCategories, getBudgets } = api;

    const [{ isSignedIn }] = useUserContext();
    const { handleError } = useError();

    const { data, error } = useQuery({
        queryKey: ['categories'],
        queryFn: getCategories,
        onError: () => {
            handleError();
        },
        enabled: isSignedIn,
    });

    const { data: budgetsData, error: budgetsError } = useQuery({
        queryKey: ['budgets'],
        queryFn: getBudgets,
        onError: () => handleError(),
        enabled: isSignedIn,
    });

    const budgets = useMemo(() => {
        if (budgetsData?.budgets && !budgetsError) {
            return budgetsData.budgets;
        }

        return [];
    }, [budgetsData, budgetsError]);

    const categories = useMemo(() => {
        if (data && !error) {
            return data.categoriesData;
        }

        return [];
    }, [data, error]);

    const contextValue = useMemo(
        () => [{ budgets, categories }],
        [budgets, categories]
    );

    return (
        <DataContext.Provider value={contextValue}>
            {children}
        </DataContext.Provider>
    );
};

export default DataContextProvider;

export const useDataContext = () => useContext(DataContext);

DataContextProvider.propTypes = {
    children: node,
};
