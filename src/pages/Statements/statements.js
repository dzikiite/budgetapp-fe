import React from 'react';
import { useIntl, FormattedMessage } from 'react-intl';

import { useStatements } from './useStatements';

import DashboardHeader from 'components/DashboardHeader';
import StatementsMenu from './StatementsMenu';
import ColumnChart from './ColumnChart';

import classes from './statements.module.css';

const Statements = () => {
    const { formatMessage } = useIntl();

    const { budgetsMenu, handleSelectBudget, statementData } = useStatements();

    console.log('budgetsMenu: ', budgetsMenu);
    console.log('statementData: ', statementData);

    return (
        <div className={classes.root}>
            <DashboardHeader
                title={formatMessage({
                    id: 'statements.title',
                    defaultMessage: 'Zestawienia',
                })}
            />
            <div className={classes.content}>
                {budgetsMenu.length > 0 ? (
                    <>
                        <StatementsMenu
                            budgets={budgetsMenu}
                            handleSelectBudget={handleSelectBudget}
                        />
                        <ColumnChart options={statementData} />
                    </>
                ) : (
                    <p className={classes.noBudgets}>
                        <FormattedMessage
                            id="statements.noBudgets"
                            defaultMessage="Nie posiadasz aktualnie zadnych dodanych budzetów."
                        />
                    </p>
                )}
            </div>
        </div>
    );
};

export default Statements;
