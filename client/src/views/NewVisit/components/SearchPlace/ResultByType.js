import React, { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 15px 0;
`;

const Underline = styled.div`
  position: absolute;
  height: 2px;
  background: ${p => p.theme.action};
  left: 0;
  top: 0;
  opacity: 0;
  transition: all 0.5s cubic-bezier(0.42, 0, 0.1, 1.05), opacity 0.2s 0.4s;
`;

const Type = styled.li`
  display: block;
  font-weight: 700;
  text-transform: uppercase;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  font-size: 1.7rem;
`;

class ResultByType extends Component {

  typeRefs = {};

  state = {
    mounted: false,
  }

  constructor(props) {
    super(props);

    props.types.forEach(type => {
      this.typeRefs[type] = React.createRef();
    })
  }

  componentDidMount() {
    this.setState({
      mounted: true
    })
  }

  select = selected => this.props.select(selected);

  getPos = type => {
    const selectedTypeRef = this.typeRefs[type];

    if (!this.state.mounted) {
      return {
        ready: false,
      }
    }

    return {
      pos: selectedTypeRef.current.getBoundingClientRect(),
      left: selectedTypeRef.current.offsetLeft,
      top: selectedTypeRef.current.offsetTop,
      ready: true,
    }
  }

  render() {
    const { selected } = this.props;

    const { pos, left, top, ready } = this.getPos(selected);


    const underLineStyle = ready ? {
      opacity: 1,
      width: pos ? pos.width : 0,
      transform: `translate(
        ${pos ? left : 0}px,
        ${pos ? top + pos.height + 5 : 0}px
      )`
    } : {}

    return (
      <Wrapper>
        <Underline style={underLineStyle} />
        {
          this.props.types.map(type => (
            <Type
              ref={this.typeRefs[type]}
              onClick={this.select.bind(null, type)}
              selected={type === selected}
            >
              {type}
            </Type>
          ))
        }
      </Wrapper>
    )
  }
}

export default ResultByType;