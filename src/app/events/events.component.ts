import { Component, OnInit, AfterViewInit, OnChanges, SimpleChange, Input, QueryList, ViewChildren, ElementRef } from '@angular/core';
import { Event } from './events.model';
import { addZero, formatDateToStr } from '../../app/utils';
import { EventsService } from './events.service';
import { ApiLoaderService } from '../service/api-loader-service';
import { DateStartFilter } from '../service/dateStartFilter';
import { DateStartComparator } from '../service/dateStartComparator';
import { DateEndFilter } from '../service/dateEndFilter';
import { DateEndComparator } from '../service/dateEndComparator';
import { HourStartFilter } from '../service/hourStartFilter';
import { HourStartComparator } from '../service/hourStartComparator';
import { HourEndFilter } from '../service/hourEndFilter';
import { HourEndComparator } from '../service/hourEndComparator';


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

    private dateFilterStart = new DateStartFilter();
    private dateComparatorStart = new DateStartComparator();
    private dateFilterEnd = new DateEndFilter();
    private dateComparatorEnd = new DateEndComparator();
    private hourFilterStart = new HourStartFilter();
    private hourComparatorStart = new HourStartComparator();
    private hourFilterEnd = new HourEndFilter();
    private hourComparatorEnd = new HourEndComparator();
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
    syncToken = null;
    pageToken = null;
    loggato = false;
    apiLoaded = false;
    apiFailed = false;
    apiReady = false;
    _eventi: Event[];
    _evento: Event;
    timeMin = '2018-04-02T15:31:47.031Z';
    timeMax: Date = null;
    maxResults = null;
    listParameter: {
        'calendarId': '',
        'timeMin': String,
        'timeMax': Date,
        'showDeleted': boolean,
        'singleEvents': boolean,
        'maxResults': number,
        'orderBy': string

    } = {
            'calendarId': '',
            'timeMin': this.timeMin,
            'timeMax': null,
            'showDeleted': false,
            'singleEvents': true,
            'maxResults': 30,
            'orderBy': 'startTime'
        };
    listParameter1 = {
        'calendarId': 'primary',
        'timeMin': null,
        'singleEvents': true,
        'maxResults': 30,
        'syncToken': null,
        'pageToken': null
    };


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
            this.apiLoaderService.statoSignIn().then(risp => {
                this.loggato = risp;
                /*  if (risp) {
                     this.eventi();
                 } */
            });
            this.apiLoaderService.sigInState();
        },
            err => {
                this.apiFailed = true;
            });
    }

    test() { console.log(this.eventsList); }

    pipe(date: Date) {

        return formatDateToStr(date);

    }

    setStato() { this.apiLoaderService.statoSignIn().then(risp => this.loggato = risp); }

    autorizza() { this.apiLoaderService.signIn().then(() => { this.setStato(); this.eventi(this.listParameter); }); }
    revoca() { this.apiLoaderService.signOut().then(() => { this.mostra = false; this.setStato(); }); }
    deleteEvent() {
        console.log('idEvent: ' +
            this.selected.id); this.apiLoaderService.DeleteEvents(this.selected).then(() => this.eventi(this.listParameter));
    }

    tastoEventi() { this.eventi1(this.listParameter1); }

    eventi(list) {

        //  list.timeMin = this.timeMin.toISOString();
        if (this.timeMax) { list.timeMax = this.timeMax.toISOString(); } else { list.timeMax = null; }
        if (this.maxResults) { list.maxResults = this.maxResults; } else { list.maxResults = 30; }

        this.apiLoaderService.listUpcomingEvents(list).then(
            response => {

                const events = <Event[]>response.result.items;
                console.log(events);
                // this.maxResults = null;
                this.eventsList = [];

                if (events.length > 0) {

                    for (let i = 0; i < events.length; i++) {
                        this.eventsList[i] = events[i];
                    }
                } else {
                    console.log('No upcoming events found.');
                }
                this.mostra = true;
            },
            err => { console.log('devi autorizzarti per accedere'); }
        );
    }

    syncEvent(event) {



       if (this.eventsList.length === 0) { this.eventsList.push(event); return; }

        for (let e = 0; e <= this.eventsList.length - 1; e++) {

                // inserire if per controllare lo status e fare lo splice su l'indice dell'elemento

                if (this.eventsList[e].id === event.id) {

                    if (event.status === 'cancelled') {

                        this.eventsList.splice(e, 1); return;

                    } else { this.eventsList[e] = event; return; }

                }


                if ((this.eventsList[e] !== event.id) && (e === this.eventsList.length - 1)) { this.eventsList.push(event); return; }

            }

        }





    async eventi1(list1) {

        console.log('ingresso: ' + this.syncToken);
        if (!this.syncToken) {
            console.log('Performing full sync.');
            list1.timeMin = (new Date()).toISOString();
        } else {
            list1.timeMin = null;
            console.log('Performing incremental sync.');
            list1.syncToken = this.syncToken;
        }

        let resp = null;
        let pageToken = null;

        do {
            list1.pageToken = pageToken;

            try {
                await this.apiLoaderService.listUpcomingEvents1(list1).then(r => { resp = r; },
                    er => { console.log('err' + er.body); });
            } catch (e) {

                console.log('catch');
                if (e.getStatusCode() === 410) {
                    // A 410 status code, "Gone", indicates that the sync token is invalid.
                    console.log('Invalid sync token, clearing event store and re-syncing.');
                    this.syncToken = null;
                    this.pageToken = null;
                    this.eventi1(this.listParameter1);
                } else { console.log('throw'); throw e; }
            }
            // console.log('risp1' + resp.result.items.length);
            if (resp.result.items.length > 0) {
                for (let e = 0; e <= resp.result.items.length - 1; e++) {
                  await  this.syncEvent(resp.result.items[e]);
                }
            } else { console.log('No new events to sync.'); }


            /* if (resp.result.nextPageToken === undefined) {
                console.log('pageToken: ' + pageToken);
                console.log('syncToken: ' + resp.result.nextSyncToken);
                this.syncToken = pageToken;
            } */

            pageToken = resp.result.nextPageToken;

        } while (pageToken !== undefined);
        console.log('risposta: ' + resp.body);
        this.syncToken = resp.result.nextSyncToken;
        console.log('syncToken1: ' + resp.result.nextSyncToken);
        console.log('Sync complete.');


    }


    edit() { }

}



