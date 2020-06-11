function TLocalStorage(localStorageKey) {
    let self = this;
    let hashWithRec = {};

    self.Reset = function () {
        hashWithRec = {};
        let hashFromStorage = localStorage.getItem(localStorageKey);
        if (hashFromStorage !== null) {
            hashWithRec = JSON.parse(hashFromStorage);
        }
    };

    self.addValue = function (key, value) {
        hashWithRec[key] = value;
        let hashFromStorage = localStorage.getItem(localStorageKey);
        if (hashFromStorage !== null) {
            localStorage.removeItem(localStorageKey);
            localStorage.setItem(localStorageKey, JSON.stringify(hashWithRec));
        } else {
            localStorage.setItem(localStorageKey, JSON.stringify(hashWithRec));
        }
    };

    self.getValue = function (key) {
        return hashWithRec[key]
    };

    self.deleteValue = function (key) {
        let hashFromStorage = localStorage.getItem(localStorageKey);
        if (hashWithRec[key] !== undefined) {
            delete hashWithRec[key];
            if (hashFromStorage !== null) {
                localStorage.removeItem(localStorageKey);
                localStorage.setItem(localStorageKey, JSON.stringify(hashWithRec));
            }
            return true;
        } else {
            return false;
        }
    };

    self.getKeys = function () {
        return Object.keys(hashWithRec);
    }
}