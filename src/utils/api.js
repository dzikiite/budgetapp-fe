import axios from 'axios';

import BrowserPersistence from 'utils/browserPersistence';

const storage = BrowserPersistence();

const isSignedIn = () => !!storage.getItem('user_token');

export const apiClient = axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_URL}/api`,
});

const login = async ({ email, password }) => {
    const user = await apiClient.post('/auth/login', {
        email,
        password,
    });

    return user?.data;
};

const getUserData = async () => {
    const user = await apiClient.get('/user', {
        headers: {
            ...(isSignedIn() && {
                Authorization: `Bearer ${storage.getItem('user_token')}`,
            }),
        },
    });

    return user?.data;
};

const register = async ({ firstname, lastname, email, password }) => {
    const user = await apiClient.post('/auth/register', {
        firstname,
        lastname,
        email,
        password,
    });

    return user?.data;
};

const getCategories = async () => {
    const categories = await apiClient.get('/categories', {
        headers: {
            ...(isSignedIn() && {
                authorization: `Bearer ${storage.getItem('user_token')}`,
            }),
        },
    });

    return categories?.data;
};

const updateUserData = async ({ data }) => {
    const user = await apiClient.put(
        '/user',
        { ...data },
        {
            headers: {
                ...(isSignedIn() && {
                    authorization: `Bearer ${storage.getItem('user_token')}`,
                }),
            },
        }
    );

    return user?.data;
};

const addCategory = async (data) => {
    const category = await apiClient.post(
        '/categories',
        {
            category_name: data.name,
        },
        {
            headers: {
                ...(isSignedIn() && {
                    authorization: `Bearer ${storage.getItem('user_token')}`,
                }),
            },
        }
    );

    return category?.data;
};

const addSubcategory = async (data, id) => {
    const subcategory = await apiClient.post(
        `/subcategories/${id}`,
        {
            subcategory_name: data.name,
            subcategory_description: data.description,
        },
        {
            headers: {
                ...(isSignedIn() && {
                    authorization: `Bearer ${storage.getItem('user_token')}`,
                }),
            },
        }
    );

    return subcategory?.data;
};

const editCategory = async (data, id) => {
    const category = await apiClient.put(
        `/categories/${id}`,
        {
            category_name: data.name,
        },
        {
            headers: {
                ...(isSignedIn() && {
                    authorization: `Bearer ${storage.getItem('user_token')}`,
                }),
            },
        }
    );

    return category?.data;
};

const getBudgets = async () => {
    const budgets = await apiClient.get('/budgets', {
        headers: {
            ...(isSignedIn() && {
                authorization: `Bearer ${storage.getItem('user_token')}`,
            }),
        },
    });

    return budgets?.data;
};

const addBudget = async (data) => {
    const budget = await apiClient.post(
        '/budgets',
        {
            budget_name: data?.name,
        },
        {
            headers: {
                ...(isSignedIn() && {
                    authorization: `Bearer ${storage.getItem('user_token')}`,
                }),
            },
        }
    );

    return budget?.data;
};

export default {
    login,
    getUserData,
    register,
    getCategories,
    updateUserData,
    addCategory,
    addSubcategory,
    editCategory,
    getBudgets,
    addBudget,
};
