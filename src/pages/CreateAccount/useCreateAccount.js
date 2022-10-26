import { useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { useUserContext } from 'context/user/userContext';

import { PATHS } from 'utils/constants';
import api from 'utils/api';

export const useCreateAccount = (props) => {
    const { resetForm } = props;
    const { register } = api;

    const navigate = useNavigate();

    const [, { saveToken }] = useUserContext();

    // TODO: Handle loading state
    const { mutate: registerUser } = useMutation(
        (mutationData) => register(mutationData),
        {
            onSuccess: (successData) => {
                const { user } = successData;

                saveToken(user.token);

                resetForm();

                navigate(PATHS.dashboard);
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
