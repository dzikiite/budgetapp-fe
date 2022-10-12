import React from 'react';

const CombineProviders = (props) => {
    const { providers = [], children, ...rest } = props;

    return providers.reduceRight(
        (acc, Component) => <Component {...rest}>{acc}</Component>,
        children
    );
};

export default CombineProviders;
