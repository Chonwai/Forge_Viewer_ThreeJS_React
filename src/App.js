import './App.css';
import Viewer from './components/viewer';
import Panel from './components/panel';
import React, { useEffect } from 'react';
import AuthAPI from './apis/auth';

function App() {
    const [currentUrn, setCurrentUrn] = React.useState(process.env.REACT_APP_URN);
    useEffect(() => {
        // Update the document title using the browser API
        console.log('Create the App!');
        AuthAPI.getAccessToken();
    });
    return (
        <div className="App">
            <div className="flex flex-row justify-center items-start p-2">
                <div className="panel p-2 w-1/4">
                    <p className="break-words">Current URN: {currentUrn}</p>
                    <Panel setCurrentUrn={setCurrentUrn} />
                </div>
                <div className="p-2 w-3/4 h-90vh">
                    <Viewer currentUrn={currentUrn} />
                </div>
            </div>
        </div>
    );
}

export default App;
