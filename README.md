# Weather Forecast Widget for PWC

For live demo, visit https://weather-forecast-3fce5.web.app/

## Features

* Showing highest and lowest temperatures of 7 days
* Fetching user's current location and looking up weather details
* Default to Sydney if user's location is not available
* A button to toggle metric and imperial
* Allowing users' to look up for a city
* Responsive for smaller screens

## APIs Used

* Google Places API - for looking up cities
* OpenWeather API - for looking up weather data

## Known issues

* The open-source Typeahead component used in this test is not as stable. It sometimes does not display results properly. 

## Running Locally

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). Please follow the instructions below, if running it locally.
In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

