import { Drawer, DrawerSize } from '@blueprintjs/core';
import React from 'react';
import CurrentRoute from './CurrentRoute';
import MarkerInput from './MarkerInput';

interface IProps {
    show: boolean;
    toggleDrawer: () => void;
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
            title="Side Menu"
            enforceFocus={false}>
            <MarkerInput />
            <CurrentRoute />
        </Drawer>
    );
};

export default SideMenu;
