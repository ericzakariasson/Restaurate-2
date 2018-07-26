import React from 'react';
import styled from 'styled-components';

import PropTypes from 'prop-types';

import Label from '../../../components/Label';

import { Circle, Check } from 'react-feather';

const GridWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const PriceItem = styled.li`
  width: calc(50% - 10px);
  padding: 10px;
  padding-left: 15px;
  padding-right: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  box-shadow: ${p => p.theme.boxShadow};
  margin: 5px;
  background: ${p => p.selected ? '#222' : '#FFF'};
  transition: ${p => p.theme.transition};
  cursor: pointer;
`;

const Text = styled.p`
  font-size: 1.8rem;
  color: ${p => p.selected ? '#FFF' : '#222'};
  font-weight: 500;
`;

const Icons = styled.div`
  position: relative;
`;

const StyledCircle = styled(Circle)`
  transition: ${p => p.theme.transition};
  fill: ${p => p.selected ? '#FFF' : 'none'};
  stroke: ${p => p.selected ? 'none' : '#222'};
`;

const StyledCheck = styled(Check)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  stroke-width: 4;
`;

class PriceLevel extends React.Component {
  state = { selected: undefined }

  handleClick = value => this.setState({ selected: value })

  render() {
    const { priceLevels } = this.props;
    return (
      <React.Fragment>
        <Label>Prisnivå</Label>
        <GridWrapper>
          {
            priceLevels.map(({ value, label }) => {
              const selected = this.state.selected === value;
              return (
                <PriceItem onClick={() => this.handleClick(value)} selected={selected} key={label}>
                  <Text selected={selected}>{label}</Text>
                  <Icons>
                    {selected ? <StyledCheck color={`#222`} size={12} /> : null}
                    <StyledCircle selected={selected} />
                  </Icons>
                </PriceItem>
              )
            })
          }
        </GridWrapper>
      </React.Fragment>
    )
  }
};

PriceLevel.propTypes = {
  priceLevels: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.number,
    label: PropTypes.string
  }))
}

export default PriceLevel;