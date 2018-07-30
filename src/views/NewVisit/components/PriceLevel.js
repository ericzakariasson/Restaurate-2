import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Transition, animated } from 'react-spring';

import Label from '../../../components/Label';
import { Circle, Check } from 'react-feather';


const GridWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: -5px; /* Counteract on 'PriceItem { margin: 5px };' */
`;

const PriceItem = styled.li`
  width: calc(50% - 10px);
  border-radius: 5px;
  box-shadow: ${p => p.theme.boxShadow};
  margin: 5px;
  background: ${p => p.selected ? '#222' : '#FFF'};
  transition: ${p => p.theme.transition};
  display: block;
  cursor: pointer;
`;

const Text = styled.p`
  font-size: 1.8rem;
  color: ${p => p.selected ? '#FFF' : '#222'};
  font-weight: 400;
`;

const Icons = styled.div`
  position: relative;
`;

const StyledCircle = styled(Circle)`
  transition: ${p => p.theme.transition};
  fill: ${p => p.selected ? '#FFF' : 'none'};
  stroke: ${p => p.selected ? 'none' : p.theme.action};
`;

const IconWrapper = styled(animated.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledCheck = styled(Check)`
  stroke-width: 4;
  color: ${p => p.theme.action};
`;

const ItemLabel = styled.label`
  cursor: pointer;
  padding: 10px;
  padding-left: 15px;
  padding-right: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HiddenInput = styled.input`
  display: none;
`;
class PriceLevel extends React.Component {
  state = { selected: undefined }

  reset = e => {
    e.preventDefault();
    this.props.onReset('priceLevel')
  }

  toggle = ({ target: { value } }) => {
    const selectedLevel = this.props.priceLevels.find(level => level.value === parseInt(value, 10));
    this.props.onSelect('priceLevel', selectedLevel)
  }

  render() {
    const { priceLevels } = this.props;
    return (
      <React.Fragment>
        <Label onClick={this.reset}>Prisnivå</Label>
        <GridWrapper>
          {
            priceLevels.map(({ value, label }) => {
              const isSelected = this.props.selected && this.props.selected.value === value ? true : false;
              const id = `price-level-${value}`;
              return (
                <PriceItem selected={isSelected} key={label} >
                  <ItemLabel htmlFor={id} onClick={isSelected ? this.reset : undefined}>
                    <HiddenInput
                      type="radio"
                      name="price-level"
                      value={value}
                      checked={isSelected}
                      onChange={this.toggle}
                      id={id}
                    />
                    <Text selected={isSelected}>{label}</Text>
                    <Icons>
                      <Transition
                        native
                        from={{ opacity: 0, transform: `translate(-50%, -50%) scale(0, 0)` }}
                        enter={{ opacity: 1, transform: `translate(-50%, -50%) scale(1, 1)` }}
                        leave={{ opacity: 0, transform: `translate(-50%, -50%) scale(0, 0)` }}
                      >
                        {isSelected ? style => <IconWrapper style={style}><StyledCheck size={12} /></IconWrapper> : () => null}
                      </Transition>
                      <StyledCircle selected={isSelected} />
                    </Icons>
                  </ItemLabel>
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