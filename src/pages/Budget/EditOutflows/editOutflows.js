import React from 'react';
import { string, number, shape, arrayOf } from 'prop-types';
import { FormattedMessage, useIntl } from 'react-intl';
import { useForm } from 'react-hook-form';
import { FaTrashAlt } from 'react-icons/fa';

import { useEditOutflows } from './useEditOutflows';
import { withCurrency } from 'utils/withCurrency';

import Form from 'components/Form';
import TextInput from 'components/TextInput';
import Button from 'components/Button';

import classes from './editOutflows.module.css';

const EditOutflows = (props) => {
    const { subcategoryData, budgetData } = props;

    const { formatMessage } = useIntl();
    const { register, handleSubmit, reset } = useForm();

    const { outflows, handleDeleteOutflow, handleAddOutflow } = useEditOutflows(
        {
            subcategoryData,
            budgetData,
        }
    );

    return (
        <div className={classes.root}>
            <p className={classes.title}>
                <FormattedMessage
                    id="editOutflows.title"
                    defaultMessage="Zarządzaj wydatkami dla podkategorii {name}"
                    values={{ name: subcategoryData.name }}
                />
            </p>
            <div className={classes.outflows}>
                {outflows.length > 0 ? (
                    outflows.map((outflow) => (
                        <div
                            className={classes.outflow}
                            key={outflow.budget_outflow_id}
                        >
                            <div className={classes.col}>{outflow.name}</div>
                            <div className={classes.col}>
                                {` - ${withCurrency(outflow.amount)}`}
                            </div>
                            <div className={classes.col}>
                                <FaTrashAlt
                                    onClick={() =>
                                        handleDeleteOutflow(
                                            outflow.budget_outflow_id
                                        )
                                    }
                                />
                            </div>
                        </div>
                    ))
                ) : (
                    <p className={classes.noOutflows}>
                        <FormattedMessage
                            id="editOutflows.noOutflows"
                            defaultMessage="Nie dodałeś jeszcze żadnych wydatków dla wybranej podkategorii"
                        />
                    </p>
                )}
                <div className={classes.addOutflow}>
                    <p className={classes.description}>
                        <FormattedMessage
                            id="editOutflows.addDescription"
                            defaultMessage="Dodaj nowy wydatek dla podkategorii"
                        />
                    </p>
                </div>
                <div className={classes.form}>
                    <Form
                        onSubmit={async (formValues) => {
                            await handleAddOutflow(formValues);
                            reset();
                        }}
                        handleSubmit={handleSubmit}
                    >
                        <TextInput
                            id="name"
                            label={formatMessage({
                                id: 'editOutflows.name',
                                defaultMessage: 'Nazwa wydatku (opcjonalnie)',
                            })}
                            register={register}
                            placeholder={formatMessage({
                                id: 'editOutflows.name',
                                defaultMessage: 'Nazwa wydatku (opcjonalnie)',
                            })}
                            isRequired={false}
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
        </div>
    );
};

export default EditOutflows;

EditOutflows.propTypes = {
    subcategoryData: shape({
        name: string,
        amount: number,
        id: number,
    }),
    budgetData: shape({
        budget_id: number,
        budget_name: string,
        user_id: number,
        rest_amount: number,
        total_amount: number,
        inflows: arrayOf(
            shape({
                budget_inflow_id: number,
                amount: number,
                budget_id: number,
                name: string,
            })
        ),
        outflows: arrayOf(
            shape({
                amount: number,
                budget_id: number,
                budget_outflow_id: number,
                name: string,
                subcategory_id: number,
            })
        ),
    }),
};
