import React from 'react';
import { useIntl } from 'react-intl';

import DashboardHeader from 'components/DashboardHeader';

import classes from './categories.module.css';

const Categories = () => {
    const { formatMessage } = useIntl();

    return (
        <div className={classes.root}>
            <DashboardHeader
                title={formatMessage({
                    id: 'categories.title',
                    defaultMessage: 'Kategorie wydatków',
                })}
            />
        </div>
    );
};

export default Categories;
