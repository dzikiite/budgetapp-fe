import React from 'react';
import { motion } from 'framer-motion';
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
    // TODO Handle errors
    const { register, handleSubmit } = useForm();
    const { formatMessage } = useIntl();

    const { onSubmit } = useSignIn();

    return (
        <motion.div className={classes.root}>
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
                    label="Email"
                    register={register}
                    placeholder={formatMessage({
                        id: 'global.email',
                        defaultMessage: 'email',
                    })}
                />
                <TextInput
                    type="password"
                    id="password"
                    label="Hasło"
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
        </motion.div>
    );
};

export default SignIn;
