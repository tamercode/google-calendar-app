import { Event } from '../events/events.model';
import {ClrDatagridComparatorInterface} from '@clr/angular';


export class DateStartComparator implements ClrDatagridComparatorInterface<Event> {
    compare(event1: Event, event2: Event) {
        if (event1.start.date && event2.start.date) {
            return (new Date(event1.start.date)).getTime() - (new Date(event2.start.date)).getTime();
            }
        if (event1.start.date && event2.start.dateTime) {
            return (new Date(event1.start.date)).getTime() - (new Date(event2.start.dateTime)).getTime();
        }
        if (event1.start.dateTime && event2.start.date) {
            return (new Date(event1.start.dateTime)).getTime() - (new Date(event2.start.date)).getTime();
        }
         if (event1.start.dateTime && event2.start.dateTime) {
            return (new Date(event1.start.dateTime)).getTime() - (new Date(event2.start.dateTime)).getTime();
        }
    }
}
