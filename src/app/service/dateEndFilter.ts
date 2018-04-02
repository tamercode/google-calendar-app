import {ClrDatagridStringFilterInterface} from '@clr/angular';
import { Event } from '../events/events.model';
import { addZero, formatDateToStr } from '../../app/utils';



export class DateEndFilter implements ClrDatagridStringFilterInterface<Event> {
    accepts(event: Event, search: string): boolean {

        if (event.end.date) {

            return formatDateToStr((new Date(event.end.date))).indexOf(search) >= 0;
            }
        if (event.end.dateTime) {
            return formatDateToStr((new Date(event.end.dateTime))).indexOf(search) >= 0;
        }
    }
}
