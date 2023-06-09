import React, { useState,useEffect } from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  Button,
  UncontrolledDropdown,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {

  const [isOpen, setIsOpen] = useState(false);
  const {
    user,
    isAuthenticated,
    getAccessTokenSilently,
    loginWithRedirect,
    logout,
  } = useAuth0();
  const toggle = () => setIsOpen(!isOpen);
  const [userInfo, setUserInfo] = useState(null);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };


  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        // Get accessToken
        const accessToken = await getAccessTokenSilently({
          audience: `https://fct-netex.eu.auth0.com/api/v2/`,
        });
        // Get user info
        const userResponse = await fetch(`https://fct-netex.eu.auth0.com/api/v2/users/${user.sub}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const userInfo = await userResponse.json();
        setUserInfo(userInfo);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };
    fetchUserInfo();
  }, [getAccessTokenSilently]);



  const logoutWithRedirect = () =>
    logout({
        logoutParams: {
          returnTo: window.location.origin,
        }
    });

    return (
      <div className="nav-container">
        <Navbar color="light" light expand="md" className="fixed-top">
          <Container>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="mr-auto" navbar>
                <NavItem>
                  <NavLink
                    tag={RouterNavLink}
                    to="/"
                    
                  >
                    Home
                  </NavLink>
                </NavItem>
                {isAuthenticated && (
                  <>
                  <NavItem>
                    <NavLink
                      tag={RouterNavLink}
                      to="/activities"

                      
                    >
                      Activities
                    </NavLink>
                  </NavItem>
                  <Dropdown nav isOpen={dropdownOpen} toggle={toggleDropdown}>
                    <DropdownToggle nav caret>
                      New
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem tag={RouterNavLink} to="/course/create/0" >
                        Course
                      </DropdownItem>
                      <DropdownItem tag={RouterNavLink} to="/activities/create" >
                        Activity
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                  </>
                )}
              </Nav>
      
              <Nav className="d-none d-md-block" navbar>
                {!isAuthenticated && (
                  <NavItem>
                    <Button
                      id="qsLoginBtn"
                      color="primary"
                      className="btn-margin"
                      onClick={() => loginWithRedirect()}
                    >
                      Log in
                    </Button>
                  </NavItem>
                )}
                {isAuthenticated && userInfo && (
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret id="profileDropDown">
                      <img
                        src={userInfo.picture}
                        alt="Profile"
                        className="nav-user-profile rounded-circle"
                        width="50"
                      />
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem header>{userInfo.nickname}</DropdownItem>
                      <DropdownItem
                        tag={RouterNavLink}
                        to="/profile"
                        className="dropdown-profile"
                        
                      >
                        <FontAwesomeIcon icon="user" className="mr-3" /> Profile
                      </DropdownItem>
                      <DropdownItem
                        id="qsLogoutBtn"
                        onClick={() => logoutWithRedirect()}
                      >
                        <FontAwesomeIcon icon="power-off" className="mr-3" /> Log
                        out
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                )}
              </Nav>
              {!isAuthenticated && (
                <Nav className="d-md-none" navbar>
                  <NavItem>
                    <Button
                      id="qsLoginBtn"
                      color="primary"
                      block
                      onClick={() => loginWithRedirect({})}
                    >
                      Log in
                    </Button>
                  </NavItem>
                </Nav>
              )}
              {isAuthenticated && userInfo && (
                <Nav
                  className="d-md-none justify-content-between"
                  navbar
                  style={{ minHeight: 170 }}
                >
                  <NavItem>
                    <span className="user-info">
                      <img
                        src={userInfo.picture}
                        alt="Profile"
                        className="nav-user-profile d-inline-block rounded-circle mr-3"
                        width="50"
                      />
                      <h6 className="d-inline-block">{userInfo.nickname}</h6>
                    </span>
                  </NavItem>
                  <NavItem>
                    <FontAwesomeIcon icon="user" className="mr-3" />
                    <RouterNavLink
                      to="/profile"
                      
                    >
                      Profile
                    </RouterNavLink>
                  </NavItem>
                  <NavItem>
                    <FontAwesomeIcon icon="power-off" className="mr-3" />
                    <RouterNavLink
                      to="#"
                      id="qsLogoutBtn"
                      onClick={() => logoutWithRedirect()}
                    >
                      Log out
                    </RouterNavLink>
                  </NavItem>
                </Nav>
              )}
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
    
};

export default Header;
