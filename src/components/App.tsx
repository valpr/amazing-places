import MapContainer from './MapContainer';
import React, { useState } from 'react';
// import MarkerInput from './MarkerInput';
import Topbar from './TopBar';
import '../App.css';
import { Provider } from 'react-redux';
import { store } from '../state';
import SideMenu from './SideMenu';

const App: React.FC = () => {
    const [showDrawer, setShowDrawer] = useState(false);

    const toggleDrawer = () => {
        setShowDrawer(!showDrawer);
    };

    return (
        <Provider store={store}>
            <div className="app">
                <Topbar toggleDrawer={toggleDrawer} />
                {showDrawer ? <SideMenu show={showDrawer} /> : null}
                <MapContainer />
            </div>
        </Provider>
    );
};

export default App;
