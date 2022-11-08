import React from 'react';
import { bool, func, node } from 'prop-types';
import { useIntl } from 'react-intl';

import { useLockBodyScroll } from 'hooks/useLockBodyScroll';

import Icon from 'components/Icon';

import classes from './dialog.module.css';

const Dialog = (props) => {
    const { isOpen, handleClose, children } = props;

    const { formatMessage } = useIntl();

    useLockBodyScroll(isOpen);

    const rootClass = isOpen ? classes.rootOpen : classes.root;
    const maskClass = isOpen ? classes.maskOpen : classes.mask;

    return (
        <>
            <aside className={rootClass}>
                <div className={classes.header}>
                    <button
                        type="button"
                        onClick={handleClose}
                        className={classes.closeBtn}
                    >
                        <Icon icon="close" color="#ffffff" />
                    </button>
                </div>
                <div className={classes.content}>{children}</div>
            </aside>
            <button
                type="button"
                aria-label={formatMessage({
                    id: 'modal.close',
                    defaultMessage: 'Zamknij modal',
                })}
                className={maskClass}
                onClick={handleClose}
            />
        </>
    );
};

export default Dialog;

Dialog.propTypes = {
    isOpen: bool,
    handleClose: func,
    children: node,
};
