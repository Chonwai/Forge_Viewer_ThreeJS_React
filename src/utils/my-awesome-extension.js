function MyAwesomeExtension(viewer, options) {
    window.Autodesk.Viewing.Extension.call(this, viewer, options);
}

MyAwesomeExtension.prototype = Object.create(window.Autodesk.Viewing.Extension.prototype);
MyAwesomeExtension.prototype.constructor = MyAwesomeExtension;

MyAwesomeExtension.prototype.load = function () {
    alert('MyAwesomeExtension is loaded!');
    return true;
};

MyAwesomeExtension.prototype.unload = function () {
    alert('MyAwesomeExtension is now unloaded!');
    return true;
};

export { MyAwesomeExtension };

// window.Autodesk.Viewing.theExtensionManager.registerExtension(
//     'MyAwesomeExtension',
//     MyAwesomeExtension
// );
