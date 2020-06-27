function THashStorage() {
    let self = this;
    let hashWithRec = {};

    self.addValue = function (key, value) {
        hashWithRec[key] = value;
    };

    self.getValue = function (key) {
        return hashWithRec[key]
    };

    self.deleteValue = function (key) {
        if (hashWithRec[key] !== undefined) {
            delete hashWithRec[key];
            return true;
        } else {
            return false;
        }
    };

    self.getKeys = function () {
        return Object.keys(hashWithRec);
    }
}