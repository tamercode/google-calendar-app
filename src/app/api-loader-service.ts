import { NgZone, Injectable, Optional } from '@angular/core';
declare var gapi: any;

@Injectable()
export class ApiLoaderService {

  zone: NgZone;

  // Client ID and API key from the Developer Console
  CLIENT_ID = '431562838133-i3taa668adb702t6q5fkdm31ls787p26.apps.googleusercontent.com';
  API_KEY = 'AIzaSyBalfuJH99hJHvVAmzotld7K5ydqikbANU';

  // Array of API discovery doc URLs for APIs used by the quickstart
  DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];

  // Authorization scopes required by the API; multiple scopes can be
  // included, separated by spaces.
  SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

  constructor() { }

  loadClient(): Promise<any> {
    return new Promise((resolve, reject) => {
        this.zone.run(() => {
               gapi.load('client', {
                   callback: resolve,
                   onerror: reject,
                   timeout: 1000, // 5 seconds.
                   ontimeout: reject
               });
        });
   });
}

initClient(): Promise<any> {

  const initObj = {
      'apiKey': this.API_KEY,
      'clientId': this.CLIENT_ID,
      'discoveryDocs': this.DISCOVERY_DOCS,
      'scope': this.SCOPES
  };

  return new Promise((resolve, reject) => {
      this.zone.run(() => {
          gapi.client.init(initObj).then(resolve, reject);
      });
  });
}



}
