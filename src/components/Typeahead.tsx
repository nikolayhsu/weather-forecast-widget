import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { GooglePlaceService } from '../services/GooglePlaceService';
import { WeatherForecastStore } from '../stores/WeatherForecastStore';

export interface TypeaheadProps {
  store: WeatherForecastStore;
}

const SuggestionDropdownDiv = styled.div`
  position: absolute;
  background-color: linen;
  top: 40px;
`;

const SuggestionDiv = styled.div`
  padding: 5px 10px;

  &:hover {
    background-color: #007bff;
    color: linen;
  }
`;

let timer = 0;

export function Typeahead({ store }: TypeaheadProps) {
  const googleService: GooglePlaceService = new GooglePlaceService();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  const getCitySuggestions = (text: string) => {
    if (!(text && text.length >= 3)) {
      setSuggestions([]);
      return;
    }

    googleService.getCitySuggestions(text)
      .then((response: any) => {
        setSuggestions(response.data.results);
      });
  };

  const resetQuery = () => {
    setQuery('');
    setSuggestions([]);
  };

  const handleInput = (event: any) => {
    setQuery(event.target.value);
    clearTimeout(timer);
    timer = setTimeout(() => {
      getCitySuggestions(query);
    }, 200);
  };

  const selectSuggestion = (suggestion: any) => {
    setQuery(suggestion.formatted_address);
    const { lat, lng } = suggestion.geometry.location;
    store.lat = lat;
    store.lon = lng;
    store.cityName = suggestion.name;
    store.load();
    inputRef.current.blur();
  };

  const renderSuggestions = (): JSX.Element[] => {
    if (!(showSuggestions && query)) {
      return null;
    }

    if (!(suggestions && suggestions.length) && query.length >= 3) {
      return [<SuggestionDiv key='no-matched-option'>No match found</SuggestionDiv>];
    }

    return suggestions.map((suggestion, index) => {
      return <SuggestionDiv key={index} onClick={() => selectSuggestion(suggestion)}>{suggestion.formatted_address}</SuggestionDiv>;
    });
  };

  const onBlur = () => {
    setTimeout(() => setShowSuggestions(false), 200);
  };

  return <div className='position-relative input-group'>
    <input type='text' className='form-control' placeholder='Type to search for city...' value={query}
      ref={inputRef}
      onChange={handleInput}
      onFocus={() => setShowSuggestions(true)}
      onBlur={() => onBlur()} />
    <div className="input-group-append">
      <button className="btn btn-secondary" type="button"
        onClick={() => resetQuery()}
        disabled={!query}>Clear</button>
    </div>
    <SuggestionDropdownDiv>{renderSuggestions()}</SuggestionDropdownDiv>
  </div>;
}
