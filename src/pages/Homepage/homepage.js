import React from 'react';
import { useIntl, FormattedMessage } from 'react-intl';

import homepageGraphic from 'static/images/homepage-graphic.png';
import classes from './homepage.module.css';

const Homepage = () => {
    const { formatMessage } = useIntl();

    return (
        <div className={classes.root}>
            <div className={classes.graphicWrapper}>
                <img
                    className={classes.graphic}
                    src={homepageGraphic}
                    alt={formatMessage({
                        id: 'homepage.graphicAlt',
                        defaultMessage: 'Grafika ze znakiem z logo',
                    })}
                />
            </div>
            <div className={classes.info}>
                <ul className={classes.advantages}>
                    <li>
                        <FormattedMessage
                            id="homepage.control"
                            defaultMessage="Kontrola"
                        />
                    </li>
                    <li>
                        <FormattedMessage
                            id="homepage.savings"
                            defaultMessage="Oszczędności"
                        />
                    </li>
                    <li>
                        <FormattedMessage
                            id="homepage.awareness"
                            defaultMessage="Świadomość"
                        />
                    </li>
                </ul>
                <h1 className={classes.title}>
                    <FormattedMessage
                        id="homepage.title"
                        defaultMessage="Zadbaj o swoje finanse"
                    />
                </h1>
                <h2 className={classes.subtitle}>
                    <FormattedMessage
                        id="homepage.subtitle"
                        defaultMessage="Dołącz do swiadomej społeczności!"
                    />
                </h2>
            </div>
        </div>
    );
};

export default Homepage;
