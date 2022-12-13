import React from 'react';
import { string, shape, number, func } from 'prop-types';

import classes from './budgetItem.module.css';

const BudgetItem = (props) => {
    const { budget, handleBudgetClick, bgColor } = props;
    const { budget_name: name, budget_id: id } = budget;

    const shortName = name.slice(0, 2).toUpperCase();

    return (
        <button
            className={classes.root}
            onClick={() => handleBudgetClick(id)}
            type="button"
        >
            <div
                className={classes.main}
                style={{
                    backgroundColor: bgColor,
                }}
            >
                {shortName}
            </div>
            <span className={classes.title}>{name}</span>
        </button>
    );
};

export default BudgetItem;

BudgetItem.propTypes = {
    budget: shape({
        budget_id: number,
        budget_name: string,
    }),
    handleBudgetClick: func,
    bgColor: string,
};
