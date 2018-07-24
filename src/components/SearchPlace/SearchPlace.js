import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

import { Transition, Keyframes, animated, config } from 'react-spring';
import { Easing } from 'react-spring/dist/addons'

import ResultList from './ResultList';
import SearchInput from './SearchInput';
import SelectedPlace from './SelectedPlace';

import { Wrapper } from '../Input';

const Background = styled(animated.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.05);
  z-index: 5;
`;


const SearchPlaceWrapper = styled(animated.div)`
  position: relative;
  z-index: 10;
  transform-origin: 50% 0;
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
  }

  constructor() {
    super();

    if (!window.google) {
      throw Error('Google Maps API must be imported');
    }
  }

  handleChange = ({ target: { value } }) => this.setState({ value });

  open = () => this.setState({ isOpen: true });

  close = () => this.setState({ isOpen: false });

  clear = e => {
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
    this.setState({ loading: true });
    const map = new google.maps.Map(document.createElement('div'));
    const service = new google.maps.places.PlacesService(map);

    const request = {
      type: ['restaurant'],
      query: this.state.value
    }

    service.textSearch(request, this.handleResponse);
  }

  handleResponse = (results, status) => {
    console.log(status);
    this.handleStatus(status);

    this.setState({
      results,
      loading: false
    })
  }

  selectPlace = id => {
    const selected = this.state.results.find(place => place.id === id);
    this.setState({ selected, isSelected: true, isOpen: false });
  }

  deselectPlace = () => {
    this.setState({ selected: null, isSelected: false });
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

    const { isOpen, value, results, loading, selected, isSelected } = this.state;

    const state = this.state.isSelected ? 'selected' : 'default';

    return (
      <Wrapper>

        <Transition
          native
          from={{ opacity: 0, transform: 'scale3d(0.25,0.25,0.5)' }}
          enter={{ opacity: 1, transform: 'scale3d(1,1,1)' }}
          leave={{ opacity: 0, transform: 'scale3d(0.25,0.25,0.5)' }}
          config={config.stiff}
        >
          {
            isSelected
              ? style => <SelectedPlace style={style} onDeselect={this.deselectPlace} {...selected} />
              : style => {
                return (
                  <SearchPlaceWrapper style={style}>
                    <SearchInput
                      isOpen={isOpen}
                      onChange={this.handleChange}
                      onSubmit={this.handleSubmit}
                      value={value}
                      clear={this.clear}
                    >
                      <Transition
                        native
                        from={{ opacity: 0.5, transform: 'scale3d(0.25,0.25,0.5)' }}
                        enter={{ opacity: 1, transform: 'scale3d(1,1,1)' }}
                        leave={{ opacity: 0, transform: 'scale3d(0.25,0.25,0.5)' }}
                        config={config.stiff}
                      >
                        {
                          isOpen
                            ? style => <ResultList onSelect={this.selectPlace} style={style} results={results} loading={loading} open={isOpen} />
                            : () => null
                        }
                      </Transition>
                    </SearchInput>
                  </SearchPlaceWrapper>
                )
              }
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