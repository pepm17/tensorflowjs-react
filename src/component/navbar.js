import React, { useEffect } from 'react';
import {
    Navbar,
    Form,
    FormControl,
    Nav
} from 'react-bootstrap';


const NavbarComponent = () => {

    const inputRef = React.createRef();

    useEffect = () => ({
        focusInput()
    },[])

    const focusInput = () =>{
        inputRef.current.focus();
    }


    return (
        <Navbar variant="dark" className="navBar">
            <Nav className="mr-auto">
                <Navbar.Brand href="#home">Guiding Tech Dog</Navbar.Brand>
            </Nav>
            <Form inline>
                <FormControl type="text" placeholder="Buscar Objeto" className="mr-sm-2 right"
                onBlur={focusInput()} autoFocus="true" ref={inputRef} />
            </Form>
        </Navbar>  
    )

}

export default NavbarComponent;