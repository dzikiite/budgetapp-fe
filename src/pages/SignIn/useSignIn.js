import { useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { useUserContext } from 'context/user/userContext';

import { PATHS } from 'utils/constants';
import api from 'utils/api';

export const useSignIn = (props) => {
    const { resetForm } = props;
    const { login } = api;

    const navigate = useNavigate();

    const [, { saveToken }] = useUserContext();

    // TODO: Handle loading state
    // TODO: Handle incorrect passes
    const { mutate: getCustomerToken } = useMutation(
        (mutationData) => login(mutationData),
        {
            onSuccess: (successData) => {
                const { token } = successData;

                saveToken(token);

                resetForm();

                navigate(PATHS.dashboard);
            },
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
