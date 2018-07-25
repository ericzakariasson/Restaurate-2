import React, { Component } from 'react';
import styled from 'styled-components';

import Label from '../../../components/Label';
import { Wrapper } from '../../../components/Input';

class Ratings extends Component {
  render() {
    return (
      <Wrapper>
        <Label>Betyg</Label>
        {
          this.props.tree.map(node => {
            return (
              <div key={node.value}>
                <h1>{node.label}</h1>
                {
                  node.children
                  ? (
                    <ul>
                      {node.children.map(childNode => <li key={childNode.value}>{childNode.label}</li>)}
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