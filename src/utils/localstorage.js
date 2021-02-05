class LocalStorage {
    static set(key, value) {
        return localStorage.setItem(key, value);
    }
    static get(key) {
        return localStorage.getItem(key);
    }
    static remove(key) {
        return localStorage.removeItem(key);
    }
}

export default LocalStorage;
