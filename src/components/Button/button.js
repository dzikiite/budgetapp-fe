import React, { useRef } from 'react';
import { node, string, bool, shape, func } from 'prop-types';
import { useButton } from 'react-aria';
import { motion } from 'framer-motion';

import { useStyle } from 'hooks/useStyle';
import { joinClasses } from 'utils/joinClasses';

import { BUTTONS_APPEARANCE } from 'utils/constants';
import defaultClasses from './button.module.css';

const getRootClassName = (appearance) => `root_${appearance}Appearance`;

const Button = (props) => {
    const {
        children,
        classes: propsClasses,
        appearance = BUTTONS_APPEARANCE.violetGradient,
        disabled = false,
        onPress,
        isBusy = false,
        type = 'button',
        ...restProps
    } = props;

    const buttonRef = useRef(null);

    const classes = useStyle(defaultClasses, propsClasses);

    const { buttonProps } = useButton(
        {
            isDisabled: disabled,
            onPress,
            ...restProps,
        },
        buttonRef
    );

    const rootClassName = joinClasses([
        classes[getRootClassName(appearance)],
        isBusy ? classes.rootBusy : '',
    ]);
    const spinnerClassName = isBusy ? classes.spinner : classes.spinnerHidden;

    return (
        <motion.button
            whileHover={{ scale: 1.06 }}
            whileFocus={{ scale: 1.06 }}
            ref={buttonRef}
            className={rootClassName}
            {...buttonProps}
            {...restProps}
            // eslint-disable-next-line react/button-has-type
            type={type}
        >
            <span className={spinnerClassName} />
            <span className={classes.content}>{children}</span>
        </motion.button>
    );
};

export default Button;

Button.propTypes = {
    children: node,
    classes: shape({
        root: string,
    }),
    appearance: string,
    disabled: bool,
    onPress: func,
    isBusy: bool,
    type: string,
};
