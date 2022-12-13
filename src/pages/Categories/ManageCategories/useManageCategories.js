import { useMemo } from 'react';
import { useIntl } from 'react-intl';

export const useManageCategories = () => {
    const { formatMessage } = useIntl();

    const suggestedCategoryMock = useMemo(
        () => ({
            categoryTitle: formatMessage({
                id: 'addCategories.categoryTitleMock',
                defaultMessage: '+ Dodaj kategorię (np. spożywcze)',
            }),
            subcategoryTitle: formatMessage({
                id: 'addCategories.subcategoryTitleMock',
                defaultMessage: '+ Dodaj podkategorię (np. napoje)',
            }),
            subcategoryDescription: formatMessage({
                id: 'addCategories.subcategoryDescrptionMock',
                defaultMessage:
                    'Wprowadź opis podkategorii. Opis może zostać pusty.',
            }),
        }),
        [formatMessage]
    );

    return { suggestedCategoryMock };
};
