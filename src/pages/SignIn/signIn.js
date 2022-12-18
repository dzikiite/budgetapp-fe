import React from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

import { useSignIn } from './useSignIn';

import Form from 'components/Form';
import TextInput from 'components/TextInput';
import Button from 'components/Button';

import { PATHS } from 'utils/constants';
import classes from './signIn.module.css';

const SignIn = () => {
    const { register, handleSubmit, reset } = useForm();
    const { formatMessage } = useIntl();

    const { onSubmit } = useSignIn({ resetForm: reset });

    return (
        <div className={classes.root}>
            <h3 className={classes.title}>
                <FormattedMessage
                    id="signIn.title"
                    defaultMessage="Logowanie"
                />
            </h3>
            <p className={classes.subtitle}>
                <FormattedMessage
                    id="signIn.subtitle"
                    defaultMessage="Witaj! Zaloguj się do swiata finansów!"
                />
            </p>
            <Form onSubmit={onSubmit} handleSubmit={handleSubmit}>
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
                    <Link
                        to={PATHS.createAccount}
                        className={classes.registerLink}
                    >
                        <FormattedMessage
                            id="signIn.createAccount"
                            defaultMessage="Zarejestruj się"
                        />
                    </Link>
                    <Link
                        to={PATHS.forgotPassword}
                        className={classes.forgotPasswordLink}
                    >
                        <FormattedMessage
                            id="signIn.forgotPassword"
                            defaultMessage="Zapomniałeś hasła?"
                        />
                    </Link>
                </div>
                <div className={classes.button}>
                    <Button type="submit">
                        <FormattedMessage
                            id="signIn.button"
                            defaultMessage="Zaloguj"
                        />
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default SignIn;
