import React, { useEffect, useState } from 'react';
import { IntlProvider } from 'react-intl';
import { node } from 'prop-types';

import BrowserPersistence from 'utils/browserPersistence';

import { LOCALES } from 'utils/constants';

const storage = BrowserPersistence();

const LocaleProvider = ({ children }) => {
    const [messages, setMessages] = useState(null);

    const locale = storage.getItem('locale') || LOCALES.pl;

    useEffect(() => {
        import(`../../locale/${locale}.json`)
            .then((data) => {
                setMessages(data.default);
            })
            .catch((error) => {
                console.error(`Unable to load translation file. \n${error}`);
            });
    }, [locale]);

    useEffect(() => {
        if (!storage.getItem('locale')) {
            storage.setItem('locale', LOCALES.pl);
        }
    }, []);

    const handleIntlError = (error) => {
        if (messages) {
            if (error.code === 'MISSING_TRANSLATION') {
                console.warn('Missing translation', error.message);
                return;
            }
            throw error;
        }
    };

    return (
        <IntlProvider
            key={locale}
            locale={locale}
            defaultLocale={LOCALES.pl}
            messages={messages}
            onError={handleIntlError}
        >
            {children}
        </IntlProvider>
    );
};

export default LocaleProvider;

LocaleProvider.propTypes = {
    children: node,
};
