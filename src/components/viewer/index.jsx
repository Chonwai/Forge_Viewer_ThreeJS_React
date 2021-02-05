import React, { useEffect, useState } from 'react';
import './index.css';
import ForgeViewer from 'react-forge-viewer';
import LocalStroage from '../../utils/localstorage';
import { Button } from '@material-ui/core';
import PublishIcon from '@material-ui/icons/Publish';
import * as THREE from 'three';

function Viewer({ currentUrn }) {
    const [view, setView] = useState(null);
    const [model, setModel] = useState(null);
    const [viewer, setViewer] = useState(null);
    const getForgeToken = () => {
        return {
            access_token: LocalStroage.get('access_token'),
            token_type: 'Bearer',
            expires_in: 3599,
        };
    };
    // useEffect(() => {
    //     // Update the document title using the browser API
    //     if (view != null) {
    //         console.log("Window Viewing:");
    //         console.log(view);
    //         const ViewerExtension = require('../../utils/viewer-extension');
    //         window.Autodesk.Viewing.theExtensionManager.registerExtension('ViewerExtension', ViewerExtension);
    //     }
    //   }, [view]);
    // useEffect(() => {
    //     // Update the document title using the browser API
    //     console.log(model);
    //     if (model != null) {
    //         const modelData = model.getData();
    //         console.log("Model Data:")
    //         console.log(view);
    //         modelData.instanceTree.enumNodeFragments(1, fragId => {
    //             console.log(fragId);
    //             const fragProxy = viewer.impl.getFragmentProxy(model, fragId);
    //             fragProxy.scale = new THREE.Vector3(2,2,2);
    //             fragProxy.updateAnimTransform()
    //         });
    //     }
    // }, [model]);
    const handleTokenRequested = onAccessToken => {
        if (onAccessToken) {
            let token = getForgeToken();
            if (token) onAccessToken(token.access_token, token.expires_in);
        }
    };
    const handleDocumentLoaded = (doc, viewables) => {
        if (viewables.length === 0) {
            console.error('Document contains no viewables.');
        } else {
            //Select the first viewable in the list to use in our viewer component
            setView(viewables[0]);
        }
    };
    const handleModelLoaded = (viewer, model) => {
        console.log('Loaded model:', model);
        setViewer(viewer);
        setModel(model);
    };
    const updateModel = () => {
        console.log(viewer);
        console.log(model);
        const modelData = model.getData();
        modelData.instanceTree.enumNodeFragments(3, fragId => {
            console.log(fragId);
            const fragProxy = viewer.impl.getFragmentProxy(model, fragId);
            fragProxy.scale = new THREE.Vector3(1, 1, 1);
            fragProxy.updateAnimTransform();
        });
    };
    return (
        <div className="w-full h-full">
            <Button
                variant="contained"
                color="primary"
                endIcon={<PublishIcon />}
                onClick={updateModel}
            >
                Send
            </Button>
            <div className="w-full h-full relative">
                <ForgeViewer
                    version="7.0"
                    urn={currentUrn}
                    view={view}
                    headless={false}
                    // onViewerError={this.handleViewerError.bind(this)}
                    onTokenRequest={handleTokenRequested}
                    onDocumentLoad={handleDocumentLoaded}
                    // onDocumentError={this.handleDocumentError.bind(this)}
                    onModelLoad={handleModelLoaded}
                    // onModelError={this.handleModelError.bind(this)}
                ></ForgeViewer>
            </div>
        </div>
    );
}

export default Viewer;
