import React, { createContext, useContext, useState, useMemo } from 'react';
import { node } from 'prop-types';

const DataContext = createContext(null);

const DataContextProvider = ({ children }) => {
    const [budgets, setBudgets] = useState([]);

    const contextValue = useMemo(
        () => [{ budgets }, { setBudgets }],
        [budgets]
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
