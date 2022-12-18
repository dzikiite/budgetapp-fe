import React from 'react';
import { FormattedMessage } from 'react-intl';
import { arrayOf, shape, string, number, func } from 'prop-types';

import { useManageCategories } from './useManageCategories';

import Button from 'components/Button';
import ManageRow from './ManageRow';

import { BUTTONS_APPEARANCE } from 'utils/constants';
import classes from './manageCategories.module.css';

const ManageCategories = (props) => {
    const {
        categories,
        handleAddCategory,
        handleAddSubcategory,
        handleEditCategory,
        handleEditSubcategory,
    } = props;

    const { suggestedCategoryMock } = useManageCategories();

    return (
        <div className={classes.root}>
            <div className={classes.heading}>
                <h1 className={classes.title}>
                    <FormattedMessage
                        id="addCategories.title"
                        defaultMessage="Zarządzaj kategoriami wydatków"
                    />
                </h1>
                <Button
                    appearance={BUTTONS_APPEARANCE.navyBlueSquare}
                    onClick={handleAddCategory}
                >
                    <FormattedMessage
                        id="addCategories.addCategory"
                        defaultMessage="Dodaj kategorię"
                    />
                </Button>
            </div>
            <div className={classes.description}>
                <p>
                    <FormattedMessage
                        id="addCategories.description"
                        defaultMessage="Dodaj kategorię wydatków poniżej, a następnie przyporządkuj odpowiadające podkategorie. 
                                    Kazdorazowe dodanie zatwierdzaj przyciskiem “Dodaj”, 
                                    a na koniec zaakceptuj zmiany przyciskiem “Zapisz”. 
                                    Kategorie możesz dodawać bez ograniczeń."
                    />
                </p>
            </div>
            <div className={classes.rows}>
                {/* TODO: Handle delete category and subcategory */}
                {categories?.length > 0
                    ? categories.map((category) => (
                          <ManageRow
                              key={category.category_template_id}
                              suggestedCategoryMock={suggestedCategoryMock}
                              category={category}
                              handleAddCategory={handleAddCategory}
                              handleEditCategory={handleEditCategory}
                              handleEditSubcategory={handleEditSubcategory}
                              handleAddSubcategory={handleAddSubcategory}
                          />
                      ))
                    : null}
                <ManageRow
                    isMock
                    suggestedCategoryMock={suggestedCategoryMock}
                    handleAddCategory={handleAddCategory}
                    handleEditCategory={handleEditCategory}
                    handleEditSubcategory={handleEditSubcategory}
                    handleAddSubcategory={handleAddSubcategory}
                />
            </div>
        </div>
    );
};

export default ManageCategories;

ManageCategories.propTypes = {
    categories: arrayOf(
        shape({
            category_name: string,
            category_id: number,
            subcategories: arrayOf(
                shape({
                    subcategory_name: string,
                    subcategory_description: string,
                    subcategory_id: number,
                })
            ),
        })
    ),
    handleAddCategory: func,
    handleAddSubcategory: func,
    handleEditCategory: func,
    handleEditSubcategory: func,
};
