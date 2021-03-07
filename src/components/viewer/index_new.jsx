import React, { useEffect, useState } from 'react';
import './index.css';

function Viewer({ currentUrn, currentWidth, currentHeight, currentDeep }) {
    const [view, setView] = useState(null);
    const [model, setModel] = useState(null);
    const [viewer, setViewer] = useState(null);
    useEffect(() => {
        if (!window.Autodesk) {
            loadCSS(
                'https://developer.api.autodesk.com/modelderivative/v2/viewers/7.*/style.min.css'
            );
            loadScript(
                'https://developer.api.autodesk.com/modelderivative/v2/viewers/7.*/viewer3D.min.js'
            ).onload = () => {
                this.onScriptLoaded();
            };
        }
    }, []);

    const loadCSS = src => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = src;
        link.type = 'text/css';
        document.head.appendChild(link);
        return link;
    };

    const loadScript = src => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = src;
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
        return script;
    };

    const onScriptLoaded = () => {
        let that: any = this;
        this.getURN(function (urn: string) {
            var options = {
                env: 'AutodeskProduction',
                getAccessToken: that.getForgeToken.bind(that),
            };
            var documentId: string = 'urn:' + urn;
            Autodesk.Viewing.Initializer(options, function onInitialized() {
                Autodesk.Viewing.Document.load(
                    documentId,
                    that.onDocumentLoadSuccess.bind(that),
                    that.onDocumentLoadError
                );
            });
        });
    };
}

export default Viewer;
