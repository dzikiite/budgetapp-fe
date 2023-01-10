import React, { useMemo, useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

import { useWindowSize } from 'hooks/useWindowSize';
import { useUserContext } from 'context/user/userContext';

import Logo from 'components/Logo';
import Icon from 'components/Icon';

import { PATHS, DEVICE_DESKTOP } from 'utils/constants';
import classes from './mainNavigation.module.css';

const LOGOUT_ID = 8;

const MainNavigation = () => {
    const { formatMessage } = useIntl();
    const { width } = useWindowSize();
    const { pathname } = useLocation();
    const [, { handleLogout }] = useUserContext();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const isMobileView = width <= DEVICE_DESKTOP;

    const navItems = useMemo(
        () => [
            {
                id: 1,
                name: formatMessage({
                    id: 'mainNavigation.categories',
                    defaultMessage: 'Kategorie wydatków',
                }),
                path: PATHS.categories,
                icon: 'wallet',
            },
            {
                id: 2,
                name: formatMessage({
                    id: 'mainNavigation.budgets',
                    defaultMessage: 'Budżety',
                }),
                path: PATHS.budgets,
                icon: 'wallet',
            },
            {
                id: 3,
                name: formatMessage({
                    id: 'mainNavigation.statements',
                    defaultMessage: 'Zestawienia',
                }),
                path: PATHS.statements,
                icon: 'document',
            },
            isMobileView && {
                id: 6,
                name: formatMessage({
                    id: 'mainNavigation.accountData',
                    defaultMessage: 'Twoje dane',
                }),
                path: PATHS.account,
                icon: 'account',
            },
            isMobileView && {
                id: 7,
                name: formatMessage({
                    id: 'mainNavigation.password',
                    defaultMessage: 'Zmień hasło',
                }),
                path: PATHS.password,
                icon: 'account',
            },
            isMobileView && {
                id: 8,
                name: formatMessage({
                    id: 'mainNavigation.logout',
                    defaultMessage: 'Wyloguj się',
                }),
                path: null,
                icon: 'logout',
            },
        ],
        [formatMessage, isMobileView]
    );

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    const mobileHamburgerClass = isMobileMenuOpen
        ? classes.mobileHamburgerActive
        : classes.mobileHamburger;

    return (
        <div className={classes.root}>
            <div className={classes.logoWrapper}>
                <Logo url={PATHS.dashboard} />
            </div>
            {isMobileView ? (
                <button
                    type="button"
                    className={mobileHamburgerClass}
                    onClick={() =>
                        setIsMobileMenuOpen((prevState) => !prevState)
                    }
                    aria-label="Mobile menu switcher"
                >
                    <span className={classes.line} />
                    <span className={classes.line} />
                    <span className={classes.line} />
                </button>
            ) : null}
            {!isMobileView || (isMobileView && isMobileMenuOpen) ? (
                <nav className={classes.navigation}>
                    <ul>
                        {navItems.map((item) =>
                            item ? (
                                <motion.li
                                    className={classes.item}
                                    key={item.id}
                                    whileHover={{ translateX: 8 }}
                                    transition={{ duration: 0.15 }}
                                >
                                    <Link
                                        to={
                                            item.id === LOGOUT_ID
                                                ? ''
                                                : item.path
                                        }
                                        className={classes.link}
                                        onClick={
                                            item.id === LOGOUT_ID
                                                ? handleLogout
                                                : () => {}
                                        }
                                    >
                                        <Icon
                                            icon={item.icon}
                                            color="#19258D"
                                            width={20}
                                        />
                                        <span className={classes.itemText}>
                                            {item.name}
                                        </span>
                                    </Link>
                                </motion.li>
                            ) : null
                        )}
                    </ul>
                </nav>
            ) : null}
        </div>
    );
};

export default MainNavigation;
