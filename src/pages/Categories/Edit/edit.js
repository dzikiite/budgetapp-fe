import React from 'react';
import { oneOf, func, shape, number, string } from 'prop-types';
import { FormattedMessage, useIntl } from 'react-intl';
import { useForm } from 'react-hook-form';

import { useEdit } from './useEdit';

import Button from 'components/Button';
import Form from 'components/Form';
import TextInput from 'components/TextInput';

import classes from './edit.module.css';

const Edit = (props) => {
    const { type, handleCancel, ids, initialValues } = props;

    const { register, handleSubmit } = useForm({
        defaultValues: initialValues,
    });
    const { formatMessage } = useIntl();

    const { isCategoryEdit, handleEditCategory, handleEditSubcategory } =
        useEdit({
            type,
            onSuccess: handleCancel,
            ids,
        });

    return (
        <div className={classes.root}>
            <div className={classes.heading}>
                <h1 className={classes.title}>
                    {isCategoryEdit ? (
                        <FormattedMessage
                            id="add.titleCategory"
                            defaultMessage="Dodaj kategorię"
                        />
                    ) : (
                        <FormattedMessage
                            id="add.titleSubcategory"
                            defaultMessage="Dodaj podkategorię"
                        />
                    )}
                </h1>
            </div>
            <div className={classes.form}>
                <Form
                    onSubmit={
                        isCategoryEdit
                            ? handleEditCategory
                            : handleEditSubcategory
                    }
                    handleSubmit={handleSubmit}
                >
                    <TextInput
                        id="name"
                        label={
                            isCategoryEdit
                                ? formatMessage({
                                      id: 'add.categoryName',
                                      defaultMessage: 'Nazwa kategorii',
                                  })
                                : formatMessage({
                                      id: 'add.subcategoryName',
                                      defaultMessage: 'Nazwa podkategorii',
                                  })
                        }
                        register={register}
                        placeholder={
                            isCategoryEdit
                                ? formatMessage({
                                      id: 'add.categoryName',
                                      defaultMessage: 'Nazwa kategorii',
                                  })
                                : formatMessage({
                                      id: 'add.subcategoryName',
                                      defaultMessage: 'Nazwa podkategorii',
                                  })
                        }
                    />
                    {!isCategoryEdit ? (
                        <TextInput
                            id="description"
                            label={formatMessage({
                                id: 'add.subcategoryDescription',
                                defaultMessage: 'Opis podkategorii',
                            })}
                            register={register}
                            placeholder={formatMessage({
                                id: 'add.subcategoryDescription',
                                defaultMessage: 'Opis podkategorii',
                            })}
                            isRequired={false}
                        />
                    ) : null}
                    <div className={classes.buttons}>
                        <Button type="submit">
                            <FormattedMessage
                                id="global.save"
                                defaultMessage="Zapisz"
                            />
                        </Button>
                        <Button type="button" onClick={handleCancel}>
                            <FormattedMessage
                                id="global.back"
                                defaultMessage="Anuluj"
                            />
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Edit;

Edit.propTypes = {
    type: oneOf(['category', 'subcategory']),
    handleCancel: func,
    ids: shape({
        categoryId: number.isRequired,
        subcategoryId: number,
    }),
    initialValues: shape({ name: string.isRequired, description: string }),
};
