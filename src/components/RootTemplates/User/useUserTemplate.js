import { useEffect } from 'react';

import { useUserContext } from 'context/user/userContext';

export const useUserTemplate = () => {
    const [{ isSignedIn }, { handleLogout }] = useUserContext();

    useEffect(() => {
        if (!isSignedIn) {
            handleLogout();
        }
    }, [isSignedIn, handleLogout]);
};
