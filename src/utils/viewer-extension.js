class ViewerExtension extends window.Autodesk.Viewing.Extension {
    constructor(viewer, options) {
        super(viewer, options);
        this.viewer = viewer;
    }

    load() {
        console.log('TemplateExtension is loaded!');

        return true;
    }
    unload() {
        console.log('TemplateExtension is now unloaded!');
        return true;
    }
}

window.Autodesk.Viewing.theExtensionManager.registerExtension('ViewerExtension', ViewerExtension);

// export default ViewerExtension;
