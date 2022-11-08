import React from 'react';
import { number, string, shape, arrayOf } from 'prop-types';

import classes from './category.module.css';

const Category = (props) => {
    const { category } = props;

    return (
        <div className={classes.root}>
            <div className={classes.titleWrapper}>
                <span className={classes.categoryTitle}>
                    {category.category_name}
                </span>
            </div>
            <div className={classes.subcategoriesWrapper}>
                {category.subcategories.map((subcategory, index) => (
                    <div
                        className={classes.subcategory}
                        key={subcategory.subcategory_id}
                    >
                        <div className={classes.number}>{`${index + 1}.`}</div>
                        <div className={classes.subcategoryName}>
                            <span>{subcategory.subcategory_name}</span>
                        </div>
                        <div className={classes.subcategoryDescription}>
                            <span>{subcategory.subcategory_description}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Category;

Category.propTypes = {
    category: shape({
        category_name: string,
        category_id: number,
        subcategories: arrayOf(
            shape({
                subcategory_name: string,
                subcategory_description: string,
                subcategory_id: number,
            })
        ),
    }),
};
