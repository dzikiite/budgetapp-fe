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

export default { login, getUserData, register, getCategories, updateUserData };
