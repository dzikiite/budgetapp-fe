import React from 'react';
import { useForm, useFormState } from 'react-hook-form';
import { useIntl, FormattedMessage } from 'react-intl';

import { useAccountData } from './useAccountData';

import DashboardHeader from 'components/DashboardHeader';
import Form from 'components/Form';
import TextInput from 'components/TextInput';
import Button from 'components/Button';

import classes from './accountData.module.css';
import { BUTTONS_APPEARANCE } from 'utils/constants';

const AccountData = () => {
    const { defaultValues, handleFormSubmit } = useAccountData();
    const { register, handleSubmit, control } = useForm({
        defaultValues,
    });
    const { errors } = useFormState({
        control,
    });
    const { formatMessage } = useIntl();

    return (
        <div className={classes.root}>
            <DashboardHeader
                title={formatMessage({
                    id: 'accountData.title',
                    defaultMessage: 'Twoje dane',
                })}
            />
            <div className={classes.wrapper}>
                <Form onSubmit={handleFormSubmit} handleSubmit={handleSubmit}>
                    <TextInput
                        id="firstname"
                        label={formatMessage({
                            id: 'global.firstname',
                            defaultMessage: 'imię',
                        })}
                        register={register}
                        registerObject={{
                            required: formatMessage({
                                id: 'global.isRequired',
                                defaultMessage: 'Pole nie moze być puste',
                            }),
                        }}
                        placeholder={formatMessage({
                            id: 'global.firstname',
                            defaultMessage: 'imię',
                        })}
                        errors={errors}
                    />
                    <TextInput
                        id="lastname"
                        label={formatMessage({
                            id: 'createAccount.lastname',
                            defaultMessage: 'nazwisko',
                        })}
                        register={register}
                        registerObject={{
                            required: formatMessage({
                                id: 'global.isRequired',
                                defaultMessage: 'Pole nie moze być puste',
                            }),
                        }}
                        placeholder={formatMessage({
                            id: 'global.lastname',
                            defaultMessage: 'nazwisko',
                        })}
                        errors={errors}
                    />
                    <TextInput
                        id="email"
                        label={formatMessage({
                            id: 'global.email',
                            defaultMessage: 'email',
                        })}
                        register={register}
                        registerObject={{
                            required: formatMessage({
                                id: 'global.isRequired',
                                defaultMessage: 'Pole nie moze być puste',
                            }),
                        }}
                        placeholder={formatMessage({
                            id: 'global.email',
                            defaultMessage: 'email',
                        })}
                        errors={errors}
                    />
                    <div className={classes.button}>
                        <Button
                            type="submit"
                            appearance={BUTTONS_APPEARANCE.navyBlueSquare}
                        >
                            <FormattedMessage
                                id="accountData.save"
                                defaultMessage="Zapisz"
                            />
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default AccountData;
