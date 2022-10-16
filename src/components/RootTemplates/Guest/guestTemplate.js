import React from 'react';
import { node } from 'prop-types';
import { FormattedMessage } from 'react-intl';

import Logo from 'components/Logo';
import Button from 'components/Button';

import { BUTTONS_APPEARANCE } from 'utils/constants';
import { useGuestTemplate } from './useGuestTemplate';
import classes from './guestTemplate.module.css';

const GuestTemplate = (props) => {
    const { children } = props;

    const { handleSignInRedirect, handleCreateAccountRedirect, isHomeRoute } =
        useGuestTemplate();

    return (
        <div className={classes.root}>
            <header className={classes.header}>
                <div className={classes.logo}>
                    <Logo isClickable={!isHomeRoute} />
                </div>
                {isHomeRoute ? (
                    <nav className={classes.buttons}>
                        <Button
                            appearance={BUTTONS_APPEARANCE.navyBlue}
                            onClick={handleSignInRedirect}
                        >
                            <FormattedMessage
                                id="guestTemplate.signIn"
                                defaultMessage="Zaloguj się"
                            />
                        </Button>
                        <Button
                            appearance={BUTTONS_APPEARANCE.violetOutline}
                            onClick={handleCreateAccountRedirect}
                        >
                            <FormattedMessage
                                id="guestTemplate.register"
                                defaultMessage="Zarejestruj się"
                            />
                        </Button>
                    </nav>
                ) : null}
            </header>
            {children}
        </div>
    );
};

export default GuestTemplate;

GuestTemplate.propTypes = {
    children: node,
};
