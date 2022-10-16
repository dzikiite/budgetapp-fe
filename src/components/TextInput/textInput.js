import React from 'react';
import { string, shape, func, object } from 'prop-types';

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
        ...restProps
    } = props;

    const classes = useStyle(defaultClasses, propsClasses);

    return (
        <div className={classes.root}>
            <label className={classes.label} htmlFor={id}>
                {`${label || null} ${isRequired ? '*' : null}`}
            </label>
            <input
                className={classes.input}
                type={type}
                id={id}
                {...register(id)}
                {...restProps}
            />
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
    isRequired: string,
    register: func,
    type: string,
    // eslint-disable-next-line react/forbid-prop-types
    errors: object,
};