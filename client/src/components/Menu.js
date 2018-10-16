import React, { Component } from 'react';
import styled from 'styled-components';
import { NavLink, withRouter } from 'react-router-dom';
import { Transition, Trail, animated, config } from 'react-spring';

import withSession from './withSession';

import Hamburger from './Hamburger';
import Logo from './Logo';

import { routes } from '../constants';

const HEADER_HEIGHT = 45;


const Wrapper = styled.div`
  position: relative;
`;

const Header = styled.header`
  height: ${HEADER_HEIGHT}px;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #FFF;
`;

const Title = styled.span`
  font-family: ${p => p.theme.font.serif};
  font-weight: 700;
  text-transform: uppercase;
  font-size: 1.4rem;
  color: #000;
  opacity: 0.8;
  letter-spacing: 0.1em;
`;

const MenuWrapper = styled(animated.div)`
  position: absolute;
  top: ${HEADER_HEIGHT}px;
  left: 0;
  overflow: hidden;
  width: 100%;
  height: calc(100vh - ${HEADER_HEIGHT}px);
`;

const MenuList = styled.ul`
  height: 100%;
  width: 100%;
  background: #FFF;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 60px 10px;
`;

const MenuItem = styled(NavLink)`
  font-size: 3.6rem;
  font-family: ${p => p.theme.font.serif};
  color: #222;
  text-decoration: none;
  font-weight: 500;
  padding: 10px;

  &:not(:last-of-type) {
    margin-bottom: 20px;
  }

  &.active {
    color: #FFF;
    background: #222;
  }
`;

class Menu extends Component {
  state = { isOpen: false };

  componentDidUpdate(prevProps) {
    /* const { location: { pathname } } = this.props;
    const { location: { pathname: oldPathname } } = prevProps;

    if (pathname !== oldPathname && this.state.isOpen) {
      this.toggleOpen();
    } */
  }

  toggleOpen = () => this.setState(prevState => ({ isOpen: !prevState.isOpen }));

  render() {

    const { session } = this.props;

    if (!session && !session.viewer) {
      return null;
    }

    const menuHeight = window.innerHeight - HEADER_HEIGHT;

    const { isOpen } = this.state;
    const state = isOpen ? 'open' : 'close';

    return (
      <Wrapper>
        <Header>
          <Title>Restaurate</Title>
          <Hamburger isOpen={isOpen} onClick={this.toggleOpen} />
        </Header>
        <Transition
          native
          from={{ height: 0 }}
          enter={{ height: menuHeight }}
          leave={{ height: 0 }}
        >
          {
            isOpen && (style => (
              <MenuWrapper style={style}>
                <MenuList>
                  <Trail
                    keys={Object.keys(routes)}
                    from={{ opacity: 0, transform: `translateX(-20px)` }}
                    to={{ opacity: 1, transform: `translateX(0)` }}
                  >
                    {
                      Object.keys(routes).map(key => props => {
                        const route = routes[key];

                        return (
                          <MenuItem
                            key={route.label}
                            style={props}
                            exact={route.exact}
                            to={route.path} >
                            {route.label}
                          </MenuItem>
                        )
                      })
                    }
                  </Trail>
                </MenuList>
              </MenuWrapper>
            ))
          }
        </Transition>
      </Wrapper>
    );
  }
}

export default withSession(Menu);
