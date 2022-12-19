import React from 'react';

import DashboardHeader from 'components/DashboardHeader';
import BudgetsSummary from './BudgetsSummary';

import classes from './dashboard.module.css';

const Dashboard = () => (
    <div className={classes.root}>
        <DashboardHeader />
        <div className={classes.content}>
            <div className={classes.box}>
                <BudgetsSummary />
            </div>
        </div>
    </div>
);

export default Dashboard;
