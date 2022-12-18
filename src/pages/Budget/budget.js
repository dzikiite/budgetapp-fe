import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';

import { useBudget, DIALOG_VIEWS } from './useBudget';
import { withCurrency } from 'utils/withCurrency';

import DashboardHeader from 'components/DashboardHeader';
import Button from 'components/Button';
import BudgetTable from './BudgetTable';
import Dialog from 'components/Dialog';
import ManageBudget from './ManageBudget';
import EditAllocated from './EditAllocated';
import EditOutflows from './EditOutflows';

import { BUTTONS_APPEARANCE } from 'utils/constants';
import classes from './budget.module.css';

const Budget = () => {
    const { budgetId } = useParams();
    const { formatMessage } = useIntl();

    const {
        budgetData,
        handleOpenDialog,
        handleCloseDialog,
        isDialogOpen,
        currentView,
        budgetAmounts,
        handleEditSubcategoryAllocatedAmount,
        selectedSubcategoryData,
        handleEditSubcategoryOutflows,
    } = useBudget({ budgetId });

    const dialogContent = useMemo(() => {
        if (currentView === DIALOG_VIEWS.manageBudget) {
            return <ManageBudget budgetData={budgetData} />;
        }

        if (currentView === DIALOG_VIEWS.editAllocated) {
            return (
                <EditAllocated
                    subcategoryData={selectedSubcategoryData}
                    onSuccess={handleCloseDialog}
                />
            );
        }

        if (currentView === DIALOG_VIEWS.editOutflows) {
            return (
                <EditOutflows
                    subcategoryData={selectedSubcategoryData}
                    budgetData={budgetData}
                />
            );
        }

        return null;
    }, [currentView, budgetData, selectedSubcategoryData, handleCloseDialog]);

    if (!budgetData) {
        return (
            <p className={classes.empty}>
                <FormattedMessage
                    id="budget.notFound"
                    defaultMessage="Nie posiadasz budżetu o podanym indentyfikatorze."
                />
            </p>
        );
    }

    const { budget_name: budgetName } = budgetData;

    const { totalAmount, restAmount, allocatedAmount } = budgetAmounts;

    return (
        <div className={classes.root}>
            <DashboardHeader
                title={formatMessage({
                    id: 'budget.title',
                    defaultMessage: `Budżet - ${budgetName}`,
                })}
            />
            <div className={classes.wrapper}>
                <div className={classes.content}>
                    <div className={classes.addInflow}>
                        <Button
                            appearance={BUTTONS_APPEARANCE.navyBlueSquare}
                            onClick={() =>
                                handleOpenDialog(DIALOG_VIEWS.manageBudget)
                            }
                        >
                            <FormattedMessage
                                id="budget.addInflow"
                                defaultMessage="Edytuj kwotę budżetu"
                            />
                        </Button>
                    </div>
                    <div className={classes.totals}>
                        <div className={classes.col}>
                            <div className={classes.row}>
                                <FormattedMessage
                                    id="budget.totalAmount"
                                    defaultMessage="Środki do rozdysponowania"
                                />
                            </div>
                            <div className={classes.row}>
                                {withCurrency(totalAmount)}
                            </div>
                        </div>
                        <div className={classes.col}>
                            <div className={classes.row}>
                                <FormattedMessage
                                    id="budget.restAmountToPlan"
                                    defaultMessage="Zaplanowanie w budżecie"
                                />
                            </div>
                            <div className={classes.row}>
                                {withCurrency(allocatedAmount)}
                            </div>
                        </div>
                        <div className={classes.col}>
                            <div className={classes.row}>
                                <FormattedMessage
                                    id="budget.restAmount"
                                    defaultMessage="Pozostało do zaplanowania"
                                />
                            </div>
                            <div className={classes.row}>
                                {withCurrency(restAmount)}
                            </div>
                        </div>
                    </div>
                    <div className={classes.table}>
                        <BudgetTable
                            budgetId={budgetId}
                            budgetData={budgetData}
                            handleEditSubcategoryAllocatedAmount={
                                handleEditSubcategoryAllocatedAmount
                            }
                            handleEditSubcategoryOutflows={
                                handleEditSubcategoryOutflows
                            }
                        />
                    </div>
                </div>
            </div>
            <Dialog isOpen={isDialogOpen} handleClose={handleCloseDialog}>
                {dialogContent}
            </Dialog>
        </div>
    );
};

export default Budget;
