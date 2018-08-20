import * as CryptoJS from "crypto-js";
import localStore from './storage';

const CredDao = function (_encryptionKey) {
    this.encryptionKey = _encryptionKey;
}

CredDao.prototype.encryptData = function (dataModelToSave) {
    const encrypted = CryptoJS.AES.encrypt(
        JSON.stringify(dataModelToSave),
        this.encryptionKey
    );
    return encrypted.toString();
}

CredDao.prototype.decryptData = function (dataModelToDecrypt) {
    const decrypted = CryptoJS.AES.decrypt(
        dataModelToDecrypt,
        this.encryptionKey
    );
    return decrypted.toString(CryptoJS.enc.Utf8);
}

CredDao.prototype.saveCredentail = function (domain, encryptedData) {
    const jsonToSave = {};
    jsonToSave.id = domain;
    jsonToSave.value = encryptedData;
    console.log("Form submitted", jsonToSave);

    let savedCredentails = localStore.get("savedCredentails");
    if (savedCredentails === null) {
        localStore.set("savedCredentails", []);
    }
    savedCredentails = localStore.get("savedCredentails");
    console.log("savedCredentails", savedCredentails);
    savedCredentails.push(jsonToSave);
    console.log("savedCredentails push", savedCredentails);

    localStore.set(
        "savedCredentails",
        savedCredentails
    );
}
CredDao.prototype.getAllCredentials = function () {
    const savedCredentails = localStore.get("savedCredentails");
    return savedCredentails;
}
CredDao.prototype.getCredential = function (domain) {
    const savedCredentails = localStore.get("savedCredentails");
    const resultData = savedCredentails.filter((item, index) => {
        return item.id.indexOf(domain) !== -1;
    });

    return resultData;
}

CredDao.prototype.deleteCredential = function (domain) {
    const savedCredentails = localStore.get("savedCredentails");
    const resultData = savedCredentails.filter((item, index) => {
        return item.id.indexOf(domain) === -1;
    });

    localStore.set(
        "savedCredentails",
        resultData
    );

    return resultData;
}

export default CredDao;