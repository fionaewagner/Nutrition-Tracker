import './Header.css'
import { useState } from 'react';
import {
    Navbar,
    NavbarBrand,
    Collapse,
    NavbarToggler,
    Nav,
    NavItem,
    Button,
} from 'reactstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  
    faUser,
    faChartSimple,
    faDoorOpen
    
  } from "@fortawesome/free-solid-svg-icons";
  

const Header=()=>{
    const[menuOpen, setMenuOpen]=useState(true);
    const navigate = useNavigate();

    

    return(
        <Navbar light className='navbar' sticky="top" expand="md">
            <NavbarBrand href="/home" className='mr-5 ml-2 nav-brand'>
            <h1 className='mt-1 add-txt-outline'>Vita Tracker</h1>
            </NavbarBrand>
          <NavbarToggler onClick={()=> setMenuOpen(!menuOpen)}/>
          <Collapse isOpen={menuOpen} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink className='nav-link ' to='/trends'>
                <FontAwesomeIcon icon={faChartSimple}/>
                    {"   "}Trends
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink className='nav-link' to='/profile'>
                  <FontAwesomeIcon icon={faUser}/>
                    {"   "}Profile
                </NavLink>
              </NavItem>
              <NavItem>
                <Button className='sign-out-btn nav-link' onClick={()=>{
                  sessionStorage.clear();
                  navigate("../", { replace: true })
                  
                }}>
                  <FontAwesomeIcon icon={faDoorOpen}/>
                    {"   "}Sign Out
                </Button>
              </NavItem>

            </Nav>
          </Collapse>
      </Navbar>
    )
  

}

export default Header