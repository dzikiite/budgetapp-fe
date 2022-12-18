import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useForm } from 'react-hook-form';
import { string } from 'prop-types';

import { useAddForm } from './useAddForm';

import Form from 'components/Form';
import TextInput from 'components/TextInput';
import Button from 'components/Button';

import classes from './addForm.module.css';

const AddForm = (props) => {
    const { budgetId } = props;

    const { formatMessage } = useIntl();
    const { register, handleSubmit } = useForm();

    const { handleAddInflow } = useAddForm({ budgetId });

    return (
        <div className={classes.root}>
            <p className={classes.description}>
                <FormattedMessage
                    id="addForm.title"
                    defaultMessage="Dodaj nowe środki do budżetu"
                />
            </p>
            <div className={classes.form}>
                <Form onSubmit={handleAddInflow} handleSubmit={handleSubmit}>
                    <TextInput
                        id="name"
                        label={formatMessage({
                            id: 'addForm.inflowName',
                            defaultMessage: 'Nazwa wpływu budżetowego',
                        })}
                        register={register}
                        placeholder={formatMessage({
                            id: 'addForm.inflowName',
                            defaultMessage: 'Nazwa wpływu budżetowego',
                        })}
                    />
                    <TextInput
                        id="amount"
                        label={formatMessage({
                            id: 'addForm.amount',
                            defaultMessage: 'Kwota',
                        })}
                        register={register}
                        placeholder={formatMessage({
                            id: 'addForm.amount',
                            defaultMessage: 'Kwota',
                        })}
                    />
                    <div className={classes.buttons}>
                        <Button type="submit">
                            <FormattedMessage
                                id="global.save"
                                defaultMessage="Zapisz"
                            />
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default AddForm;

AddForm.propTypes = {
    budgetId: string,
};
