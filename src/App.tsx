import React from 'react';
import './App.scss';
import { WeatherForecastWidget } from './components/WeatherForecastWidget';
import { WeatherForecastStore } from './stores/WeatherForecastStore';
import { observer } from 'mobx-react';

@observer
class App extends React.Component {
  store: WeatherForecastStore = new WeatherForecastStore();

  constructor(props: any) {
    super(props);
    this.store.init();
  }
  
  render() {
    return (
      <div>
        <WeatherForecastWidget store={this.store}></WeatherForecastWidget>
      </div>
    );
  }
}

export default App;
