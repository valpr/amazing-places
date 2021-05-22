import { Drawer, DrawerSize } from '@blueprintjs/core';
import React from 'react';
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
            enforceFocus={false}
            onClose={toggleDrawer}
            shouldReturnFocusOnClose
            isCloseButtonShown
            title="Side Menu">
            <MarkerInput />
        </Drawer>
    );
};

export default SideMenu;
