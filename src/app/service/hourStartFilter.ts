import { ClrDatagridStringFilterInterface } from '@clr/angular';
import { Event } from '../events/events.model';
import { addZero, formatDateToStr } from '../../app/utils';



export class HourStartFilter implements ClrDatagridStringFilterInterface<Event> {
    accepts(event: Event, search: string): boolean {

        if (event.start.dateTime) {
            console.log(event.start.dateTime.toString().slice(11, 16));
            return event.start.dateTime.toString().slice(11, 16).indexOf(search) >= 0;
        }
    }
}
