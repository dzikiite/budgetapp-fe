import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useUserContext } from 'context/user/userContext';

import { PATHS } from 'utils/constants';

export const useUserTemplate = () => {
    const [{ isSignedIn }] = useUserContext();

    const navigate = useNavigate();

    useEffect(() => {
        if (!isSignedIn) {
            navigate(PATHS.home);
        }
    }, [isSignedIn, navigate]);
};
