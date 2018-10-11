import React from 'react';
import styled from 'styled-components';
import TreeNode, { NodeWrapper } from './TreeNode';
import { Transition, animated } from 'react-spring';

import { CornerDownRight, Plus } from 'react-feather';
import RateSlider from './RateSlider';



const StyledChildNode = styled(animated.li)`
  padding: 20px;
  font-size: 1.8rem;
  border-bottom: 1px solid #EEE;
`;

const TextWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const TextIcon = styled(CornerDownRight)`
  margin-right: 10px;

  polyline {
    display: none;
  }

  path {
    stroke-width: 3;
  }
`;

const Score = styled(animated.h4)`
  height: 24px;
  font-size: 2.4rem;
  margin-right: 10px;
`;

const ToggleIcon = styled(Plus)`
  stroke: ${p => p.open ? p.theme.danger : p.theme.action};
  transition: ${p => p.theme.transition};
  transform: rotate(${p => p.open ? `45deg` : `0deg`});
`;

const ScoreWrapper = styled.div`
  display: flex;
`;

class ChildTreeNode extends TreeNode {
  render() {

    const { isOpen, touched, score } = this.state;
    const { isRated } = this.props;

    return (
      <StyledChildNode style={this.props.style}>
        <NodeWrapper>
          <TextWrapper>
            <TextIcon color="#CCC" size={18} />
            {this.props.label}
          </TextWrapper>
          <ScoreWrapper>
            <Transition
              native
              native
              from={{ opacity: 0, transform: `scale(0)` }}
              enter={{ opacity: 1, transform: `scale(1)` }}
              leave={{ opacity: 0, transform: `scale(0)` }}
            >
              {
                touched
                  ? style => <Score style={style}>{isRated ? this.props.score : score}</Score>
                  : () => null
              }
            </Transition>
            <ToggleIcon open={isOpen || isRated} onClick={touched ? this.reset : this.toggle} />
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
              ? style => <RateSlider onCancel={this.reset} onSave={this.save} style={style} onChange={this.handleChange} value={score} />
              : () => null
          }
        </Transition>
      </StyledChildNode>
    )
  }
}

export default ChildTreeNode;