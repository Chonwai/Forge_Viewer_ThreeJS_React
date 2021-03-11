export class MyExtension extends window.Autodesk.Viewing.Extension {
    load() {
        console.log('MyExtension has been loaded');
        return true;
    }

    unload() {
        console.log('MyExtension has been unloaded');
        return true;
    }

    static register() {
        window.Autodesk.Viewing.theExtensionManager.registerExtension('MyExtension', MyExtension);
    }
}
