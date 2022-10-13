import React from 'react';
import { number, string } from 'prop-types';

import iconsLibrary from 'static/icons';

const Icon = (props) => {
    const { icon, width = 15, color = '#000000', ...rest } = props;

    const IconComponent = iconsLibrary[icon];

    return <IconComponent width={width} color={color} {...rest} />;
};

export default Icon;

Icon.propTypes = {
    icon: string.isRequired,
    width: number,
    color: string,
};
