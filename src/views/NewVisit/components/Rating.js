import React, { Component } from 'react';
import styled from 'styled-components';

import Label from '../../../components/Label';
import { Wrapper } from '../../../components/Input';

const Nodes = styled.div``;

const Node = styled.p`
  padding: 20px;
`;

const ParentNode = Node.withComponent('h1').extend`
  font-size: 2.4rem;
`;

const ChildNode = Node.extend`
  padding-left: 40px;
`;

class Ratings extends Component {
  render() {
    return (
      <Wrapper>
        <Label>Betyg</Label>
        {
          this.props.tree.map(node => {
            return (
              <div key={node.name}>
                <ParentNode>{node.label}</ParentNode>
                {
                  node.children
                    ? (
                      <ul>
                        {node.children.map(childNode => <li key={childNode.name}>{childNode.label}</li>)}
                      </ul>
                    ) : null
                }
              </div>
            )
          })
        }
      </Wrapper>
    )
  }
}

export default Ratings;