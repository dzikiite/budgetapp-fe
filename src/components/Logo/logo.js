import React from 'react';
import { number } from 'prop-types';
import { useIntl } from 'react-intl';

import logoWhite from './logoWhite.svg';

const Logo = (props) => {
    const { width = 189, height = 98 } = props;

    const { formatMessage } = useIntl();

    return (
        <img
            src={logoWhite}
            width={width}
            height={height}
            alt={formatMessage({
                id: 'logo.altMessage',
                defaultMessage: 'BudgetApp Logo',
            })}
        />
    );
};

export default Logo;

Logo.propTypes = {
    width: number,
    height: number,
};
