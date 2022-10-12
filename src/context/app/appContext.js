import React, {
    createContext,
    useContext,
    useReducer,
    useMemo,
    useCallback,
} from 'react';
import { node } from 'prop-types';

const AppContext = createContext();

const initialState = {
    loading: false,
};

const reducer = (state, action) => {
    const { payload } = action;

    switch (action.type) {
        case 'loading':
            return { ...state, loading: payload };
        default:
            throw new Error('App context dispatch error');
    }
};

const AppContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const setLoading = useCallback((value) => {
        dispatch({ type: 'loading', payload: value });
    }, []);

    const actions = useMemo(() => ({ setLoading }), [setLoading]);

    const contextValue = useMemo(() => [state, actions], [state, actions]);

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);

export default AppContextProvider;

AppContextProvider.propTypes = {
    children: node,
};
