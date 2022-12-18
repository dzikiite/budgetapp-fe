import React from 'react';
import { shape, string, bool, number, arrayOf, func } from 'prop-types';
import { FormattedMessage } from 'react-intl';

import Button from 'components/Button';

import classes from './manageRow.module.css';

const ManageRow = (props) => {
    const {
        suggestedCategoryMock,
        isMock,
        category,
        handleAddCategory,
        handleAddSubcategory,
        handleEditCategory,
        handleEditSubcategory,
    } = props;

    return (
        <div className={classes.root}>
            {isMock && suggestedCategoryMock ? (
                <>
                    <div className={classes.heading}>
                        <span>{suggestedCategoryMock.categoryTitle}</span>
                        <Button onClick={handleAddCategory}>
                            <FormattedMessage
                                id="addRow.add"
                                defaultMessage="Dodaj"
                            />
                        </Button>
                    </div>
                    <div className={classes.subcategories}>
                        <div className={classes.subcategory}>
                            <div className={classes.number}>1.</div>
                            <span className={classes.subcategoryName}>
                                {suggestedCategoryMock.subcategoryTitle}
                            </span>
                            <div className={classes.row}>
                                <span>
                                    {
                                        suggestedCategoryMock.subcategoryDescription
                                    }
                                </span>
                                <button
                                    type="button"
                                    className={classes.button}
                                    onClick={handleAddSubcategory}
                                >
                                    <FormattedMessage
                                        id="addRow.add"
                                        defaultMessage="Dodaj"
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div
                        className={classes.heading}
                        key={category.category_template_id}
                    >
                        <span>{category.category_name}</span>
                        <Button
                            onClick={() =>
                                handleEditCategory({
                                    categoryId: category.category_template_id,
                                })
                            }
                        >
                            <FormattedMessage
                                id="editRow.edit"
                                defaultMessage="Edytuj"
                            />
                        </Button>
                    </div>
                    <div className={classes.subcategories}>
                        {category.subcategories_templates.map(
                            (subcategory, index) => (
                                <div
                                    className={classes.subcategory}
                                    key={subcategory.subcategory_template_id}
                                >
                                    <div className={classes.number}>
                                        {`${index + 1}.`}
                                    </div>
                                    <span className={classes.subcategoryName}>
                                        {subcategory.subcategory_name}
                                    </span>
                                    <div className={classes.row}>
                                        <span>
                                            {
                                                subcategory.subcategory_description
                                            }
                                        </span>
                                        <button
                                            type="button"
                                            className={classes.button}
                                            onClick={() =>
                                                handleEditSubcategory({
                                                    subcategoryId:
                                                        subcategory.subcategory_template_id,
                                                    categoryId:
                                                        category.category_template_id,
                                                })
                                            }
                                        >
                                            <FormattedMessage
                                                id="addRow.edit"
                                                defaultMessage="Edytuj"
                                            />
                                        </button>
                                    </div>
                                </div>
                            )
                        )}
                        <div className={classes.subcategory}>
                            <div className={classes.number}>+</div>
                            <span className={classes.subcategoryName}>
                                {suggestedCategoryMock.subcategoryTitle}
                            </span>
                            <div className={classes.row}>
                                <span>
                                    {
                                        suggestedCategoryMock.subcategoryDescription
                                    }
                                </span>
                                <button
                                    type="button"
                                    className={classes.button}
                                    onClick={() =>
                                        handleAddSubcategory({
                                            categoryId:
                                                category.category_template_id,
                                        })
                                    }
                                >
                                    <FormattedMessage
                                        id="addRow.add"
                                        defaultMessage="Dodaj"
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ManageRow;

ManageRow.propTypes = {
    suggestedCategoryMock: shape({
        categoryTitle: string,
        subcategoryTitle: string,
        subcategoryDescription: string,
    }),
    isMock: bool,
    category: shape({
        category_name: string,
        category_template_id: number,
        subcategories_templates: arrayOf(
            shape({
                subcategory_name: string,
                subcategory_description: string,
                subcategory_template_id: number,
            })
        ),
    }),
    handleAddCategory: func,
    handleAddSubcategory: func,
    handleEditCategory: func,
    handleEditSubcategory: func,
};
