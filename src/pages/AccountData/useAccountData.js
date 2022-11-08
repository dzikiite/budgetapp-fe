import { useCallback, useMemo } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useIntl } from 'react-intl';

import { useUserContext } from 'context/user/userContext';
import { shallowEqual } from 'utils/shallowEqual';

import api from 'utils/api';

export const useAccountData = () => {
    const { updateUserData } = api;

    const { formatMessage } = useIntl();
    const queryClient = useQueryClient();

    const [{ firstname, lastname, email }] = useUserContext();

    const { mutate: changeUserData } = useMutation({
        mutationFn: (data) => updateUserData({ data }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['userData'] });

            toast(
                formatMessage({
                    id: 'accountData.success',
                    defaultMessage: 'Dane zostały poprawnie zmienione',
                }),
                { type: 'success' }
            );
        },
    });

    const defaultValues = useMemo(
        () => ({
            firstname,
            lastname,
            email,
        }),
        [firstname, lastname, email]
    );

    const handleFormSubmit = useCallback(
        async (formValues) => {
            if (shallowEqual(formValues, defaultValues)) {
                toast(
                    formatMessage({
                        id: 'accountData.equals',
                        defaultMessage: 'Dane nie zostały zmienione',
                    }),
                    { type: 'info' }
                );

                return;
            }

            changeUserData(formValues);
        },
        [formatMessage, defaultValues, changeUserData]
    );

    return { defaultValues, handleFormSubmit };
};
