import { Alignment, Button, Navbar } from '@blueprintjs/core';
import React from 'react';

interface IProps {
    toggleDrawer: () => void;
}
const Topbar: React.FC<IProps> = (props: IProps) => {
    return (
        <Navbar fixedToTop>
            <Navbar.Group align={Alignment.LEFT}>
                <Navbar.Heading>Amazing Places</Navbar.Heading>
            </Navbar.Group>
            <Navbar.Group>
                <Button icon="home" text="Home" />
                <Navbar.Divider />
                <Button icon="document" text="About" />
            </Navbar.Group>
            <Navbar.Group align={Alignment.RIGHT}>
                <Button
                    onClick={props.toggleDrawer}
                    icon="expand-all"
                    text="Expand Drawer (ALT+Z)"
                />
            </Navbar.Group>
        </Navbar>
    );
};

export default Topbar;
