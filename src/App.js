import React from 'react';

import Logo from 'components/Logo';
import Button from 'components/Button';

import { BUTTONS_APPEARANCE } from 'utils/constants';

const App = () => (
    <div className="App">
        <Logo />
        <Button appearance={BUTTONS_APPEARANCE.violetOutline}>
            Zaloguj się
        </Button>
    </div>
);

export default App;
