
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import './Header.scss';

Header.propTypes = {};
const info = JSON.parse(localStorage.getItem('firebaseui::rememberedAccounts')) || '';
console.log('info',info.map(x=> x.displayName));
function Header() {
  return (
    <header className="header">
      <Container>
        <Row className="justify-content-between">
          <Col xs="auto">
            <NavLink
              
              to="/photos"
              className="header__link header__title"
            >
              Photo App
            </NavLink>
          </Col>

          <Col xs="auto">
            <NavLink
              exact
              className="header__link"
              to="/sign-in"
              activeClassName="header__link--active"
            >
              {info.map(x=> x.displayName) ?? 'Sign In'}
            </NavLink>
          </Col>
        </Row>
      </Container>
    </header>
  );
}

export default Header;