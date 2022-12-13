import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useForm } from 'react-hook-form';
import { func } from 'prop-types';

import TextInput from 'components/TextInput';

import classes from './filterBudgets.module.css';

const FilterBudgets = (props) => {
    const { setSearchPhrase } = props;

    const { register, watch } = useForm();
    const { formatMessage } = useIntl();

    const searchValue = watch('search');

    useEffect(() => {
        setSearchPhrase(searchValue);
    }, [searchValue, setSearchPhrase]);

    return (
        <div className={classes.root}>
            <TextInput
                id="search"
                label={formatMessage({
                    id: 'filterBudgets.search',
                    defaultMessage: 'Znajdź budżet',
                })}
                placeholder={formatMessage({
                    id: 'filterBudgets.search',
                    defaultMessage: 'Znajdź budżet',
                })}
                register={register}
            />
        </div>
    );
};

export default FilterBudgets;

FilterBudgets.propTypes = {
    setSearchPhrase: func,
};
