import MapContainer from './MapContainer';
import React, { useState } from 'react';
// import MarkerInput from './MarkerInput';
import Topbar from './TopBar';
import '../App.css';
import { Provider } from 'react-redux';
import { store } from '../state';

const App: React.FC = () => {
    const [showDrawer, setShowDrawer] = useState(false);

    const toggleDrawer = () => {
        setShowDrawer(!showDrawer);
    };

    return (
        <Provider store={store}>
            <div className="app">
                <Topbar toggleDrawer={toggleDrawer} />

                <MapContainer
                    toggleDrawer={toggleDrawer}
                    showDrawer={showDrawer}
                />
            </div>
        </Provider>
    );
};

export default App;
