import { useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { useUserContext } from 'context/user/userContext';

import { PATHS } from 'utils/constants';

export const useGuestTemplate = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const [{ isSignedIn }] = useUserContext();

    const isHomeRoute = pathname === PATHS.home;

    const handleSignInRedirect = useCallback(() => {
        navigate(PATHS.signIn);
    }, [navigate]);

    const handleCreateAccountRedirect = useCallback(() => {
        navigate(PATHS.createAccount);
    }, [navigate]);

    useEffect(() => {
        if (isSignedIn) {
            navigate(PATHS.dashboard);
        }
    }, [isSignedIn, navigate]);

    return {
        handleSignInRedirect,
        handleCreateAccountRedirect,
        isHomeRoute,
    };
};
