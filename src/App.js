import React, { cloneElement } from 'react';
import { useRoutes, useLocation } from 'react-router-dom';
import 'simplebar-react/dist/simplebar.min.css';

import { useWindowSize } from 'hooks/useWindowSize';

import GuestTemplate from 'components/RootTemplates/Guest';
import UserTemplate from 'components/RootTemplates/User';

import Homepage from 'pages/Homepage';
import SignIn from 'pages/SignIn';
import CreateAccount from 'pages/CreateAccount';
import Dashboard from 'pages/Dashboard';
import Budgets from 'pages/Budgets';
import Goals from 'pages/Goals';
import Statements from 'pages/Statements';
import AccountData from 'pages/AccountData';
import ChangePassword from 'pages/ChangePassword';
import Categories from 'pages/Categories';
import Budget from 'pages/Budget';

import './styles/simplebar.module.css';
import { PATHS } from 'utils/constants';

const App = () => {
    const location = useLocation();
    const windowSize = useWindowSize();

    const guestElement = useRoutes([
        {
            path: PATHS.home,
            element: <Homepage />,
        },
        {
            path: PATHS.signIn,
            element: <SignIn />,
        },
        {
            path: PATHS.createAccount,
            element: <CreateAccount />,
        },
    ]);

    const userElement = useRoutes([
        {
            path: PATHS.dashboard,
            element: <Dashboard />,
        },
        {
            path: PATHS.budgets,
            element: <Budgets />,
        },
        {
            path: `${PATHS.budget}/:budgetId`,
            element: <Budget />,
        },
        {
            path: PATHS.statements,
            element: <Statements />,
        },
        {
            path: PATHS.account,
            element: <AccountData />,
        },
        {
            path: PATHS.goals,
            element: <Goals />,
        },
        {
            path: PATHS.password,
            element: <ChangePassword />,
        },
        {
            path: PATHS.categories,
            element: <Categories />,
        },
    ]);

    return (
        <div
            style={{
                '--window-height': `${windowSize.height}px`,
                '--window-width': `${windowSize.width}px`,
                '--window-initial-height': `${windowSize.initialHeight}px`,
            }}
        >
            {guestElement ? (
                <GuestTemplate>
                    {cloneElement(guestElement, { key: location.pathname })}
                </GuestTemplate>
            ) : null}
            {userElement ? (
                <UserTemplate>
                    {cloneElement(userElement, { key: location.pathname })}
                </UserTemplate>
            ) : null}
        </div>
    );
};

export default App;
