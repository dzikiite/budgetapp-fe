import { useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';

import { useUserContext } from 'context/user/userContext';
import { useError } from 'hooks/useError';

import { PATHS } from 'utils/constants';
import api from 'utils/api';

export const useSignIn = (props) => {
    const { resetForm } = props;
    const { login } = api;

    const navigate = useNavigate();
    const { formatMessage } = useIntl();

    const [, { saveToken }] = useUserContext();
    const { handleError } = useError();

    const { mutate: getCustomerToken } = useMutation(
        (mutationData) => login(mutationData),
        {
            onSuccess: (successData) => {
                const { token } = successData;

                saveToken(token);

                resetForm();

                navigate(PATHS.dashboard);
            },
            onError: () =>
                handleError(
                    formatMessage({
                        id: 'signIn.loginError',
                        defaultMessage:
                            'Nie udało się zalogować, sprawdź poprawność wproadzonych danych i spróbuj ponownie.',
                    })
                ),
        }
    );

    const onSubmit = useCallback(
        async (formValues) => {
            getCustomerToken(formValues);
        },
        [getCustomerToken]
    );

    return {
        onSubmit,
    };
};
