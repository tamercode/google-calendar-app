import { ClrDatagridStringFilterInterface } from '@clr/angular';
import { Event } from '../events/events.model';
import { addZero, formatDateToStr } from '../../app/utils';



export class HourEndFilter implements ClrDatagridStringFilterInterface<Event> {
    accepts(event: Event, search: string): boolean {

        if (event.end.dateTime) {
            console.log(event.end.dateTime.toString().slice(11, 16));
            return event.end.dateTime.toString().slice(11, 16).indexOf(search) >= 0;
        }
    }
}
