import axios, { AxiosResponse } from 'axios';

const apiKey = 'AIzaSyB9ihBIMo9W2iHqCY-Y9SXDtp-kA_TEdcM';

export class GooglePlaceService {
  getCitySuggestions(query: string): Promise<AxiosResponse<any>> {
    return axios.get<any>(
      `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&type=locality&key=${apiKey}`
    );
  }
}