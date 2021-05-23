import { Drawer, DrawerSize } from '@blueprintjs/core';
import { GoogleAPI } from 'google-maps-react';
import React from 'react';
import CurrentRoute from './CurrentRoute';
import MarkerInput from './MarkerInput';

interface IProps {
    show: boolean;
    toggleDrawer: () => void;
    google: GoogleAPI;
}

const SideMenu: React.FC<IProps> = ({ show, toggleDrawer }: IProps) => {
    return (
        <Drawer
            canOutsideClickClose={false}
            hasBackdrop={false}
            size={DrawerSize.SMALL}
            isOpen={show}
            onClose={toggleDrawer}
            isCloseButtonShown
            title="Find your place"
            enforceFocus={false}>
            <MarkerInput google={google} />{' '}
            {/* make collapsible in the future */}
            <CurrentRoute />
        </Drawer>
    );
};

export default SideMenu;
