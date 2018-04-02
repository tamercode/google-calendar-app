import {ClrDatagridStringFilterInterface} from '@clr/angular';
import { Event } from '../events/events.model';
import { addZero, formatDateToStr } from '../../app/utils';



export class DateStartFilter implements ClrDatagridStringFilterInterface<Event> {
    accepts(event: Event, search: string): boolean {

        if (event.start.date) {

            return formatDateToStr((new Date(event.start.date))).indexOf(search) >= 0;
            }
        if (event.start.dateTime) {
            return formatDateToStr((new Date(event.start.dateTime))).indexOf(search) >= 0;
        }
    }
}
