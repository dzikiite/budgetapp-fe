import React from 'react';
import { string } from 'prop-types';
import { FormattedMessage } from 'react-intl';

import Button from 'components/Button';
import AccountMenu from 'components/AccountMenu';

import { BUTTONS_APPEARANCE } from 'utils/constants';
import classes from './dashboardHeader.module.css';

const DashboardHeader = (props) => {
    const { title } = props;

    return (
        <header className={classes.root}>
            <div className={classes.info}>
                {title ? (
                    <h1 className={classes.title}>{title}</h1>
                ) : (
                    <Button appearance={BUTTONS_APPEARANCE.navyBlueSquare}>
                        {/* TODO: Add translation */}
                        <FormattedMessage
                            id="dashboardHeader.addBudget"
                            defaultMessage="Dodaj budżet"
                        />
                    </Button>
                )}
            </div>
            <div className={classes.account}>
                <AccountMenu />
            </div>
        </header>
    );
};

export default DashboardHeader;

DashboardHeader.propTypes = {
    title: string,
};
