import React, { Component } from 'react';
import styled from 'styled-components';
import { NavLink, withRouter } from 'react-router-dom';
import ScrollLock from 'react-scrolllock';
import { Hash, MapPin, Settings } from 'react-feather';
import { Keyframes, animated, config } from 'react-spring';


import Hamburger from './Hamburger';
import Logo from './Logo';


const StyledHeader = styled.header`
  width: 100%;
  height: 50px;
  padding: 0 20px;
  background: #d7c89433;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Wrapper = styled.div`
  position: relative;
`;

const MenuWrapper = styled(animated.ul)`
  position: absolute;
  top: 50px;
  left: 0;
  height: calc(100vh - 50px);
  width: 100%;
  background: rgba(0,0,0,0.08);
  overflow: hidden;
`;

const MenuItem = styled(animated.li)`
  width: 100%;
  padding: 30px 20px;
  border-bottom: 1px solid #EEE;
  background: #FFF;
  overflow: hidden;
`;

const StyledNavLink = styled(NavLink)`
  font-size: 3.6rem;
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

const routes = [
  {
    path: '/platser',
    label: 'Platser',
    Icon: MapPin,
  },
  {
    path: '/besök',
    label: 'Besök',
    Icon: Hash,
  },
  {
    path: '/inställningar',
    label: 'Inställningar',
    Icon: Settings,
  },
]

const MenuBackground = Keyframes.Spring({
  open: { to: { height: (window.innerHeight - 50) } },
  close: { delay: 100, to: { height: 0 } }
})

const MenuContent = Keyframes.Trail({
  open: { delay: 200, to: { opacity: 1, height: 'auto', padding: 30 }, config: config.stiff },
  close: { to: { opacity: 1, height: 0, padding: 0 }, config: config.stiff }
})

class Menu extends Component {
  state = { isOpen: true }

  componentDidUpdate(prevProps) {
    const { location: { pathname } } = this.props;
    const { location: { pathname: oldPathname } } = prevProps;

    if ((pathname !== oldPathname) && this.state.isOpen) {
      this.toggleOpen();
    }
  }

  toggleOpen = () => this.setState(prevState => ({ isOpen: !prevState.isOpen }));

  render() {

    const state = this.state.isOpen ? 'open' : 'close';

    return (
      <Wrapper>
        <StyledHeader>
          <Logo />
          <Hamburger onClick={this.toggleOpen} isOpen={this.state.isOpen} />
        </StyledHeader>
        <MenuBackground native state={state}>
          {({ height }) => (
            <MenuWrapper style={{ height }}>
              <MenuContent keys={routes.map((_, i) => i)} native state={state}>
                {routes.map(route => styles => (
                  <MenuItem style={{ ...styles, padding: styles.padding.interpolate(p => `${p}px 20px`) }}>
                    <StyledNavLink to={route.path}>
                      <route.Icon color="#222" style={{ marginRight: '20px' }} />
                      {route.label}
                    </StyledNavLink>
                  </MenuItem>
                ))}
              </MenuContent>
            </MenuWrapper>
          )}
        </MenuBackground>
        <ScrollLock />
      </Wrapper>
    )
  }
}

export default withRouter(Menu);