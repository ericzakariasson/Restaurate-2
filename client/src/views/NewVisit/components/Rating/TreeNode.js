import { Component } from 'react';
import styled from 'styled-components';

import { RESET_RATE } from './';

export const NodeWrapper = styled.div`
  justify-content: space-between;
  align-items: center;
  display: flex;
`;

const initialState = {
  isOpen: false,
  touched: false,
  score: 0,
}

class TreeNode extends Component {
  state = initialState;

  handleChange = score => this.setState({ score, touched: true });

  setRate = type => {
    this.props.setRate(
      this.props.name,
      this.state.score,
      type
    );
  }

  save = () => {
    this.setRate();
    this.toggle();
  }

  reset = () => {
    this.setRate(RESET_RATE);
    this.setState(initialState)
  }

  toggle = () => this.setState(prevState => ({ isOpen: !prevState.isOpen }));
}

export default TreeNode;