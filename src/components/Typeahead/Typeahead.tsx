import  React from 'react';
import './Typeahead.scss';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { GooglePlaceService } from '../../services/GooglePlaceService';
import { WeatherForecastStore } from '../../stores/WeatherForecastStore';

export interface TypeaheadProps {
  store: WeatherForecastStore;
}

@observer
export class Typeahead extends React.Component<TypeaheadProps> {
  private readonly googleService: GooglePlaceService = new GooglePlaceService();
  private timer: NodeJS.Timeout = null;
  private showSuggestions = false;
  private inputRef = React.createRef<HTMLInputElement>();

  @observable query: string = '';
  @observable suggestions: any[] = [];

  private handleInput(event: any) {
    this.query = event.target.value;
    clearTimeout(this.timer);

    this.timer = setTimeout(() => {
      this.getCitySuggestions(this.query);
    }, 200);
  }

  private getCitySuggestions(text: string) {
    if (!(text && text.length >= 3)) {
      this.suggestions = [];
      return;
    }

    this.googleService.getCitySuggestions(text)
      .then((response: any) => {
        this.suggestions = response.data.results;
      });
  }

  private selectSuggestion(suggestion: any) {
    this.query = suggestion.formatted_address;
    const { lat, lng } = suggestion.geometry.location;
    this.props.store.lat = lat;
    this.props.store.lon = lng;
    this.props.store.cityName = suggestion.name;
    this.props.store.load();
    this.inputRef.current.blur();
  }

  private renderSuggestions(): JSX.Element[] {
    if (!(this.showSuggestions && this.query)) {
      return null;
    }

    if (!(this.suggestions && this.suggestions.length) && this.query.length >= 3) {
      return [<div key='no-matched-option' className='suggestion-label'>No match found</div>];
    }

    return this.suggestions.map((suggestion, index) => {
      return <div key={index} className='suggestion-label' onClick={() => this.selectSuggestion(suggestion)}>{suggestion.formatted_address}</div>;
    });
  }

  private handleFocus() {
    this.showSuggestions = true;
  }

  private handleBlur() {
    this.showSuggestions = false;
  }

  private resetQuery() {
    this.query = '';
    this.suggestions = [];
  }

  render() {
    return <div className='weather-forecast-autocomplete input-group'>
      <input type='text' className='form-control' placeholder='Type to search for city...' value={this.query}
        ref={this.inputRef}
        onChange={this.handleInput.bind(this)}
        onFocus={this.handleFocus.bind(this)}
        onBlur={this.handleBlur.bind(this)}/>
      <div className="input-group-append">
        <button className="btn btn-secondary" type="button"
          onClick={this.resetQuery.bind(this)}
          disabled={!this.query}>Clear</button>
      </div>
      <div className='suggestion-dropdown'>{ this.renderSuggestions() }</div>
    </div>;
  }
}