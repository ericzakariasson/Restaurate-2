import React from 'react';
import styled from 'styled-components';
import TreeNode, { NodeWrapper } from './TreeNode';
import { Transition, animated } from 'react-spring';

import { Plus } from 'react-feather';
import RateSlider from './RateSlider';

const ParentNode = styled.h1`
  font-size: 2.2rem;
  width: 100%;
`;

const ParentNodeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;

  &:not(:only-child) {
    border-bottom: 1px solid #EEE;
  }
`;

const ScoreWrapper = styled.div`
  display: flex;
`;

const Score = styled(animated.h4)`
  height: 24px;
  font-size: 2.6rem;
  font-weight: 500;
  margin-right: 10px;
`;

const ToggleIcon = styled(Plus)`
  stroke: ${p => p.open ? p.theme.danger : p.theme.action};
  transition: ${p => p.theme.transition};
  transform: rotate(${p => p.open ? `45deg` : `0deg`});
`;

class ParentTreeNode extends TreeNode {

  static getDerivedStateFromProps(props, state) {
    console.log('props.useAverage: ', props.useAverage);
    if (props.useAverage) {
      return {
        ...state,
        score: props.averageScore,
        isRated: true,
      }
    } else {
      return null;
    }
  }

  //TODO ComponentDidUpdate

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.useAverage && !this.props.useAverage) {
      this.setRate({ isRated: false, score: 0 })
    }
  }

  render() {
    const { isOpen, isRated, score } = this.state;

    return (
      <ParentNodeWrapper>
        <NodeWrapper>
          <ParentNode>{this.props.label}</ParentNode>
          <ScoreWrapper>
            <Transition
              native
              native
              from={{ opacity: 0, transform: `scale(0)` }}
              enter={{ opacity: 1, transform: `scale(1)` }}
              leave={{ opacity: 0, transform: `scale(0)` }}
            >
              {
                isRated
                  ? style => <Score style={style}>{score}</Score>
                  : () => null
              }
            </Transition>
            <ToggleIcon open={isOpen || isRated} onClick={isRated ? this.reset : this.toggle} />
          </ScoreWrapper>
        </NodeWrapper>
        <Transition
          native
          native
          from={{ opacity: 0, marginTop: 0, height: 0, transform: `scale(0)` }}
          enter={{ opacity: 1, marginTop: 20, height: 55, transform: `scale(1)` }}
          leave={{ opacity: 0, marginTop: 0, height: 0, transform: `scale(0)` }}
        >
          {
            isOpen
              ? style => <RateSlider onCancel={this.reset} onSave={this.save} isRated={isRated} style={style} onChange={this.handleChange} value={score} />
              : () => null
          }
        </Transition>
      </ParentNodeWrapper>
    )
  }
}

export default ParentTreeNode;