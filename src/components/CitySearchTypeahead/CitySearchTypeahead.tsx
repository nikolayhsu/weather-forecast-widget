import React from 'react';
import { observer } from 'mobx-react';
// @ts-ignore
import { Typeahead } from 'react-bootstrap-typeahead';
import { GooglePlaceService } from '../../services/GooglePlaceService';
import { action, observable } from 'mobx';
import { WeatherForecastStore } from '../../stores/WeatherForecastStore';

export interface CitySearchTypeaheadProps {
  store: WeatherForecastStore;
}

@observer
export class CitySearchTypeahead extends React.Component<CitySearchTypeaheadProps> {
  private readonly googleService: GooglePlaceService = new GooglePlaceService();

  @observable options: any[] = [];

  ref = React.createRef<Typeahead>();

  @action
  getCitySuggestions(text: string) {
    if (!(text && text.length >= 3)) {
      return;
    }

    this.googleService.getCitySuggestions(text)
      .then((response: any) => {
        this.options = response.data.results;
      });
  }

  changeSelection(selected: any[]) {
    if (!(selected && selected.length)) {
      return;
    }

    const { lat, lng } = selected[0].geometry.location;
    this.props.store.lat = lat;
    this.props.store.lon = lng;
    this.props.store.cityName = selected[0].name;
    this.props.store.load();
    this.ref.current.blur();
  }

  render() {
    return <Typeahead
      ref={this.ref}
      id="basic-typeahead-single"
      labelKey="formatted_address"
      onInputChange={this.getCitySuggestions.bind(this)}
      onChange={this.changeSelection.bind(this)}
      options={this.options}
      placeholder="Search for city..."
      defaultSelected={[]}
    />;
  }
}