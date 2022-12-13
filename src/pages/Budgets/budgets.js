import React, { useMemo } from 'react';
import { useIntl, FormattedMessage } from 'react-intl';

import { useBudgets } from './useBudgets';

import DashboardHeader from 'components/DashboardHeader';
import AddBudget from './AddBudget';
import FilterBudgets from './FilterBudgets';
import BudgetItem from './BudgetItem';

import classes from './budgets.module.css';

const COLORS = [
    '#19237D',
    '#A500C0',
    '#5C29BF',
    '#00C064',
    '#009EC0',
    '#C00068',
];

const Budgets = () => {
    const { formatMessage } = useIntl();

    const {
        budgets,
        handleBudgetClick,
        handleAddBudget,
        filteredBudgets,
        setSearchPhrase,
        isSearchPhrase,
    } = useBudgets();

    const budgetsList = useMemo(() => {
        if (isSearchPhrase && filteredBudgets.length > 0) {
            return filteredBudgets.map((budget, index) => (
                <BudgetItem
                    key={budget.budget_id}
                    budget={budget}
                    handleBudgetClick={handleBudgetClick}
                    bgColor={
                        index > COLORS.length
                            ? COLORS[index % 6]
                            : COLORS[index]
                    }
                />
            ));
        }

        if (isSearchPhrase && filteredBudgets.length === 0) {
            return (
                <p>
                    <FormattedMessage
                        id="budgets.emptyFilter"
                        defaultMessage="Brak wyszukiwanych budżetów."
                    />
                </p>
            );
        }

        if (budgets.length > 0) {
            return budgets.map((budget, index) => (
                <BudgetItem
                    key={budget.budget_id}
                    budget={budget}
                    handleBudgetClick={handleBudgetClick}
                    bgColor={
                        index > COLORS.length
                            ? COLORS[index % 6]
                            : COLORS[index]
                    }
                />
            ));
        }

        return (
            <p>
                <FormattedMessage
                    id="budgets.empty"
                    defaultMessage="Nie posiadasz aktualnie żadnych dodanych budżetów."
                />
            </p>
        );
    }, [budgets, isSearchPhrase, handleBudgetClick, filteredBudgets]);

    return (
        <div className={classes.root}>
            <DashboardHeader
                title={formatMessage({
                    id: 'budgets.title',
                    defaultMessage: 'Lista budżetów domowych',
                })}
            />
            <div className={classes.content}>
                <p className={classes.description}>
                    <FormattedMessage
                        id="budgets.description"
                        defaultMessage="Dodaj budżet wpisując w pasku jego nazwę i zatwierdź. Możesz również wyszukać dany budżet. Poniże uzyskasz też spis Twoich budżetów."
                    />
                </p>
                <div className={classes.inputs}>
                    <AddBudget handleAddBudget={handleAddBudget} />
                    <FilterBudgets setSearchPhrase={setSearchPhrase} />
                </div>
                <div className={classes.budgets}>{budgetsList}</div>
            </div>
        </div>
    );
};

export default Budgets;
