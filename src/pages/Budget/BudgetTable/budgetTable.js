import React from 'react';
import { FormattedMessage } from 'react-intl';
import { number, shape, string, arrayOf, func } from 'prop-types';
import { AiFillEdit } from 'react-icons/ai';
import SimpleBar from 'simplebar-react';

import { useBudgetTable } from './useBudgetTable';
import { withCurrency } from 'utils/withCurrency';

import classes from './budgetTable.module.css';

const BudgetTable = (props) => {
    const {
        budgetData,
        handleEditSubcategoryAllocatedAmount,
        handleEditSubcategoryOutflows,
    } = props;

    const { categoriesWithSums } = useBudgetTable({ budgetData });

    if (!budgetData) {
        return (
            <p className={classes.noCategoriess}>
                <FormattedMessage
                    id="budgetTable.error"
                    defaultMessage="Wystąpił problem z pobraniem budżetu."
                />
            </p>
        );
    }

    if (budgetData.length === 0) {
        return (
            <p className={classes.noCategories}>
                <FormattedMessage
                    id="budgetTable.noCategories"
                    defaultMessage="Nie zdefiniowałeś jeszcze kategorii wydatków."
                />
            </p>
        );
    }

    return (
        <div className={classes.root}>
            <SimpleBar id="budget-table-simplebar">
                {categoriesWithSums.map((category) => (
                    <div className={classes.table} key={category.category_id}>
                        <div className={classes.labelRow}>
                            <div className={classes.labelCol}>
                                {category.category_name}
                            </div>
                            <div className={classes.labelCol}>
                                <FormattedMessage
                                    id="budgetTable.description"
                                    defaultMessage="Opis"
                                />
                            </div>
                            <div className={classes.labelCol}>
                                <FormattedMessage
                                    id="budgetTable.plan"
                                    defaultMessage="Plan (budżet)"
                                />
                            </div>
                            <div className={classes.labelCol}>
                                <FormattedMessage
                                    id="budgetTable.execution"
                                    defaultMessage="Wykonanie"
                                />
                            </div>
                            <div className={classes.labelCol}>
                                <FormattedMessage
                                    id="budgetTable.remains"
                                    defaultMessage="Zostało"
                                />
                            </div>
                        </div>
                        {category.subcategories?.length > 0 ? (
                            category.subcategories.map((subcategory) => (
                                <div
                                    className={classes.row}
                                    key={subcategory.subcategory_id}
                                >
                                    <div className={classes.col}>
                                        {subcategory.subcategory_name}
                                    </div>
                                    <div className={classes.col}>
                                        {subcategory.subcategory_description}
                                    </div>
                                    <div className={classes.col}>
                                        {withCurrency(
                                            subcategory.allocated_amount
                                        )}
                                        <AiFillEdit
                                            onClick={() =>
                                                handleEditSubcategoryAllocatedAmount(
                                                    {
                                                        name: subcategory.subcategory_name,
                                                        amount: subcategory.allocated_amount,
                                                        id: subcategory.subcategory_id,
                                                    }
                                                )
                                            }
                                            className={classes.editIcon}
                                        />
                                    </div>
                                    <div className={classes.col}>
                                        {withCurrency(
                                            subcategory.total_outflows
                                        )}
                                        <AiFillEdit
                                            onClick={() =>
                                                handleEditSubcategoryOutflows({
                                                    name: subcategory.subcategory_name,
                                                    amount: subcategory.allocated_amount,
                                                    id: subcategory.subcategory_id,
                                                })
                                            }
                                            className={classes.editIcon}
                                        />
                                    </div>
                                    <div className={classes.col}>
                                        {withCurrency(subcategory.rest_amount)}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className={classes.noSubcategories}>
                                <FormattedMessage
                                    id="budgetTable.noSubcategories"
                                    defaultMessage="Nie zdefiniowałeś jeszcze podkategorii wydatków"
                                />
                            </p>
                        )}
                        <div className={classes.totalsRow}>
                            <div className={classes.totalsCol}>
                                <FormattedMessage
                                    id="budgetTable.total"
                                    defaultMessage="Razem"
                                />
                            </div>
                            <div className={classes.totalsCol}>
                                {withCurrency(category.categoryTotalAllocated)}
                            </div>
                            <div className={classes.totalsCol}>
                                {withCurrency(category.categoryTotalExecution)}
                            </div>
                            <div className={classes.totalsCol}>
                                {withCurrency(category.categoryRestAmount)}
                            </div>
                        </div>
                    </div>
                ))}
            </SimpleBar>
        </div>
    );
};

export default BudgetTable;

BudgetTable.propTypes = {
    budgetData: shape({
        budget_id: number,
        budget_name: string,
        user_id: number,
        rest_amount: number,
        total_amount: number,
        inflows: arrayOf(
            shape({
                budget_inflow_id: number,
                amount: number,
                budget_id: number,
                name: string,
            })
        ),
        outflows: arrayOf(
            shape({
                amount: number,
                budget_id: number,
                budget_outflow_id: number,
                name: string,
                subcategory_id: number,
            })
        ),
    }),
    handleEditSubcategoryAllocatedAmount: func,
    handleEditSubcategoryOutflows: func,
};
