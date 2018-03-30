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
    selected: Event[] = [];
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
            this.apiLoaderService.primoSignIn();
            this.apiLoaderService.ascoltoSignIn();
            this.loggato = this.apiLoaderService.statoSignIn();
           // scontrolla se è stato effettuato l'accesso}
           console.log('pronta');
        },
            err => {
                this.apiFailed = true;
            });

     }



    autorizza() { this.apiLoaderService.signIn().then(() => {this.loggato = true; this.eventi(); }); }
    revoca() { this.apiLoaderService.signOut().then(() => {this.loggato = false; this.mostra = false; }); }

    test() { this.apiLoaderService.test(); }
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

    refresh(state: ClrDatagridStateInterface) {
        this.state = state;
        this.loading = true;
        const filters: { [prop: string]: any[] } = {};
        if (state.filters) {
            for (const filter of state.filters) {
                const { property, value } = <{ property: string, value: string }>filter;
                filters[property] = [value];
            }
        }
        this.service.filter(filters)
            .sort(<{ by: string, reverse: boolean }>state.sort)
            .fetch(state.page.from, state.page.size)
            .sendRequest().subscribe(arg => { this.eventsList = arg.body; this.total = parseInt(arg.headers.get('X-Total-Count'), 10); });

        this.selected.splice(0, this.selected.length); this.loading = false;
    }

    delete() {
        this.loading = true;
        this.service.deleteEvents(this.selected).subscribe(() => {
            this.selected.splice(0, 1);
            if (this.selected.length > 0) {
                this.delete();
            } else {
                this.refresh(this.state);
            }
        });
    }

    edit() {
        this.createFLag = false;
        this.copySelectedEvent = this.selected[0];
        this.showForm();
    }

    create() {

        const event = new Event;
        this.copySelectedEvent = event;
        this.createFLag = true;
        this.showForm();
    }

    save() {
        this.loading = true;
        if (this.createFLag) {
            console.log(this.copySelectedEvent);
            this.service.createEvent(this.copySelectedEvent).subscribe(arg => { this.refresh(this.state); this.hideForm(); });
        } else {
            this.service.updateEvent(this.selected[0]).subscribe(arg => {
                this.refresh(this.state);
                this.hideForm(); this.selected.splice(0, 1);
            });
        }
    }

    showForm() { this.formVisible = true; }
    hideForm() { this.formVisible = false; }

}



