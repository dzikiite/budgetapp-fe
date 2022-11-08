import React from 'react';
import { useIntl } from 'react-intl';

import { useCategories } from './useCategories';

import DashboardHeader from 'components/DashboardHeader';
import Category from './Category';
import Dialog from 'components/Dialog';

import classes from './categories.module.css';

const Categories = () => {
    const { formatMessage } = useIntl();

    const { categories, isDialogOpen, handleCloseDialog } = useCategories();

    return (
        <>
            <div className={classes.root}>
                <DashboardHeader
                    title={formatMessage({
                        id: 'categories.title',
                        defaultMessage: 'Kategorie wydatków',
                    })}
                />
                <div className={classes.categoriesWrapper}>
                    {categories.length > 0
                        ? categories.map((category) => (
                              <Category
                                  category={category}
                                  key={category.category_id}
                              />
                          ))
                        : null}
                </div>
            </div>
            <Dialog isOpen={isDialogOpen} handleClose={handleCloseDialog} />
        </>
    );
};

export default Categories;
