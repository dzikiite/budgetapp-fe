import React from 'react';
import ReactDOM from 'react-dom/client';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import CombineProviders from 'utils/combineProviders';
import AppContextProvider from 'context/app/appContext';
import LocaleProvider from 'context/locale/localeContext';
import UserContextProvider from 'context/user/userContext';
import DataContextProvider from 'context/data/dataContext';

import App from './app';

import './index.css';
import 'react-toastify/dist/ReactToastify.min.css';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

const providers = [
    BrowserRouter,
    QueryClientProvider,
    LocaleProvider,
    AppContextProvider,
    UserContextProvider,
    DataContextProvider,
];

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <CombineProviders providers={providers} client={queryClient}>
            <App />
            {/* <ReactQueryDevtools /> */}
            <ToastContainer theme="dark" position="bottom-right" />
        </CombineProviders>
    </React.StrictMode>
);
