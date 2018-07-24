import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

import { NavButton } from '../components/Button';
import { NavLink } from 'react-router-dom';

import { findDOMNode } from 'react-dom';

import { Transition, Keyframes, animated, config } from 'react-spring'

const Start = styled(animated.div)`
  background-color: ${p => p.theme.main};
  transform-origin: 0 0;
  padding: 0 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-image: url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236c3ead' fill-opacity='0.05'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  background-size: 25%;
  height: 100vh;
`;

const Title = styled(animated.h1)`
  font-family: ${p => p.theme.fonts.display};
  color: #FFF;
  font-size: 4.8rem;
  margin-bottom: 20px;
`;

const Description = styled(animated.p)`
  color: #FFF;
  font-size: 2rem;
  line-height: 1.2;
  margin-bottom: 40px;
`;

const NotLoggedIn = Keyframes.Spring({
  default: { to: { height: window.innerHeight } },
  login: { delay: 500, to: { height: 10 }, config: config.gentle }
})

const NotLoggedInContent = Keyframes.Trail({
  default: { delay: 100, from: { opacity: 0 }, to: { opacity: 1 } },
  login: { to: { opacity: 0 } }
})


const NotLoggedInContentItems = [
  ({ style }) => <Title style={style}>Restaurate</Title>,
  ({ style }) => <Description style={style}>Betygsätt dina restaurang- och cafébesök</Description>,
  ({ style }) => <animated.div style={style}><NavButton to="/logga-in">Börja betygsätt</NavButton></animated.div>
]

const LoginPage = styled(animated.div)`
  padding: 40px;
  display: flex;
  flex-direction: column;
  background: ${p => p.theme.background};
  justify-content: center;
  min-height: calc(100vh - 10px);
`;

const LoginTitle = styled(animated.h1)`
  font-size: 3.6rem;
  color: #222;
  margin-bottom: 10px;
  font-weight: 500;
`;

const LoginDescription = styled(animated.p)`
  color: #666;
  line-height: 1.2;
  font-size: 1.6rem;
  margin-bottom: 60px;
`;

const LogIn = Keyframes.Spring({
  login: { delay: 500, from: { y: 100, opacity: 0 }, to: { y: 0, opacity: 1 } },
  default: { delay: 0, to: { y: 100 } }
})

const LoginContent = Keyframes.Trail({
  default: { delay: 200, to: { opacity: 0 } },
  login: { delay: 750, from: { opacity: 0 }, to: { opacity: 1 } }
})


const LoginContentItems = [
  ({ style }) => <LoginTitle style={style}>Logga in</LoginTitle>,
  ({ style }) => <LoginDescription style={style}>Vi kommer aldrig att publicera något eller utföra annan aktivitet med ditt konto</LoginDescription>,
  ({ style }) => <animated.div style={style}><NavButton to="/nytt">Logga in</NavButton></animated.div>
]


const HomeInfoPage = styled(animated.div)`
  display: flex;
  flex-direction: column;
  padding: 80px 40px;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 0;
    transform: translate(-50%, -100%);
  }
`;

const SubTitle = styled.h2`
  font-size: 2.4rem;
  color: #222;
  text-transform: uppercase;
  margin-bottom: 20px;
  font-weight: 600;
`;

const Text = styled.p`
  line-height: 1.5;
  font-size: 1.6rem;
  margin-bottom: 40px;
`;

const LoginText = styled.button`
  color: ${p => p.theme.action};
  font-size: 1.8rem;
  text-decoration: underline;
`;

const Login = ({ style }) => (
  <LoginPage style={style}>
    <LoginTitle >Logga in</LoginTitle>,
        <LoginDescription >Vi kommer aldrig att publicera något eller utföra annan aktivitet med ditt konto</LoginDescription>,
        <NavButton to="/nytt">Logga in</NavButton>
  </LoginPage>
)

const HomeInfo = ({ style }) => (
  <HomeInfoPage style={style}>
    <SubTitle>Varför</SubTitle>
    <Text>"Vad hette den restaurangen jag var på förra veckan med så god tapas?" är en mening du aldrig kommer att  säga efter att du börjat använda Restaurate. Den hjälper dig att hålla koll på vart du varit, vart du kan tänka dig gå tillbaka, och vart du verkligen inte går tillbaka!</Text>
    <SubTitle>Hur</SubTitle>
    <Text>
      Efter du har besökt en restaurang eller café kan du enkelt recensera den för framtida referenser.
        <br />
      <br />
      Fyll i så mycket du vill. Allt från vilken prisklass till smak, du bestämmer! För att börja behöver du bara logga in med ditt Google-konto
      </Text>
  </HomeInfoPage>
)

class Home extends Component {

  state = { height: undefined }

  container = React.createRef();

  componentDidMount() {
    window.addEventListener('resize', this.updateHeight);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateHeight);
  }


  updateHeight = () => {
    this.setState({ height: window.innerHeight });
  }

  render() {
    const login = this.props.location.pathname === '/logga-in';
    const state = login ? 'login' : 'default';

    return (
      <Fragment>
        <NotLoggedIn native state={state}>
          {style => (
            <Start style={style} >
              <NotLoggedInContent native keys={NotLoggedInContentItems.map((_, i) => i)} state={state}>
                {
                  NotLoggedInContentItems.map(Item => styles => <Item style={styles} />)
                }
              </NotLoggedInContent>
            </Start>
          )}
        </NotLoggedIn>
        <Transition
          native
          from={{ opacity: 0 }}
          enter={{ opacity: 1 }}
          leave={{ opacity: 0 }}
          config={config.slow}
        >
          {
            login
              ? style => <Login style={style} />
              : style => <HomeInfo style={style} />
          }
        </Transition>
        {
          /* login
            ? (
              <LogIn native state={state}>
                {({ y }) => (
                  <LoginPage style={{ transform: y.interpolate(y => `translateY(${y}%)`) }}>
                    <LoginContent native keys={LoginContentItems.map((_, i) => i)} state={state}>
                      {
                        LoginContentItems.map((Item, i) => (style) => (
                          <Item style={style} />
                        ))
                      }
                    </LoginContent>
                  </LoginPage>
                )}
              </LogIn>
            )
            : style => <animated.div style={{ background: 'red', height: '200vh', ...style }}><h1 style={{ padding: '100px', color: 'black', fontSize: 40 }}>Varför restauraag</h1></animated.div> */
        }
      </Fragment >

    )
  }
}

export default Home;