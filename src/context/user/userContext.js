import React, {
    createContext,
    useMemo,
    useCallback,
    useReducer,
    useContext,
    useEffect,
    useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { node } from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useIntl } from 'react-intl';

import BrowserPersistence from 'utils/browserPersistence';

import { PATHS } from 'utils/constants';
import api from 'utils/api';

const storage = BrowserPersistence();

const UserContext = createContext(null);

const initialState = {
    isSignedIn: !!storage.getItem('user_token'),
    email: undefined,
    firstname: undefined,
    lastname: undefined,
};

const reducer = (state, action) => {
    const { payload } = action;

    switch (action.type) {
        case 'setUserData':
            return { ...state, ...payload };
        case 'setIsSignedIn':
            return { ...state, isSignedIn: payload };
        default:
            throw new Error('User context dispatch error');
    }
};

const UserContextProvider = ({ children }) => {
    const { getUserData } = api;

    const [state, dispatch] = useReducer(reducer, initialState);
    const [fetchUserData, setFetchUserData] = useState(false);

    const navigate = useNavigate();
    const { formatMessage } = useIntl();

    const handleLogout = useCallback(() => {
        storage.removeItem('user_token');

        navigate(PATHS.home);

        navigate(0);
    }, [navigate]);

    const handleAddUserData = useCallback((userData) => {
        dispatch({ type: 'setUserData', payload: userData });
    }, []);

    const saveToken = useCallback((token) => {
        storage.setItem('user_token', token, 5000);
        dispatch({ type: 'setIsSignedIn', payload: true });
    }, []);

    const { isError } = useQuery({
        queryKey: ['userData'],
        queryFn: getUserData,
        enabled: fetchUserData,
        onSuccess: (userData) => handleAddUserData(userData?.user),
    });

    useEffect(() => {
        if (state.isSignedIn && !state.firstname) {
            setFetchUserData(true);
        }
    }, [state]);

    useEffect(() => {
        if (isError) {
            toast(
                formatMessage({
                    id: 'global.error',
                    defaultMessage: 'Wystąpił błąd pobierania ',
                })
            );
        }
    }, [isError, formatMessage]);

    const actions = useMemo(
        () => ({
            handleLogout,
            saveToken,
            handleAddUserData,
        }),
        [handleLogout, saveToken, handleAddUserData]
    );

    const contextValue = useMemo(() => [state, actions], [state, actions]);

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;

export const useUserContext = () => useContext(UserContext);

UserContextProvider.propTypes = {
    children: node,
};
