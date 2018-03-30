import { Component, OnInit, AfterViewInit, OnChanges, SimpleChange, Input, QueryList, ViewChildren, ElementRef } from '@angular/core';
import { Event } from './events.model';
import { EventsService } from './events.service';
import { ApiLoaderService } from '../service/api-loader-service';


import { ClrDatagridStateInterface, ClrDatagrid } from '@clr/angular';
import { HttpClient } from '@angular/common/http/src/client';





@Component({
    moduleId: module.id,
    selector: 'app-events',
    templateUrl: 'events.component.html',
    styleUrls: ['events.component.css'],
    providers: [EventsService, ApiLoaderService]
})

export class EventsComponent implements OnInit {


    mostra = false;
    eventsList: Event[] = [];
    appog = false;
    selected: Event;
    copySelectedEvent: Event;
    loading = true;
    total: number;
    state: ClrDatagridStateInterface;
    formVisible: boolean;
    createFLag: boolean;
    myElem: any;

    title = 'app';
    loggato = false;
    apiLoaded = false;
    apiFailed = false;
    apiReady = false;
    _eventi: Event[];
    _evento: Event;


    constructor(private service: EventsService, private apiLoaderService: ApiLoaderService) {


    }

    ngOnInit(): void {

        this.apiLoaderService.loadClient().then(        // carica le librerie di google
            result => {
                this.apiLoaded = true;
                return this.apiLoaderService.initClient();  // se non ci sono errori inizializza il client con i dati di accesso
            },
            err => {
                this.apiFailed = true;
            }
        ).then(result => {
            this.apiReady = true;
            this.setStato();
            this.apiLoaderService.sigInState();
        },
            err => {
                this.apiFailed = true;
            });

     }

     setStato() { this.apiLoaderService.statoSignIn().then( risp => this.loggato = risp ); }

    autorizza() { this.apiLoaderService.signIn().then(() => { this.setStato(); this.eventi(); }); }
    revoca() { this.apiLoaderService.signOut().then(() => { this.mostra = false; this.setStato();    }); }
    deleteEvent() { console.log('idEvent: ' + 
    this.selected.id); this.apiLoaderService.DeleteEvents(this.selected).then(() => this.eventi()); }

    test() { }
    eventi() {

        this.apiLoaderService.listUpcomingEvents().then(
            response => {
                const events = <Event[]>response.result.items;


                if (events.length > 0) {

                    for (let i = 0; i < events.length; i++) {
                        this.eventsList[i] = events[i];
                    }
                } else {
                    console.log('No upcoming events found.');
                }
                this.mostra = true;
                console.log(this.eventsList);
            },
            err => { console.log('devi autorizzarti per accedere'); }
        );
    }

}



