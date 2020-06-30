import React from 'react';
import {
    Navbar,
    Form,
    FormControl,
    Nav
} from 'react-bootstrap'

const NavbarHeader = () => {
    return(
        <Navbar variant="dark" className="navBar">
            <Nav className="mr-auto">
                <Navbar.Brand href="#home">Guiding Tech Dog</Navbar.Brand>
            </Nav>
            <Form inline>
                <FormControl type="text" placeholder="Buscar Objeto" className="mr-sm-2 right" />
            </Form>
        </Navbar>
    )
}

export default NavbarHeader;