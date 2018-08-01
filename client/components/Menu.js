import React, { Component } from 'react';
import styled from 'styled-components';
import { NavLink, withRouter } from 'react-router-dom';
import ScrollLock from 'react-scrolllock';
import { Hash, MapPin, Settings } from 'react-feather';
import { Transition, Keyframes, animated, config } from 'react-spring';

import Hamburger from './Hamburger';
import Logo from './Logo';

const HEADER_HEIGHT = 50;

const StyledHeader = styled.header`
  width: 100%;
  height: ${HEADER_HEIGHT}px;
  padding: 0 20px;
  background: #ffe59a;
  background: linear-gradient(to right, #ffe59a, #ffda6f);
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

const Wrapper = styled.div`
  position: relative;
`;

const MenuWrapper = styled(animated.ul)`
  position: absolute;
  top: ${HEADER_HEIGHT}px;
  left: 0;
  width: 100%;
  overflow: hidden;
  z-index: 10;
`;

const MenuItem = styled(animated.li)`
  width: 100%;
  padding: 30px 20px;
  background: #fff;
  overflow: hidden;
  transition: ${p => p.theme.transition} border;
  border-bottom-color: #eee;

  &:not(:last-child) {
    border-bottom: ${p => (p.open ? '1px solid #EEE' : 'none')};
  }

  &:last-child {
    border-radius: 0 0 5px 5px;
  }
`;

const StyledNavLink = styled(NavLink)`
  font-size: 2.4rem;
  font-weight: 500;
  color: #444;
  text-decoration: none;
  padding: 0;
  margin: 0;
  display: inline-block;
  padding: 10px 10px;
  transition: ${p => p.theme.transition};
  display: flex;
  align-items: center;

  &.active {
    color: ${p => p.theme.action};
    svg {
      stroke: ${p => p.theme.action};
      transition: ${p => p.theme.transition};
    }
  }
`;

const MenuBackground = styled(animated.div)`
  background: rgba(0, 0, 0, 0.08);
  position: absolute;
  top: ${HEADER_HEIGHT}px;
  left: 0;
  z-index: -1;
  height: calc(100vh - ${HEADER_HEIGHT}px);
  width: 100%;
`;

const routes = [
  {
    path: '/platser',
    label: 'Platser',
    Icon: MapPin
  },
  {
    path: '/besök',
    label: 'Besök',
    Icon: Hash
  },
  {
    path: '/inställningar',
    label: 'Inställningar',
    Icon: Settings
  }
];

const MenuContent = Keyframes.Trail({
  open: {
    delay: 200,
    to: { opacity: 1, height: 'auto', padding: 30 },
    config: config.stiff
  },
  close: { to: { opacity: 1, height: 0, padding: 0 }, config: config.stiff }
});

class Menu extends Component {
  state = { isOpen: false };

  componentDidUpdate(prevProps) {
    const {
      location: { pathname }
    } = this.props;
    const {
      location: { pathname: oldPathname }
    } = prevProps;

    if (pathname !== oldPathname && this.state.isOpen) {
      this.toggleOpen();
    }
  }

  toggleOpen = () =>
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));

  render() {
    const { isOpen } = this.state;
    const state = isOpen ? 'open' : 'close';

    return (
      <Wrapper>
        {isOpen && <ScrollLock />}
        <StyledHeader>
          <NavLink to="/">
            <Logo />
          </NavLink>
          <Hamburger onClick={this.toggleOpen} isOpen={isOpen} />
        </StyledHeader>
        <MenuWrapper>
          <MenuContent keys={routes.map((_, i) => _.path)} native state={state}>
            {routes.map(route => styles => (
              <MenuItem
                open={isOpen}
                style={{
                  ...styles,
                  padding: styles.padding.interpolate(p => `${p}px 20px`)
                }}
              >
                <StyledNavLink to={route.path}>
                  <route.Icon color="#222" style={{ marginRight: '20px' }} />
                  {route.label}
                </StyledNavLink>
              </MenuItem>
            ))}
          </MenuContent>
        </MenuWrapper>
        <Transition
          native
          from={{ opacity: 0 }}
          enter={{ opacity: 1 }}
          leave={{ opacity: 0 }}
        >
          {isOpen && (style => <MenuBackground style={style} />)}
        </Transition>
      </Wrapper>
    );
  }
}

export default withRouter(Menu);
