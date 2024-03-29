import React from 'react';
import { node } from 'prop-types';

import { useUserTemplate } from './useUserTemplate';

import MainNavigation from 'components/MainNavigation';

import classes from './userTemplate.module.css';

const GuestTemplate = (props) => {
    const { children } = props;

    useUserTemplate();

    return (
        <div className={classes.root}>
            <MainNavigation />
            {children}
        </div>
    );
};

export default GuestTemplate;

GuestTemplate.propTypes = {
    children: node,
};
