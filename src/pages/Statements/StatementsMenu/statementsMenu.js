import React from 'react';
import { shape, string, number, func } from 'prop-types';

import classes from './statementsMenu.module.css';

const StatementsMenu = (props) => {
    const { budgets, handleSelectBudget } = props;

    return (
        <div className={classes.root}>
            {budgets.length > 0
                ? budgets.map((budget) => (
                      <button
                          type="button"
                          className={
                              budget.isActive
                                  ? classes.menuBtnActive
                                  : classes.menuBtn
                          }
                          onClick={() => handleSelectBudget(budget.id)}
                          key={budget.id}
                      >
                          {budget.name}
                      </button>
                  ))
                : null}
        </div>
    );
};

export default StatementsMenu;

StatementsMenu.propTypes = {
    budgets: shape({
        name: string,
        id: number,
    }),
    handleSelectBudget: func,
};
