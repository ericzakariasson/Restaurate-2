import { Component } from 'react';
import styled from 'styled-components';

import { RESET_RATE } from './';

import { Plus } from 'react-feather';

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

export const ToggleIcon = styled(Plus)`
  stroke: ${p => p.open ? p.theme.danger : p.theme.action};
  transition: ${p => p.theme.transition};
  transform: rotate(${p => p.open ? `45deg` : `0deg`});
  stroke-linecap: square;
`;

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