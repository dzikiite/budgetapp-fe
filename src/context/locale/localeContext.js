import React, {
    useEffect,
    useState,
    useContext,
    createContext,
    useMemo,
    useCallback,
} from 'react';
import { IntlProvider } from 'react-intl';
import { node } from 'prop-types';
import { useNavigate } from 'react-router-dom';

import BrowserPersistence from 'utils/browserPersistence';

import { LOCALES } from 'utils/constants';

const storage = BrowserPersistence();

const LocaleContext = createContext(null);

const LocaleProvider = ({ children }) => {
    const [messages, setMessages] = useState(null);

    const navigate = useNavigate();

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

    const switchAppLocale = useCallback(
        (localeName) => {
            const isValidLocale = Object.values(LOCALES).some(
                (validLocale) => validLocale === locale
            );

            if (!isValidLocale) {
                throw new Error('Invalid locale name');
            }

            storage.setItem('locale', localeName);

            navigate(0);
        },
        [navigate, locale]
    );

    const contextValue = useMemo(
        () => ({ switchAppLocale }),
        [switchAppLocale]
    );

    return (
        <LocaleContext.Provider value={contextValue}>
            <IntlProvider
                key={locale}
                locale={locale}
                defaultLocale={LOCALES.pl}
                messages={messages}
                onError={handleIntlError}
            >
                {children}
            </IntlProvider>
        </LocaleContext.Provider>
    );
};

export const useLocaleContext = () => useContext(LocaleContext);

export default LocaleProvider;

LocaleProvider.propTypes = {
    children: node,
};
