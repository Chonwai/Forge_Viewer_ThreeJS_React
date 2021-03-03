import React, { useEffect, useState } from 'react';
import './index.css';
import ForgeViewer from 'react-forge-viewer';
import LocalStroage from '../../utils/localstorage';
import * as THREE from 'three';

function Viewer({ currentUrn, currentWidth, currentHeight, currentDeep }) {
    const [view, setView] = useState(null);
    const [model, setModel] = useState(null);
    const [viewer, setViewer] = useState(null);
    useEffect(() => {
        if (model != null) {
            const modelData = model.getData();
            modelData.instanceTree.enumNodeFragments(
                2,
                fragId => {
                    let fragProxy = viewer.impl.getFragmentProxy(model, fragId);
                    fragProxy.scale = new THREE.Vector3(currentWidth, currentHeight, currentDeep);
                    fragProxy.updateAnimTransform();
                },
                false
            );
            modelData.instanceTree.enumNodeFragments(
                3,
                fragId => {
                    let fragProxy = viewer.impl.getFragmentProxy(model, fragId);
                    fragProxy.scale = new THREE.Vector3(currentWidth, currentHeight, currentDeep);
                    fragProxy.updateAnimTransform();
                },
                false
            );
            modelData.instanceTree.enumNodeFragments(
                4,
                fragId => {
                    let fragProxy = viewer.impl.getFragmentProxy(model, fragId);
                    fragProxy.scale = new THREE.Vector3(currentWidth, currentHeight, currentDeep);
                    fragProxy.updateAnimTransform();
                },
                false
            );
            viewer.impl.invalidate(true);
            viewer.impl.sceneUpdated(true);
        }
    }, [currentWidth, currentHeight, currentDeep]);
    const getForgeToken = () => {
        return {
            access_token: LocalStroage.get('access_token'),
            token_type: 'Bearer',
            expires_in: 3599,
        };
    };
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
            console.log('Loaded Document:', viewables);
            setView(viewables[0]);
        }
    };
    const handleModelLoaded = async (viewer, model) => {
        console.log('Loaded model:', model);
        setViewer(viewer);
        setModel(model);
    };
    // const addModel = () => {
    //     let color = 0xfff000;
    //     let geometry = new THREE.BoxGeometry(100, 200, 300);
    //     const material = new THREE.MeshPhongMaterial({
    //         specular: new THREE.Color(color),
    //         side: THREE.DoubleSide,
    //         color,
    //         transparent: true,
    //         opacity: 0.5,
    //     });
    //     let someMesh = new THREE.Mesh(geometry, material);
    //     someMesh.position.set(1, 2, 3);
    //     const materials = viewer.impl.getMaterials();
    //     materials.addMaterial(color.toString(16), material, true);
    //     viewer.impl.scene.add(someMesh);
    // };
    // const updateModel = () => {
    //     console.log(viewer);
    //     console.log(model);
    //     const modelData = model.getData();
    //     modelData.instanceTree.enumNodeFragments(3, fragId => {
    //         const fragProxy = viewer.impl.getFragmentProxy(model, fragId);
    //         fragProxy.scale = new THREE.Vector3(2, 2, 1);
    //         fragProxy.updateAnimTransform();
    //     });
    //     viewer.impl.invalidate(true);
    // };
    return (
        <div className="w-full h-full">
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
