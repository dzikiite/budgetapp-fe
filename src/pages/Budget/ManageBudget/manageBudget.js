import React from 'react';
import { FormattedMessage } from 'react-intl';
import { shape, string, number, array } from 'prop-types';
import { FaTrashAlt } from 'react-icons/fa';

import { useManageBudget } from './useManageBudget';
import { withCurrency } from 'utils/withCurrency';

import AddForm from './AddForm';

import classes from './manageBudget.module.css';

const ManageBudget = (props) => {
    const { budgetData } = props;

    const { inflows, handleDeleteInflow } = useManageBudget({ budgetData });

    return (
        <div className={classes.root}>
            <p className={classes.title}>
                <FormattedMessage
                    id="manageBudget.title"
                    defaultMessage="Zarządzaj wpływami budżetu"
                />
            </p>
            <div className={classes.inflows}>
                {inflows.length > 0 ? (
                    inflows.map((inflow) => (
                        <div
                            className={classes.inflow}
                            key={inflow.budget_inflow_id}
                        >
                            <div className={classes.col}>{inflow.name}</div>
                            <div className={classes.col}>
                                {` - ${withCurrency(inflow.amount)}`}
                            </div>
                            <div className={classes.col}>
                                <FaTrashAlt
                                    onClick={() =>
                                        handleDeleteInflow(
                                            inflow.budget_inflow_id
                                        )
                                    }
                                />
                            </div>
                        </div>
                    ))
                ) : (
                    <p className={classes.noInflows}>
                        <FormattedMessage
                            id="manageBudget.noInflows"
                            defaultMessage="Nie dodałeś jeszcze żadnych wpływów do budżetu"
                        />
                    </p>
                )}
            </div>
            <div className={classes.addBudget}>
                <AddForm budgetId={budgetData.budget_id} />
            </div>
        </div>
    );
};

export default ManageBudget;

ManageBudget.propTypes = {
    budgetData: shape({
        budget_id: number,
        budget_name: string,
        // eslint-disable-next-line react/forbid-prop-types
        categories: array,
        // eslint-disable-next-line react/forbid-prop-types
        inflows: array,
    }),
};
