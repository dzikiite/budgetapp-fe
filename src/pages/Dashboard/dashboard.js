import React from 'react';

import DashboardHeader from 'components/DashboardHeader';

import classes from './dashboard.module.css';

const Dashboard = () => (
    <div className={classes.root}>
        <DashboardHeader />
    </div>
);

export default Dashboard;
