import React from 'react';
import { string, shape } from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { useDashboardHeader } from './useDashboardHeader';
import { useWindowSize } from 'hooks/useWindowSize';
import { useStyle } from 'hooks/useStyle';

import Button from 'components/Button';
import AccountMenu from 'components/AccountMenu';

import { BUTTONS_APPEARANCE, DEVICE_DESKTOP } from 'utils/constants';
import defaultClasses from './dashboardHeader.module.css';

const DashboardHeader = (props) => {
    const { title, classes: propsClasses } = props;

    const classes = useStyle(defaultClasses, propsClasses);

    const { width } = useWindowSize();
    const { handleAddBudget } = useDashboardHeader();

    const isMobileView = width <= DEVICE_DESKTOP;

    return (
        <header className={classes.root}>
            <div className={classes.info}>
                {title ? (
                    <h1 className={classes.title}>{title}</h1>
                ) : !isMobileView ? (
                    <Button
                        appearance={BUTTONS_APPEARANCE.navyBlueSquare}
                        onClick={handleAddBudget}
                    >
                        <FormattedMessage
                            id="dashboardHeader.addBudget"
                            defaultMessage="Dodaj budżet"
                        />
                    </Button>
                ) : null}
            </div>
            {!isMobileView ? (
                <div className={classes.account}>
                    <AccountMenu />
                </div>
            ) : null}
        </header>
    );
};

export default DashboardHeader;

DashboardHeader.propTypes = {
    title: string,
    classes: shape({
        root: string,
        info: string,
        title: string,
        account: string,
    }),
};
