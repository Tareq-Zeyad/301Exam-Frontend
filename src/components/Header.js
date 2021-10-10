import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import { withAuth0 } from '@auth0/auth0-react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import './Header.css';


class Header extends React.Component {
  render() {
    const { isAuthenticated } = this.props.auth0;

    return(
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>My Favorite Fruits</Navbar.Brand>
        <Link className="Navbar" to="/">Home </Link>
        <Link className="Navbar" to="/favFruit"> Fav-Fruits</Link>
        {isAuthenticated && <Link className="Navbar" to="/Profile"> Profile </Link>}
        {isAuthenticated ? <LogoutButton/> : <LoginButton />}
      </Navbar>
    );
  }
}

export default withAuth0(Header);
