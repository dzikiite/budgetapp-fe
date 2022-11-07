import React from 'react';
import { number, string } from 'prop-types';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

import logoWhite from './logoWhite.svg';

const Logo = (props) => {
    const { width = 189, height = 98, url = '' } = props;

    const { formatMessage } = useIntl();

    return url ? (
        <Link to={url}>
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
    url: string,
};
