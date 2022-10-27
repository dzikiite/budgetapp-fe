import React from 'react';
import { FormattedMessage } from 'react-intl';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import { useAccountMenu } from './useAccountMenu';

import Icon from 'components/Icon';

import { PATHS } from 'utils/constants';
import classes from './accountMenu.module.css';

const AccountMenu = () => {
    const { isMenuOpen, firstname, handleMenuToggle, handleLogout } =
        useAccountMenu();

    return (
        <>
            <motion.button
                className={classes.trigger}
                type="button"
                onClick={handleMenuToggle}
                // TODO: Work on animation
                whileHover={{ scale: isMenuOpen ? 1 : 1.06 }}
                whileFocus={{ scale: isMenuOpen ? 1 : 1.06 }}
            >
                <Icon color="#ffffff" icon="account" width={35} />
                {/* TODO: Add translations */}
                <FormattedMessage
                    id="accountMenu.hello"
                    defaultMessage="Witaj {firstname}!"
                    values={{ firstname }}
                />
            </motion.button>
            {isMenuOpen ? (
                <motion.div
                    className={classes.root}
                    animate={{ opacity: 1 }}
                    initial={{ opacity: 0 }}
                >
                    <div className={classes.name}>
                        <FormattedMessage
                            id="accountMenu.hello"
                            defaultMessage="Witaj {firstname}!"
                            values={{ firstname }}
                        />
                    </div>
                    <ul className={classes.menu}>
                        <li>
                            <Link to={PATHS.account} className={classes.link}>
                                <FormattedMessage
                                    id="accountMenu.yourData"
                                    defaultMessage="Twoje dane"
                                />
                            </Link>
                        </li>
                        <li>
                            <Link to={PATHS.password} className={classes.link}>
                                <FormattedMessage
                                    id="accountMenu.changePassword"
                                    defaultMessage="Zmień hasło"
                                />
                            </Link>
                        </li>
                    </ul>
                    <div className={classes.logout}>
                        <button
                            type="button"
                            className={classes.logoutBtn}
                            onClick={handleLogout}
                        >
                            <Icon color="#ffffff" icon="logout" width={13} />
                            <FormattedMessage
                                id="accountMenu.logout"
                                defaultMessage="Wyloguj się"
                            />
                        </button>
                    </div>
                </motion.div>
            ) : null}
        </>
    );
};

export default AccountMenu;
