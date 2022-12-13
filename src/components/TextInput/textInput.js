import React from 'react';
import { string, shape, func, object, bool } from 'prop-types';
import { ErrorMessage } from '@hookform/error-message';

import { useStyle } from 'hooks/useStyle';

import defaultClasses from './textInput.module.css';

const TextInput = (props) => {
    const {
        classes: propsClasses,
        id,
        label,
        isRequired = true,
        register,
        type = 'text',
        errors,
        registerObject,
        ...restProps
    } = props;

    const classes = useStyle(defaultClasses, propsClasses);

    return (
        <div className={classes.root}>
            <label className={classes.label} htmlFor={id}>
                {`${label || null} ${isRequired ? '*' : ''}`}
            </label>
            <input
                className={classes.input}
                type={type}
                id={id}
                {...register(id, { ...registerObject })}
                {...restProps}
            />
            <span className={classes.error}>
                {errors ? <ErrorMessage errors={errors} name={id} /> : null}
            </span>
        </div>
    );
};

export default TextInput;

TextInput.propTypes = {
    classes: shape({
        root: string,
        label: string,
    }),
    id: string.isRequired,
    label: string,
    isRequired: bool,
    register: func,
    type: string,
    // eslint-disable-next-line react/forbid-prop-types
    errors: object,
    // eslint-disable-next-line react/forbid-prop-types
    registerObject: object,
};
