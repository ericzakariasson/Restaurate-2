import { Component } from 'react';
import styled from 'styled-components';

export const NodeWrapper = styled.div`
  justify-content: space-between;
  align-items: center;
  display: flex;
`;

const initialState = {
  isOpen: false,
  isRated: false,
  score: 0,
}

class TreeNode extends Component {
  state = initialState;

  handleChange = score => this.setState({ score, isRated: true });

  setRate = (type) => {
    this.props.setRate(
      this.props.name,
      this.state.score,
      this.props.parent || undefined,
      type
    );
  }

  save = () => {
    this.setRate();
    this.toggle();
  }

  reset = () => {
    this.setRate('remove');
    this.setState(initialState)
  }

  toggle = () => this.setState(prevState => ({ isOpen: !prevState.isOpen }));
}

export default TreeNode;