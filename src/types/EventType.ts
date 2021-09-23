/* eslint-disable camelcase */
export interface IEvent{
    event_id: string | number;
    start: string;
    end: string;
    title: string;
    group: string;
    creator: string;
    location : string;
    course:string;
    linkedEvents?:string;
}
