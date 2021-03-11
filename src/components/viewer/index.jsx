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
                3120,
                fragId => {
                    let fragProxy = viewer.impl.getFragmentProxy(model, fragId);
                    fragProxy.getAnimTransform();
                    console.log(fragProxy);
                    fragProxy.scale = new THREE.Vector3(currentWidth, currentHeight, currentDeep);
                    let matrix = new THREE.Matrix4();
                    fragProxy.getWorldMatrix(matrix);
                    console.log(matrix);
                    var position = matrix.getPosition();
                    console.log(position);
                    console.log(currentWidth);
                    fragProxy.position.x = 0;
                    fragProxy.position.y = 0;
                    fragProxy.position.z = 0;
                    fragProxy.updateAnimTransform();
                },
                false
            );
            viewer.impl.invalidate(true);
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
    const addGeometry = () => {
        var geom = new THREE.SphereGeometry(10, 8, 8);
        var material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        var sphereMesh = new THREE.Mesh(geom, material);
        sphereMesh.position.set(1, 2, 3);
        if (!viewer.overlays.hasScene('custom-scene')) {
            viewer.overlays.addScene('custom-scene');
        }
        viewer.overlays.addMesh(sphereMesh, 'custom-scene');
    };
    const createMaterial = (color = '#73CEFF') => {
        const material = new THREE.MeshPhongMaterial({
            side: THREE.DoubleSide,
            reflectivity: 0.0,
            flatShading: true,
            transparent: true,
            opacity: 0.5,
            color,
        });
        const materials = viewer.impl.matman();
        const materialName = 'MyCustomMaterial' + color.toString();
        materials.addMaterial(materialName, material, true);
        return material;
    };
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
