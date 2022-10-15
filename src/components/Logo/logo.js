import React from 'react';
import { number, bool } from 'prop-types';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

import { PATHS } from 'utils/constants';
import logoWhite from './logoWhite.svg';

const Logo = (props) => {
    const { width = 189, height = 98, isClickable = false } = props;

    const { formatMessage } = useIntl();

    return isClickable ? (
        <Link to={PATHS.home}>
            <img
                src={logoWhite}
                width={width}
                height={height}
                alt={formatMessage({
                    id: 'logo.altMessage',
                    defaultMessage: 'BudgetApp Logo',
                })}
            />
        </Link>
    ) : (
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
    isClickable: bool,
};
