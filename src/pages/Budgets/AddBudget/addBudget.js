import React from 'react';
import { useForm } from 'react-hook-form';
import { useIntl, FormattedMessage } from 'react-intl';
import { func } from 'prop-types';

import Form from 'components/Form';
import Button from 'components/Button';
import TextInput from 'components/TextInput';

import classes from './addBudget.module.css';

const AddBudget = (props) => {
    const { handleAddBudget } = props;

    const { formatMessage } = useIntl();
    const { register, handleSubmit } = useForm();

    return (
        <Form
            onSubmit={handleAddBudget}
            handleSubmit={handleSubmit}
            className={classes.root}
        >
            <TextInput
                id="name"
                label={formatMessage({
                    id: 'addBudget.enterBudget',
                    defaultMessage: 'Wprowadź nazwę budżetu',
                })}
                register={register}
                placeholder={formatMessage({
                    id: 'addBudget.enterBudget',
                    defaultMessage: 'Wprowadź nazwę budżetu',
                })}
            />
            <div className={classes.button}>
                <Button
                    type="submit"
                    classes={{
                        root_violetGradientAppearance: classes.buttonRoot,
                    }}
                >
                    <FormattedMessage id="global.add" defaultMessage="Dodaj" />
                </Button>
            </div>
        </Form>
    );
};

export default AddBudget;

AddBudget.propTypes = {
    handleAddBudget: func,
};
