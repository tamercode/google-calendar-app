import { Event } from '../events/events.model';
import {ClrDatagridComparatorInterface} from '@clr/angular';


export class HourStartComparator implements ClrDatagridComparatorInterface<Event> {
    compare(event1: Event, event2: Event) {

        if (event1.start.dateTime && event2.start.dateTime) {

            console.log('evento1: ' + (((new Date(event1.start.dateTime)).getHours(), (new Date(event1.start.dateTime)).getMinutes()) * 100)
            + 'evento2: ' + (((new Date(event2.start.dateTime)).getHours(), (new Date(event2.start.dateTime)).getMinutes()) * 100)
            );

            return (((new Date(event1.start.dateTime)).getHours() * 60) + (new Date(event1.start.dateTime)).getMinutes())
             - ((((new Date(event2.start.dateTime)).getHours() * 60) + (new Date(event2.start.dateTime)).getMinutes()));
            }
        if (event1.start.dateTime && !event2.start.dateTime) {
            return -1;
        }
        if (!event1.start.dateTime && event2.start.dateTime) {
            return 1;
        }

        if (!event1.start.dateTime && !event2.start.dateTime) {
            return 0;
        }

    }
}
