import React from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
import { motion } from 'framer-motion';

import homepageGraphic from 'static/images/homepage-graphic.png';
import classes from './homepage.module.css';

const Homepage = () => {
    const { formatMessage } = useIntl();

    return (
        <div className={classes.root}>
            <div className={classes.graphicWrapper}>
                <motion.img
                    className={classes.graphic}
                    src={homepageGraphic}
                    alt={formatMessage({
                        id: 'homepage.graphicAlt',
                        defaultMessage: 'Grafika ze znakiem z logo',
                    })}
                    initial={{ rotate: 0, scale: 1 }}
                    animate={{ rotate: -5, scale: 1.05 }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: 'mirror',
                    }}
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
