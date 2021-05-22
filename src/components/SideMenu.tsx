import { Drawer, DrawerSize } from '@blueprintjs/core';
import React from 'react';
import MarkerInput from './MarkerInput';

interface IProps {
    show: boolean;
}

const SideMenu: React.FC<IProps> = ({ show }: IProps) => {
    return (
        <Drawer
            canOutsideClickClose={false}
            hasBackdrop={false}
            size={DrawerSize.SMALL}
            isOpen={show}
            enforceFocus={false}>
            <MarkerInput />
        </Drawer>
    );
};

export default SideMenu;
