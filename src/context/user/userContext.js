import React, {
    createContext,
    useMemo,
    useCallback,
    useReducer,
    useContext,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { node } from 'prop-types';

import BrowserPersistence from 'utils/browserPersistence';

import { PATHS } from 'utils/constants';

const storage = BrowserPersistence();

const UserContext = createContext(null);

const initialState = {
    isSignedIn: !!storage.getItem('user_token'),
    email: undefined,
    firstname: undefined,
    lastname: undefined,
};

const reducer = () => {};

const UserContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const navigate = useNavigate();

    const handleLogout = useCallback(() => {
        storage.removeItem('user_token');

        navigate(PATHS.home);

        navigate(0);
    }, [navigate]);

    const actions = useMemo(
        () => ({
            handleLogout,
        }),
        [handleLogout]
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
