import { NgZone, Injectable, Optional } from '@angular/core';
declare var gapi: any;

@Injectable()
export class ApiLoaderService {


  // Client ID and API key from the Developer Console
  CLIENT_ID = '887532770546-j2vob0ls6ula72oga61mbo13ffknii0a.apps.googleusercontent.com';
  API_KEY = 'AIzaSyCXGxpC7l_pBBCtl6hsU8e45io_RmaQBGc';

  // Array of API discovery doc URLs for APIs used by the quickstart
  DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];

  // Authorization scopes required by the API; multiple scopes can be
  // included, separated by spaces.
  SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

  constructor(private zone: NgZone) { }

  loadClient(): Promise<any> {
    return new Promise((resolve, reject) => {
        this.zone.run(() => {
               gapi.load('client:auth2', {
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
          gapi.client.init(initObj).then(resolve, reject, );
      });
  });
}

sigInState() {

    gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);

    // Handle the initial sign-in state.
    this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
}

updateSigninStatus(a) {console.log('sigIn ' + a ); }

signIn() {gapi.auth2.getAuthInstance().signIn(); }
signOut() { gapi.auth2.getAuthInstance().signOut(); }


listUpcomingEvents() {
    gapi.client.calendar.events.list({
      'calendarId': 'primary',
      'timeMin': (new Date()).toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 10,
      'orderBy': 'startTime'
    }).then(function(response) {
      const events = response.result.items;

      if (events.length > 0) {
        for (let i = 0; i < events.length; i++) {
          const event = events[i];
          let when = event.start.dateTime;
          if (!when) {
            when = event.start.date;
          }
          console.log(event.summary + ' (' + when + ')');
        }
      } else {
        console.log('No upcoming events found.');
      }
    });
  }




}
