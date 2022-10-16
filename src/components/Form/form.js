import React from 'react';
import { shape, string, node, func } from 'prop-types';

import { useStyle } from 'hooks/useStyle';

import defaultClasses from './form.module.css';

const Form = (props) => {
    const {
        classes: propsClasses,
        onSubmit,
        handleSubmit,
        children,
        ...restProps
    } = props;

    const classes = useStyle(defaultClasses, propsClasses);

    return (
        <form
            className={classes.root}
            onSubmit={handleSubmit(onSubmit)}
            {...restProps}
        >
            {children}
        </form>
    );
};

export default Form;

Form.propTypes = {
    classes: shape({
        root: string,
    }),
    children: node,
    onSubmit: func,
    handleSubmit: func,
};
