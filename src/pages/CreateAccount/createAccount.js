import React from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

import { useCreateAccount } from './useCreateAccount';

import Form from 'components/Form';
import TextInput from 'components/TextInput';
import Button from 'components/Button';

import { PATHS } from 'utils/constants';
import classes from './createAccount.module.css';

const CreateAccount = () => {
    const { register, handleSubmit, reset } = useForm();
    const { formatMessage } = useIntl();

    const { onSubmit } = useCreateAccount({ resetForm: reset });

    return (
        <div className={classes.root}>
            <h3 className={classes.title}>
                <FormattedMessage
                    id="createAccount.title"
                    defaultMessage="Rejestracja"
                />
            </h3>
            <p className={classes.subtitle}>
                <FormattedMessage
                    id="createAccount.subtitle"
                    defaultMessage="Witaj! Zarejestruj się do swiata finansów!"
                />
            </p>
            <Form onSubmit={onSubmit} handleSubmit={handleSubmit}>
                <TextInput
                    id="firstname"
                    label={formatMessage({
                        id: 'global.firstname',
                        defaultMessage: 'imię',
                    })}
                    register={register}
                    placeholder={formatMessage({
                        id: 'global.firstname',
                        defaultMessage: 'imię',
                    })}
                />
                <TextInput
                    id="lastname"
                    label={formatMessage({
                        id: 'createAccount.lastname',
                        defaultMessage: 'nazwisko',
                    })}
                    register={register}
                    placeholder={formatMessage({
                        id: 'global.lastname',
                        defaultMessage: 'nazwisko',
                    })}
                />
                <TextInput
                    id="email"
                    label={formatMessage({
                        id: 'global.email',
                        defaultMessage: 'email',
                    })}
                    register={register}
                    placeholder={formatMessage({
                        id: 'global.email',
                        defaultMessage: 'email',
                    })}
                />
                <TextInput
                    type="password"
                    id="password"
                    label={formatMessage({
                        id: 'global.password',
                        defaultMessage: 'hasło',
                    })}
                    register={register}
                    placeholder={formatMessage({
                        id: 'global.password',
                        defaultMessage: 'hasło',
                    })}
                />
                <div className={classes.links}>
                    <Link to={PATHS.signIn} className={classes.signInLink}>
                        <FormattedMessage
                            id="createAccount.doYouHaveAccount"
                            defaultMessage="Masz już konto?"
                        />
                    </Link>
                </div>
                <div className={classes.button}>
                    <Button type="submit">
                        <FormattedMessage
                            id="createAccount.button"
                            defaultMessage="Zarejestruj"
                        />
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default CreateAccount;
