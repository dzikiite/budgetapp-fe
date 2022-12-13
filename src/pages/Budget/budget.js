import React from 'react';
import { useParams } from 'react-router-dom';

import { useBudget } from './useBudget';

import classes from './budget.module.css';

const Budget = () => {
    const { budgetId } = useParams();

    useBudget({ budgetId });

    return (
        <div style={{ color: 'white' }} className={classes.root}>
            <span>
                <div>{budgetId}</div>
            </span>
        </div>
    );
};

export default Budget;
