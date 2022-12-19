import React from 'react';
import { useIntl } from 'react-intl';

import { useStatements } from './useStatements';

import DashboardHeader from 'components/DashboardHeader';
import StatementsMenu from './StatementsMenu';
import ColumnChart from './ColumnChart';

import classes from './statements.module.css';

const Statements = () => {
    const { formatMessage } = useIntl();

    const { budgetsMenu, handleSelectBudget, statementData } = useStatements();

    return (
        <div className={classes.root}>
            <DashboardHeader
                title={formatMessage({
                    id: 'statements.title',
                    defaultMessage: 'Zestawienia',
                })}
            />
            <div className={classes.content}>
                <StatementsMenu
                    budgets={budgetsMenu}
                    handleSelectBudget={handleSelectBudget}
                />
                <ColumnChart options={statementData} />
            </div>
        </div>
    );
};

export default Statements;
