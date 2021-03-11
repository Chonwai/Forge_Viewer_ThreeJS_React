import React, { useEffect, useState } from 'react';
import LocalStroage from '../../utils/localstorage';
import './index.css';

function Viewer({ currentUrn }) {
    // const [embedURLfromA360, setEmbedURLfromA360] = useState(null);
    // const [viewer, setViewer] = useState(null);
    var embedURLfromA360 = null;
    var viewer = null;

    useEffect(() => {
        embedURLfromA360 =
            'https://myhub.autodesk360.com/ue29c89b7/shares/public/SH7f1edQT22b515c761e81af7c91890bcea5?mode=embed';
        if (!window.Autodesk) {
            loadCss(
                'https://developer.api.autodesk.com/modelderivative/v2/viewers/7.*/style.min.css'
            );
            loadScript(
                'https://developer.api.autodesk.com/modelderivative/v2/viewers/7.*/viewer3D.min.js'
            ).onload = () => {
                onScriptLoaded();
            };
        }
    }, []);

    const loadCss = src => {
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
        var options = {
            env: 'AutodeskProduction',
            getAccessToken: function (onTokenReady) {
                var token = LocalStroage.get('access_token');
                var timeInSeconds = 3600; // Use value provided by Forge Authentication (OAuth) API
                onTokenReady(token, timeInSeconds);
            },
        };
        var documentId = 'urn:' + currentUrn;
        window.Autodesk.Viewing.Initializer(options, function onInitialized() {
            startViewer();
            window.Autodesk.Viewing.Document.load(
                documentId,
                onDocumentLoadSuccess,
                onDocumentLoadError
            );
        });
    };

    const startViewer = () => {
        var viewerDiv = document.getElementById('MyViewerDiv');
        viewer = new window.Autodesk.Viewing.GuiViewer3D(viewerDiv);
        viewer.start();
    };

    const onDocumentLoadSuccess = async viewerDocument => {
        var defaultModel = viewerDocument.getRoot().getDefaultGeometry();
        viewer.loadDocumentNode(viewerDocument, defaultModel);

        // loading it dynamically
        const { MyExtension } = await import('../../Extensions/MyExtension');
        MyExtension.register();
        viewer.loadExtension('MyExtension');
    };

    const onDocumentLoadError = errorCode => {
        console.error('Failed fetching Forge manifest');
        console.log(errorCode);
    };

    return (
        <div className="w-full h-full">
            <div className="w-full h-full relative">
                <div className="Viewer" id="MyViewerDiv" />
            </div>
        </div>
    );
}

export default Viewer;
