import { NgZone, Injectable, Optional } from '@angular/core';
import { Time } from '@angular/common';
import { promise } from 'protractor';
import { Event } from '../events/events.model';
import { Observable } from 'rxjs/Observable';


declare var gapi: any;

@Injectable()
export class ApiLoaderService {


  _signIn = false;
  cont = 1;



  // Client ID and API key from the Developer Console
  CLIENT_ID = '';
  API_KEY = '';

  // Array of API discovery doc URLs for APIs used by the quickstart
  DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];

  // Authorization scopes required by the API; multiple scopes can be
  // included, separated by spaces.
  SCOPES = 'https://www.googleapis.com/auth/calendar';

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


  sigInState() {   // controlla lo stato del token di atutorizzazione


    this.zone.run(() => {
      // controlla ogni volta che c'è un cambiamento di stato dell'autorizzazione
      gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus.bind(this.updateSigninStatus));

      // controlla lo stato inizale che non verrebbe rilevato dal comando precedente
      this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    });

  }

  statoSignIn(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.zone.run(() => {
        resolve(gapi.auth2.getAuthInstance().isSignedIn.get());
      });
    });
  }

  signIn(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.zone.run(() => {
        gapi.auth2.getAuthInstance().signIn().then(resolve, reject);
      });
    });


  }
  signOut(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.zone.run(() => {
        gapi.auth2.getAuthInstance().signOut().then(resolve, reject);
      });
    });




  }


 listUpcomingEvents(list): Promise<any> {
    return new Promise((resolve, reject) => {
      this.zone.run(() => {
        gapi.client.calendar.events.list(list).then(resolve, reject);
      });
    });
  }


 listUpcomingEvents1(list): Promise<any> {
    return new Promise((resolve, reject) => {
      this.zone.run(() => {

      const risp = gapi.client.calendar.events.list(list).then(resolve, reject);
      });
    });
  }






  DeleteEvents(event: Event): Promise<any> {
    return new Promise((resolve, reject) => {
      this.zone.run(() => {
        console.log(event.id);
        gapi.client.calendar.events.delete({
          'calendarId': 'petraliariccardo@gmail.com',
          'eventId': event.id,

        }).then(resolve, reject);
      });
    });
  }


  private updateSigninStatus(isSignedIn) {  // funzione di appoggio per this.sigInState();

    if (isSignedIn) {
      console.log('sigIn ' + typeof (isSignedIn) + isSignedIn); this._signIn = isSignedIn; return isSignedIn;
    } else { console.log('sigIn ' + typeof (isSignedIn) + isSignedIn); this._signIn = isSignedIn; return isSignedIn; }
  }


}
