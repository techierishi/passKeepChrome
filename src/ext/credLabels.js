import localStore from './storage';

const CredLabels = function () {
    this.defaultLabels = [
        { checked: false, value: "Bank" },
        { checked: false, value: "Email" },
        { checked: false, value: "Forum" },
        { checked: false, value: "Q&A" },
        { checked: false, value: "Tutorial" },
        { checked: false, value: "Entertainment" },
        { checked: false, value: "Music" },
        { checked: false, value: "Videos" },
        { checked: false, value: "Blog" },
        { checked: false, value: "Social Network" },
        { checked: false, value: "Other" }
    ];
}

CredLabels.prototype.getAll = function () {
    let savedLabels = localStore.get("credLabels");
    if (savedLabels === null) {
        localStore.set("credLabels", this.defaultLabels);
    }
    savedLabels = localStore.get("credLabels");

    return savedLabels;
}

CredLabels.prototype.addNew = function (newLabel) {
    const savedLabels = localStore.get("credLabels");
    savedLabels.push(newLabel);
    localStore.set("credLabels", savedLabels);
    return savedLabels;
}

export default CredLabels;