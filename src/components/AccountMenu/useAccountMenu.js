import { useState, useCallback } from 'react';

import { useUserContext } from 'context/user/userContext';

export const useAccountMenu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const [{ firstname }, { handleLogout }] = useUserContext();

    const handleMenuToggle = useCallback(() => {
        setIsMenuOpen((prevValue) => !prevValue);
    }, []);

    return {
        isMenuOpen,
        firstname,
        handleMenuToggle,
        handleLogout,
    };
};
