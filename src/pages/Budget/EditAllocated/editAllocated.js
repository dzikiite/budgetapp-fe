import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useForm } from 'react-hook-form';
import { shape, string, number, func } from 'prop-types';

import { useEditAllocated } from './useEditAllocated';

import Button from 'components/Button';
import Form from 'components/Form';
import TextInput from 'components/TextInput';

import classes from './editAllocated.module.css';

const EditAllocated = (props) => {
    const { subcategoryData, onSuccess } = props;
    const { amount, name, id } = subcategoryData;

    const { register, handleSubmit } = useForm({
        defaultValues: { amount },
    });
    const { formatMessage } = useIntl();

    const { handleEditAllocated } = useEditAllocated({
        subcategoryId: id,
        onSuccess,
    });

    return (
        <div className={classes.root}>
            <p className={classes.title}>
                <FormattedMessage
                    id="editAllocated.title"
                    defaultMessage="Zmień zabudżetowaną kwotę dla podkategorii {name}"
                    values={{ name }}
                />
            </p>
            <div className={classes.form}>
                <Form
                    onSubmit={handleEditAllocated}
                    handleSubmit={handleSubmit}
                >
                    <TextInput
                        id="amount"
                        label={formatMessage({
                            id: 'editAllocated.amount',
                            defaultMessage: 'Kwota',
                        })}
                        register={register}
                        placeholder={formatMessage({
                            id: 'editAllocated.amount',
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

export default EditAllocated;

EditAllocated.propTypes = {
    subcategoryData: shape({
        name: string,
        amount: number,
        id: number,
    }),
    onSuccess: func,
};
