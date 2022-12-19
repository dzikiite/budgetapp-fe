import React from 'react';
import { FormattedMessage } from 'react-intl';

import { useBudgetsSummary } from './useBudgetsSummary';
import { withCurrency } from 'utils/withCurrency';

import classes from './budgetsSummary.module.css';

const BudgetsSummary = () => {
    const { budgetsData, handleSeeMore } = useBudgetsSummary();

    return (
        <div className={classes.root}>
            <p className={classes.title}>
                <FormattedMessage
                    id="budgetsSummary.title"
                    defaultMessage="Zestawienie ostatnich budżetów"
                />
            </p>
            {budgetsData.length > 0 ? (
                <>
                    <div className={classes.row}>
                        <div className={classes.col}>
                            <FormattedMessage
                                id="budgetsSummary.positionLabel"
                                defaultMessage="Lp."
                            />
                        </div>
                        <div className={classes.col}>
                            <FormattedMessage
                                id="budgetsSummary.name"
                                defaultMessage="Nazwa budżetu"
                            />
                        </div>
                        <div className={classes.col}>
                            <FormattedMessage
                                id="budgetsSummary.amount"
                                defaultMessage="Wysokość budżetu"
                            />
                        </div>
                    </div>
                    {budgetsData.map((budget) => (
                        <div className={classes.row} key={budget.id}>
                            <div className={classes.col}>{budget.position}</div>
                            <div className={classes.col}>{budget.name}</div>
                            <div className={classes.col}>
                                {withCurrency(budget.totalAmount)}
                            </div>
                        </div>
                    ))}
                </>
            ) : (
                <p className={classes.noBudgets}>
                    <FormattedMessage
                        id="budgetsSummary.noBudgets"
                        defaultMessage="Nie posiadasz aktualnie dodanych budżetów."
                    />
                </p>
            )}
            <div className={classes.more}>
                <button
                    className={classes.moreBtn}
                    type="button"
                    onClick={handleSeeMore}
                >
                    <FormattedMessage
                        id="global.more"
                        defaultMessage="Więcej >"
                    />
                </button>
            </div>
        </div>
    );
};

export default BudgetsSummary;
