import React, { useMemo } from 'react';
import { useIntl, FormattedMessage } from 'react-intl';

import { useCategories, DIALOG_TYPE } from './useCategories';

import DashboardHeader from 'components/DashboardHeader';
import Category from './Category';
import Dialog from 'components/Dialog';
import ManageCategories from './ManageCategories';
import Button from 'components/Button';
import Edit from './Edit';
import Add from './Add';

import { BUTTONS_APPEARANCE } from 'utils/constants';
import classes from './categories.module.css';

const Categories = () => {
    const { formatMessage } = useIntl();

    const {
        categories,
        isDialogOpen,
        handleCloseDialog,
        handleOpenDialog,
        dialogType,
        isEdit,
        idInEdit,
        handleAddCategory,
        handleAddSubcategory,
        handleEditCategory,
        handleEditSubcategory,
        handleCancel,
        editInitialValues,
    } = useCategories();

    const dialogContent = useMemo(() => {
        if (!dialogType) {
            return (
                <ManageCategories
                    categories={categories}
                    handleAddCategory={handleAddCategory}
                    handleEditCategory={handleEditCategory}
                    handleEditSubcategory={handleEditSubcategory}
                    handleAddSubcategory={handleAddSubcategory}
                />
            );
        }

        if (dialogType === DIALOG_TYPE.category && isEdit) {
            return (
                <Edit
                    type={dialogType}
                    ids={idInEdit}
                    initialValues={editInitialValues}
                    handleCancel={handleCancel}
                />
            );
        }

        if (dialogType === DIALOG_TYPE.category && !isEdit) {
            return <Add type={dialogType} handleCancel={handleCancel} />;
        }

        if (dialogType === DIALOG_TYPE.subcategory && isEdit) {
            return (
                <Edit
                    type={dialogType}
                    ids={idInEdit}
                    initialValues={editInitialValues}
                    handleCancel={handleCancel}
                />
            );
        }

        return (
            <Add type={dialogType} handleCancel={handleCancel} ids={idInEdit} />
        );
    }, [
        dialogType,
        isEdit,
        categories,
        handleAddCategory,
        handleEditCategory,
        handleEditSubcategory,
        handleAddSubcategory,
        idInEdit,
        handleCancel,
        editInitialValues,
    ]);

    return (
        <>
            <div className={classes.root}>
                <DashboardHeader
                    title={formatMessage({
                        id: 'categories.title',
                        defaultMessage: 'Kategorie wydatków',
                    })}
                />
                <div className={classes.button}>
                    <Button
                        onClick={handleOpenDialog}
                        appearance={BUTTONS_APPEARANCE.navyBlueSquare}
                    >
                        <FormattedMessage
                            id="categories.manageBtn"
                            defaultMessage="Zarządzaj kategoriami"
                        />
                    </Button>
                </div>
                <div className={classes.categoriesWrapper}>
                    {categories.length > 0 ? (
                        categories.map((category) => (
                            <Category
                                category={category}
                                key={category.category_template_id}
                            />
                        ))
                    ) : (
                        <p>
                            <FormattedMessage
                                id="categories.noCategories"
                                defaultMessage="Nie masz aktualnie dodanych kategorii wydatków."
                            />
                        </p>
                    )}
                </div>
            </div>
            <Dialog isOpen={isDialogOpen} handleClose={handleCloseDialog}>
                {dialogContent}
            </Dialog>
        </>
    );
};

export default Categories;
