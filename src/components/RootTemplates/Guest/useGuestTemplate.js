import { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { PATHS } from 'utils/constants';

export const useGuestTemplate = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const isHomeRoute = pathname === PATHS.home;

    const handleSignInRedirect = useCallback(() => {
        navigate(PATHS.signIn);
    }, [navigate]);

    const handleCreateAccountRedirect = useCallback(() => {
        navigate(PATHS.createAccount);
    }, [navigate]);

    return {
        handleSignInRedirect,
        handleCreateAccountRedirect,
        isHomeRoute,
    };
};
