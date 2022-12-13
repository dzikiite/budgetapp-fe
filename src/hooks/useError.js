import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { useIntl } from 'react-intl';

export const useError = () => {
    const { formatMessage } = useIntl();

    const handleError = useCallback(
        (message) => {
            toast(
                message ||
                    formatMessage({
                        id: 'global.error',
                        defaultMessage:
                            'Ups.. Wystąpił błąd aplikacji. Odśwież i spróbuj ponownie',
                    })
            );
        },
        [formatMessage]
    );

    return { handleError };
};
