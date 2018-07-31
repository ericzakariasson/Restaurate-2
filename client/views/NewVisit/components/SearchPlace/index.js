import React, { Component, Fragment } from 'react';
import styled from 'styled-components';


import { Transition, animated, config } from 'react-spring';
import { Easing } from 'react-spring/dist/addons'

import SelectedPlace from './SelectedPlace';
import InputWithResultList from './InputWithResultList';

import { Wrapper } from '../../../../components/Input';

const Background = styled(animated.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.05);
  z-index: 5;
`;

class SearchPlace extends Component {
  state = {
    value: '',
    results: [],
    selected: null,
    isSelected: false,
    isOpen: false,
    loading: false,
    error: '',
    searched: false,
  }

  constructor() {
    super();

    /* if (!window.google) {
      throw Error('Google Maps API must be imported');
    } */
  }

  handleChange = ({ target: { value } }) => this.setState({ value });

  open = () => this.setState({ isOpen: true });

  close = () => this.setState({ isOpen: false });

  handleClear = e => {
    e.preventDefault();
    this.setState({ isOpen: false, value: '', results: [] });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.open();

    if (this.state.value.length > 2) {
      this.searchPlaces();
    }
  }

  searchPlaces = () => {
    this.setState({ loading: true, searched: true });
    const map = new google.maps.Map(document.createElement('div'));
    const service = new google.maps.places.PlacesService(map);

    const request = {
      type: ['food'],
      query: this.state.value
    }

    service.textSearch(request, this.handleResponse);
  }

  handleResponse = (results, status) => {
    this.handleStatus(status);

    const { OK } = window.google.maps.places.PlacesServiceStatus;

    if (this.state.isOpen && status === OK) {
      this.setState({ results });
      setTimeout(() => this.setState({ loading: false }), 500); //Delay for better UX
    } else {
      this.setState({ results, loading: false })
    }
  }

  selectPlace = id => {
    const selected = this.state.results.find(place => place.id === id);
    this.props.setValue('place', selected);
    this.setState({ isSelected: true, isOpen: false });
  }

  deselectPlace = () => {
    this.props.onReset('place');
    this.setState({ isSelected: false });
  }

  handleStatus = status => {
    const googleStatus = window.google.maps.places.PlacesServiceStatus;
    let error;

    switch (status) {
      case googleStatus.ERROR:
        error = 'Det gick inte att kontakta Googles servrar';
        break;
      case googleStatus.INVALID_REQUEST:
        error = 'Ogiltig förfrågan. Vänligen försök igen.';
        break;
      case googleStatus.OVER_QUERY_LIMIT:
        error = 'Detta borde inte kunna hända. Vänliga kontakta eric.zakariasson@gmail.com';
        break;
      case googleStatus.UNKNOWN_ERROR:
        error = 'Ett okänt fel har inträffat. Vänligen försök igen';
        break;
      default:
        error = 'Ett fel har inträffat. Vänligen försök igen';
    }

    if (error) {
      this.setState({ error })
    }
  }

  render() {

    const { isOpen, value, results, loading, isSelected } = this.state;
    const { selected } = this.props;

    return (
      <Wrapper>
        <Transition
          native
          from={{ height: 0, opacity: 0, transform: 'scale3d(0.25,0.25,0.5)' }}
          enter={{ height: 'auto', opacity: 1, transform: 'scale3d(1,1,1)' }}
          leave={{ height: 0, opacity: 0, transform: 'scale3d(0.25,0.25,0.5)' }}
          config={config.stiff}
        >
          {
            isSelected
              ? style => <SelectedPlace style={style} onDeselect={this.deselectPlace} {...selected} />
              : style => (
                <InputWithResultList
                  style={style}
                  onChange={this.handleChange}
                  onSubmit={this.handleSubmit}
                  onSelect={this.selectPlace}
                  onClear={this.handleClear}
                  value={value}
                  isOpen={isOpen}
                  loading={loading}
                  results={results} />
              )
          }
        </Transition>
        <Transition
          native
          from={{ opacity: 0 }}
          enter={{ opacity: 1 }}
          leave={{ opacity: 0 }}
          config={{ duraton: 200, easing: Easing.inOut }}
        >
          {
            isOpen
              ? style => <Background style={style} onClick={this.close} />
              : () => null
          }
        </Transition>
      </Wrapper>
    )
  }
}

export default SearchPlace;