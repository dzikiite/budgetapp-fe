import { useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';

import { useUserContext } from 'context/user/userContext';
import { useError } from 'hooks/useError';

import { PATHS } from 'utils/constants';
import api from 'utils/api';

export const useCreateAccount = (props) => {
    const { resetForm } = props;
    const { register } = api;

    const navigate = useNavigate();

    const [, { saveToken }] = useUserContext();
    const { handleError } = useError();
    const { formatMessage } = useIntl();

    const { mutate: registerUser } = useMutation(
        (mutationData) => register(mutationData),
        {
            onSuccess: (successData) => {
                const { user } = successData;

                saveToken(user.token);

                resetForm();

                navigate(PATHS.dashboard);
            },
            onError: () => {
                handleError(
                    formatMessage({
                        id: 'signIn.loginError',
                        defaultMessage:
                            'Nie udało się zalogować, sprawdź poprawność wproadzonych danych i spróbuj ponownie.',
                    })
                );
            },
        }
    );

    const onSubmit = useCallback(
        (formValues) => {
            registerUser(formValues);
        },
        [registerUser]
    );

    return {
        onSubmit,
    };
};
