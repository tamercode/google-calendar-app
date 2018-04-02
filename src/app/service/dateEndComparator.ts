import { Event } from '../events/events.model';
import {ClrDatagridComparatorInterface} from '@clr/angular';


export class DateEndComparator implements ClrDatagridComparatorInterface<Event> {
    compare(event1: Event, event2: Event) {
        if (event1.end.date && event2.end.date) {
            return (new Date(event1.end.date)).getTime() - (new Date(event2.end.date)).getTime();
            }
        if (event1.end.date && event2.end.dateTime) {
            return (new Date(event1.end.date)).getTime() - (new Date(event2.end.dateTime)).getTime();
        }
        if (event1.end.dateTime && event2.end.date) {
            return (new Date(event1.end.dateTime)).getTime() - (new Date(event2.end.date)).getTime();
        }
         if (event1.end.dateTime && event2.end.dateTime) {
            return (new Date(event1.end.dateTime)).getTime() - (new Date(event2.end.dateTime)).getTime();
        }
    }
}
