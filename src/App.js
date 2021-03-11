import './App.css';
import Viewer from './components/viewer';
import NewViewer from './components/viewer/index_new';
import Panel from './components/panel';
import React, { useEffect } from 'react';
import AuthAPI from './apis/auth';

function App() {
    const [currentUrn, setCurrentUrn] = React.useState(process.env.REACT_APP_URN);
    const [currentWidth, setCurrentWidth] = React.useState(1);
    const [currentHeight, setCurrentHeight] = React.useState(1);
    const [currentDeep, setCurrentDeep] = React.useState(1);
    useEffect(() => {
        console.log('Create the App!');
        AuthAPI.getAccessToken();
    }, []);
    const updateSize = (width, height, deep) => {
        setCurrentWidth(width);
        setCurrentHeight(height);
        setCurrentDeep(deep);
    };
    return (
        <div className="App">
            <div className="flex flex-row justify-start items-start p-2">
                <div className="panel p-2 w-1/4">
                    <p className="break-words text-left">
                        <b>Current URN:</b> {currentUrn}
                    </p>
                    <br></br>
                    <p className="text-left">
                        <b>Current Size:</b>
                    </p>
                    <p className="text-left">
                        <b>Width:</b> {800 * currentWidth} mm
                    </p>
                    <p className="text-left">
                        <b>Height:</b> {2100 * currentHeight} mm
                    </p>
                    <p className="text-left">
                        <b>Deep:</b> {584 * currentDeep} mm
                    </p>
                    <Panel setSize={updateSize} />
                </div>
                <div className="p-2 w-3/4 h-90vh">
                    {/* <Viewer
                        currentUrn={currentUrn}
                        currentWidth={currentWidth}
                        currentHeight={currentHeight}
                        currentDeep={currentDeep}
                    /> */}
                    <NewViewer currentUrn={currentUrn} />
                </div>
            </div>
        </div>
    );
}

export default App;
