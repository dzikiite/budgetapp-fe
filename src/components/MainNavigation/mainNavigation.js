import React, { useMemo } from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import Logo from 'components/Logo';
import Icon from 'components/Icon';

import { PATHS } from 'utils/constants';
import classes from './mainNavigation.module.css';

const MainNavigation = () => {
    const { formatMessage } = useIntl();

    // TODO: Add translations
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
            {
                id: 4,
                name: formatMessage({
                    id: 'mainNavigation.bills',
                    defaultMessage: 'Rachunki',
                }),
                path: PATHS.bills,
                icon: 'money',
            },
            {
                id: 5,
                name: formatMessage({
                    id: 'mainNavigation.financialGoals',
                    defaultMessage: 'Cele finansowe',
                }),
                path: PATHS.goals,
                icon: 'chart',
            },
        ],
        [formatMessage]
    );

    return (
        <div className={classes.root}>
            <div className={classes.logoWrapper}>
                <Logo url={PATHS.dashboard} />
            </div>
            <nav className={classes.navigation}>
                <ul>
                    {navItems.map((item) => (
                        <motion.li
                            className={classes.item}
                            key={item.id}
                            whileHover={{ translateX: 8 }}
                            transition={{ duration: 0.15 }}
                        >
                            <Link to={item.path} className={classes.link}>
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
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default MainNavigation;
