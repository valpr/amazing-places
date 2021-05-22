import { Drawer } from '@blueprintjs/core';
import { SMALL } from '@blueprintjs/core/lib/esm/common/classes';
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
            size={SMALL}
            isOpen={show}>
            <MarkerInput />
        </Drawer>
    );
};

export default SideMenu;
