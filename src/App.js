import React, { cloneElement } from 'react';
import { useRoutes, useLocation } from 'react-router-dom';

import GuestTemplate from 'components/RootTemplates/Guest';

import Homepage from 'pages/Homepage';
import SignIn from 'pages/SignIn';
import CreateAccount from 'pages/CreateAccount';
import ForgotPassword from 'pages/ForgotPassword';

import { PATHS } from 'utils/constants';

const App = () => {
    const location = useLocation();

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
        {
            path: PATHS.forgotPassword,
            element: <ForgotPassword />,
        },
    ]);

    if (!guestElement) return null;

    return (
        <div className="App">
            <GuestTemplate>
                {cloneElement(guestElement, { key: location.pathname })}
            </GuestTemplate>
        </div>
    );
};

export default App;
