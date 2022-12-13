import React from 'react';
import { oneOf, func, shape, number } from 'prop-types';
import { FormattedMessage, useIntl } from 'react-intl';
import { useForm } from 'react-hook-form';

import { useAdd } from './useAdd';

import Button from 'components/Button';
import Form from 'components/Form';
import TextInput from 'components/TextInput';

import classes from './add.module.css';

const Add = (props) => {
    const { type, handleCancel, ids } = props;

    const { register, handleSubmit } = useForm();
    const { formatMessage } = useIntl();

    const { isCategoryAdd, handleAddCategory, handleAddSubcategory } = useAdd({
        type,
        ids,
        onSuccess: handleCancel,
    });

    return (
        <div className={classes.root}>
            <div className={classes.heading}>
                <h1 className={classes.title}>
                    {isCategoryAdd ? (
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
                        isCategoryAdd ? handleAddCategory : handleAddSubcategory
                    }
                    handleSubmit={handleSubmit}
                >
                    <TextInput
                        id="name"
                        label={
                            isCategoryAdd
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
                            isCategoryAdd
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
                    {!isCategoryAdd ? (
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

export default Add;

Add.propTypes = {
    type: oneOf(['category', 'subcategory']),
    handleCancel: func,
    ids: shape({
        categoryId: number.isRequired,
        subcategoryId: number,
    }),
};
