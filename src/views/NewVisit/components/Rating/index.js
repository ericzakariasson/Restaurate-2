import React, { Component } from 'react';
import styled, { withTheme } from 'styled-components';

import { Plus } from 'react-feather';
import { NodeWrapper } from './TreeNode';
import ChildNode from './ChildTreeNode';

import Label from '../../../../components/Label';
import { Wrapper } from '../../../../components/Input';

import mapTreeToState from './mapTreeToState';
import ParentTreeNode from './ParentTreeNode';

const Nodes = styled.section`
  box-shadow: ${p => p.theme.boxShadow};
  border-radius: 5px;
`;

const NodeArticle = styled.article``;
const ChildNodes = styled.ul``;

class Ratings extends Component {

  state = mapTreeToState(this.props.tree);

  setRate = (name, score, parent, type = 'add') => {
    let newState = this.state;
    if (parent) {
      if (typeof newState[parent] !== 'object') {
        newState[parent] = {};
      }

      newState[parent][name] = score;

      if (type === 'remove') {
        newState[parent].useAverage = false;
      } else {
        newState[parent].useAverage = true;
        newState[parent].averageScore = averageScore(newState[parent]);
      }
    } else {
      newState[name] = score;
    }
    this.setState(newState)
  }

  render() {
    return (
      <Wrapper>
        <Label>Betyg</Label>
        <Nodes>
          {
            this.props.tree.map(node => {
              return (
                <NodeArticle key={node.name}>
                  <ParentTreeNode
                    setRate={this.setRate}
                    useAverage={this.state[node.name] && this.state[node.name].useAverage}
                    averageScore={this.state[node.name] && this.state[node.name].averageScore}
                    {...node} />
                  {
                    node.children
                      ? (
                        <ChildNodes>
                          {node.children.map(childNode => (
                            <ChildNode
                              key={childNode.name}
                              setRate={this.setRate}
                              parent={node.name}
                              {...childNode} />
                          ))}
                        </ChildNodes>
                      ) : null
                  }
                </NodeArticle>
              )
            })
          }
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