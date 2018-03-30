import { NgZone, Injectable, Optional } from '@angular/core';
import { Time } from '@angular/common';
import { promise } from 'protractor';
import { Event } from '../events/events.model';
import { Observable } from 'rxjs/Observable';


declare var gapi: any;

@Injectable()
export class ApiLoaderService {

  sequence = new Observable((observer) => {

    observer.next(1);
  });



  _signIn = false;
  cont = 1;



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
        gapi.client.init(initObj).then(resolve, reject);
      });
    });
  }

  primoSignIn() { return this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get()); }
  ascoltoSignIn() { return gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus.bind(this.updateSigninStatus)); }

  sigInState() {
    // controlla lo stato del token di atutorizzazione

    // controlla ogni volta che c'è un cambiamento di stato dell'autorizzazione
    gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus.bind(this.updateSigninStatus));

    // controlla lo stato inizale che non verrebbe rilevato dal comando precedente
    this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
  }

  statoSignIn() { return gapi.auth2.getAuthInstance().isSignedIn.get(); }

  signIn() { return gapi.auth2.getAuthInstance().signIn(); }
  signOut() { return gapi.auth2.getAuthInstance().signOut(); }


  listUpcomingEvents(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.zone.run(() => {
        gapi.client.calendar.events.list({
          'calendarId': 'primary',
          'timeMin': (new Date()).toISOString(),
          'showDeleted': false,
          'singleEvents': true,
          'maxResults': 30,
          'orderBy': 'startTime'
        }).then(resolve, reject);
      });
    });
  }

test() {
  const t = gapi.client.calendar;

  console.log(t instanceof Promise);
 }

  updateSigninStatus(isSignedIn) {  // funzione di appoggio per this.sigInState();

    if (isSignedIn) {
      console.log('sigIn ' + typeof (isSignedIn) + isSignedIn); this._signIn = isSignedIn; return isSignedIn;
    } else { console.log('sigIn ' + typeof (isSignedIn) + isSignedIn); this._signIn = isSignedIn; return isSignedIn; }
  }


}
