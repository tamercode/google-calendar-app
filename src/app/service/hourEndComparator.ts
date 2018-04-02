import { Event } from '../events/events.model';
import {ClrDatagridComparatorInterface} from '@clr/angular';


export class HourEndComparator implements ClrDatagridComparatorInterface<Event> {
    compare(event1: Event, event2: Event) {

        if (event1.end.dateTime && event2.end.dateTime) {

            console.log('evento1: ' + (((new Date(event1.end.dateTime)).getHours(), (new Date(event1.end.dateTime)).getMinutes()) * 100)
            + 'evento2: ' + (((new Date(event2.end.dateTime)).getHours(), (new Date(event2.end.dateTime)).getMinutes()) * 100)
            );

            return (((new Date(event1.end.dateTime)).getHours() * 60) + (new Date(event1.end.dateTime)).getMinutes())
             - ((((new Date(event2.end.dateTime)).getHours() * 60) + (new Date(event2.end.dateTime)).getMinutes()));
            }
        if (event1.end.dateTime && !event2.end.dateTime) {
            return -1;
        }
        if (!event1.end.dateTime && event2.end.dateTime) {
            return 1;
        }

        if (!event1.end.dateTime && !event2.end.dateTime) {
            return 0;
        }

    }
}
