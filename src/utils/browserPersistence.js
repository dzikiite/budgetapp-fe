/**
 * Persistence layer with expiration based on localStorage.
 */

const KEY = 'BUDGET_APP';

class NamespacedLocalStorage {
    constructor(localStorage, key) {
        this.localStorage = localStorage;
        this.key = key;
    }

    #makeKey(key) {
        return `${this.key}__${key}`;
    }

    getItem(name) {
        return this.localStorage.getItem(this.#makeKey(name));
    }

    setItem(name, value) {
        return this.localStorage.setItem(this.#makeKey(name), value);
    }

    removeItem(name) {
        return this.localStorage.removeItem(this.#makeKey(name));
    }
}

const BrowserPersistence = () => {
    const storage = new NamespacedLocalStorage(window.localStorage, KEY);

    const getRawItem = (name) => storage.getItem(name);

    const getItem = (name) => {
        const now = Date.now();
        const item = storage.getItem(name);

        if (!item) {
            return undefined;
        }

        const { value, ttl, timeStored } = JSON.parse(item);

        if (ttl && now - timeStored > ttl * 1000) {
            storage.removeItem(name);

            return undefined;
        }

        return JSON.parse(value);
    };

    const setItem = (name, value, ttl) => {
        const timeStored = Date.now();

        storage.setItem(
            name,
            JSON.stringify({
                value: JSON.stringify(value),
                timeStored,
                ttl,
            })
        );
    };

    const removeItem = (name) => {
        storage.removeItem(name);
    };

    return {
        getRawItem,
        getItem,
        setItem,
        removeItem,
    };
};

export default BrowserPersistence;
