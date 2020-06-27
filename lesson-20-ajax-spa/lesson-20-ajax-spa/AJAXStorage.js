let ajaxStorageAddress = 'http://fe.it-academy.by/AjaxStringStorage2.php';

function TAJAXStorage(AjaxStorageKey) {
    let self = this;
    let hashWithRec = {};

    self.startCheck = function () {
        $.ajax({
            url: ajaxStorageAddress,
            type: 'POST',
            data: {
                f: 'READ',
                n: AjaxStorageKey
            },
            cache: false,
            success: function (d) {
                if (d.result.length !== 0) {
                    hashWithRec = JSON.parse(d.result);
                } else {
                    $.ajax({
                        url: ajaxStorageAddress,
                        type: 'POST',
                        data: {
                            f: 'INSERT',
                            n: AjaxStorageKey,
                            v: JSON.stringify(hashWithRec)
                        },
                        cache: false,
                        error: errorHandler
                    })
                }
            },
            error: errorHandler
        });
    };

    self.lockStorage = function () {
        $.ajax({
            url: ajaxStorageAddress,
            type: 'POST',
            data: {
                f: 'LOCKGET',
                n: AjaxStorageKey,
                p: '123456789'
            },
            cache: false,
            error: errorHandler
        })
    };

    self.updateStorage = function () {
        $.ajax({
            url: ajaxStorageAddress,
            type: 'POST',
            data: {
                f: 'UPDATE',
                n: AjaxStorageKey,
                p: '123456789',
                v: JSON.stringify(hashWithRec)
            },
            cache: false,
            error: errorHandler
        })
    };

    self.addValue = function (key, value) {
        hashWithRec[key] = value;
        console.log(hashWithRec);
        this.lockStorage();
        this.updateStorage();
    };


    self.getValue = function (key) {
        return hashWithRec[key]
    };

    self.deleteValue = function (key) {
        if (hashWithRec[key] !== undefined) {
            delete hashWithRec[key];
            this.lockStorage();
            this.updateStorage();
            return true;
        } else {
            return false;
        }
    };

    self.getKeys = function () {
        return Object.keys(hashWithRec);
    }
}
