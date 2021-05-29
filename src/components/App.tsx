import MapContainer from './MapContainer';
import React, { useState } from 'react';
// import MarkerInput from './MarkerInput';
import Topbar from './TopBar';
import '../App.css';
import AboutPage from './AboutPage';
import { Provider } from 'react-redux';
import { store } from '../state';
import { Tabs, Tab, TabId } from '@blueprintjs/core';

const App: React.FC = () => {
    const [showDrawer, setShowDrawer] = useState(false);
    const [tab, setTab] = useState<string | number>('map');

    const toggleDrawer = () => {
        setShowDrawer(!showDrawer);
    };

    const handleTabChange = (navbarTabId: TabId) => {
        setTab(navbarTabId);
    };

    return (
        <Provider store={store}>
            <div className="app">
                <Topbar
                    toggleDrawer={toggleDrawer}
                    handleTabChange={handleTabChange}
                />
                <Tabs onChange={handleTabChange} selectedTabId={tab}>
                    <Tab id="about" panel={<AboutPage />} />
                    <Tab
                        id="map"
                        panel={
                            <MapContainer
                                toggleDrawer={toggleDrawer}
                                showDrawer={showDrawer}
                            />
                        }
                    />
                </Tabs>
            </div>
        </Provider>
    );
};

export default App;
