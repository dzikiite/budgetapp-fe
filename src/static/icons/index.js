import React from 'react';

const pencil = ({ color, ...rest }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="25"
        fill="none"
        viewBox="0 0 25 25"
        {...rest}
    >
        <path
            fill={color}
            d="M7.61 23.276L20 10.886 14.115 5 1.724 17.39c-.17.171-.292.385-.35.62L0 25l6.99-1.373c.234-.059.449-.18.62-.351zM24 6.886a2.667 2.667 0 000-3.771L21.885 1a2.666 2.666 0 00-3.77 0L16 3.115 21.885 9 24 6.885z"
        />
    </svg>
);

export default { pencil };
