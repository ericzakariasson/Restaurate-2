import React, { Component } from 'react';

import { TOKEN_ID } from '../../constants';

import Dashboard from '../Dashboard';
import NotAuthenticated from './NotAuthenticated';

import { Transition } from 'react-spring';

const Home = () => {

    const isAuthenticated = localStorage.getItem(TOKEN_ID);

    return (
        <Transition
            native
            from={{ opacity: 0, height: 0, /* transform: 'scale(1,0)' */ }}
            enter={{ opacity: 1, height: 'auto', /* transform: 'scale(1,1)' */ }}
            leave={{ opacity: 0, height: 0, /* transform: 'scale(1,0)' */ }}
        >
            {
                isAuthenticated
                    ? style => <Dashboard style={style} />
                    : style => <NotAuthenticated style={style} />
            }
        </Transition>
    )
}

export default Home;