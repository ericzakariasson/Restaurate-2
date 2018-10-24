import React, { Component } from 'react';
import styled, { withTheme } from 'styled-components';

import ChildNode from './ChildTreeNode';

import { Transition, animated } from 'react-spring';

import Label from '../../../../components/Label';
import { Wrapper } from '../../../../components/Input';

import mapTreeToState from './mapTreeToState';
import ParentTreeNode from './ParentTreeNode';

import { NodeWrapper } from './TreeNode';

const Nodes = styled.section``;

const TotalScoreWrapper = styled(NodeWrapper)`
  border-bottom: 5px solid ${p => p.theme.action};
  background: #FFF;
  font-size: 2.4rem;
  padding: 20px;
  color: #222;
  margin-top: 20px;
  box-shadow: ${p => p.theme.boxShadow};
`;

const TotalScoreText = styled.h2`
  font-weight: 700;
`;

const TotalScore = styled.h1`
  font-weight: 500;
  font-size: 3rem;
`;

const OfMax = styled.span`
  font-weight: 500;
  font-size: 1.2rem;
  opacity: 0.5;
`;

const Node = styled.article`
  background: #FFF;
  border-radius: 2px;
  box-shadow: ${p => p.theme.boxShadow};


  &:not(:last-of-type) {
    margin-bottom: 20px;
  }
`;

export const RESET_RATE = 'RESET_RATE';
export const ADD_RATE = 'ADD_RATE';

class Ratings extends Component {

  state = mapTreeToState(this.props.tree);

  setRate = (name, score, type) => {
    let newState = this.state;

    if (type === RESET_RATE) {
      newState[name].value = 0;
      newState[name].isRated = false;
    } else {
      newState[name].value = score;
      newState[name].isRated = true;

      if (newState[name].children) {
        for (const child of newState[name].children) {
          if (newState[child].isRated) {
            newState[child].value = 0;
            newState[child].isRated = false;
          }
        }
      }
    }

    this.setState(newState);
    this.setParentState();
  }

  setParentState = () => {
    const ratings = this.state;
    const obj = Object.keys(this.state).reduce((results, item) => {
      if (ratings[item].isRated) {
        if (ratings[item].parent) {
          const parent = ratings[item].parent;
          if (!results[parent] || typeof results[parent] !== 'object') {
            results[parent] = {};
          }

          results[parent][item] = ratings[item].value;
        } else {
          results[item] = ratings[item].value;
        }
      }

      return results;
    }, {});

    this.props.setValue('rating', obj);
  }

  useAverage = name => {
    const item = this.state[name];

    if (item.isRated) {
      return false;
    }

    if (item.children) {
      for (const child of item.children) {
        if (this.state[child].isRated) {
          return true;
        }
      }
    }
  }

  getAverageScore = name => {
    const item = this.state[name];
    if (item.children) {
      let i = 0;
      let totalScore = 0;
      for (const child of item.children) {
        if (this.state[child].isRated) {
          totalScore += this.state[child].value
          i++;
        }
      }

      return totalScore / i;
    }
  }

  shouldHideChildren = name => {
    const item = this.state[name];
    return item.isRated;
  }

  getTotalScore = () => {
    let iterations = 0;
    const total = Object.keys(this.state).reduce((total, item) => {
      if (this.state[item].isRated) {
        total += this.state[item].value
        iterations++;
      }
      return total;
    }, 0);

    if (iterations === 0) {
      return 0
    } else {
      const average = (total / iterations).toFixed(1);
      return parseFloat(average);
    }
  }

  render() {

    const total = this.getTotalScore();

    return (
      <Wrapper>
        <Label>Betyg</Label>
        <Nodes>
          {
            this.props.tree.map(node => {

              const shouldHideChildren = this.shouldHideChildren(node.name);

              return (
                <Node key={node.name}>
                  <ParentTreeNode
                    isRated={this.state[node.name].isRated}
                    score={this.state[node.name].value}
                    setRate={this.setRate}
                    useAverage={this.useAverage(node.name)}
                    averageScore={this.getAverageScore(node.name)}
                    {...node}
                  />
                  {
                    node.children
                      ? (
                        <Transition
                          native
                          from={{ opacity: 0, transform: `scale(1, 0)`, maxHeight: 0 }}
                          enter={{ opacity: 1, transform: `scale(1, 1)`, maxHeight: 280 }}
                          leave={{ opacity: 0, transform: `scale(1, 0)`, maxHeight: 0 }}
                        >
                          {
                            shouldHideChildren
                              ? () => null
                              : style => (
                                <animated.ul style={{ ...style, transformOrigin: '0 100%' }}>
                                  {
                                    node.children.map(childNode => {
                                      return (
                                        <ChildNode
                                          key={childNode.name}
                                          isRated={this.state[childNode.name].isRated}
                                          score={this.state[childNode.name].value}
                                          setRate={this.setRate}
                                          parent={node.name}
                                          {...childNode} />
                                      )
                                    })
                                  }
                                </animated.ul>
                              )
                          }
                        </Transition>
                      ) : null
                  }
                </Node>
              )
            })
          }
          <TotalScoreWrapper>
            <TotalScoreText>Total</TotalScoreText>

            <TotalScore>{total}<OfMax>/10</OfMax></TotalScore>
          </TotalScoreWrapper>
        </Nodes>
      </Wrapper>
    )
  }
}

function averageScore(scoreObj) {
  if (scoreObj === null) {
    return undefined
  }


  const score = scoreObj;
  console.log('score: ', score);

  let i = 0;
  const parentScore = Object.keys(score).reduce((total, key) => {
    if (score[key] && (key !== 'useAverage' || key !== 'useAverage')) {
      total += score[key];
      i++;
    }
    return total
  }, 0);

  const newScore = parentScore / i;
  return newScore;
}

export default withTheme(Ratings);