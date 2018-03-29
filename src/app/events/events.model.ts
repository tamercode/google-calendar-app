import { Data } from '@angular/router/src/config';

export class Event {
    kind: 'calendar#event';
  etag: string;
  id: string;
  status: string;
  htmlLink: string;
  created: Date;
  updated: Date;
  summary: string;
  description: string;
  location: string;
  colorId: string;
  creator: {
    id: string,
    email: string,
    displayName: string,
    self: boolean
  };
  organizer: {
    id: string,
    email: string,
    displayName: string,
    self: boolean
  };
  start: {
    date: Date,
    dateTime: Date,
    timeZone: string
  };
  end: {
    date: Date,
    dateTime: Date,
    timeZone: string
  };
  endTimeUnspecified: boolean;
  recurrence: [
    string
  ];
  recurringEventId: string;
  originalStartTime: {
    date: Date,
    dateTime: Date,
    timeZone: string
  };
  transparency: string;
  visibility: string;
  iCalUID: string;
  sequence: number;
  attendees: [
    {
      id: string,
      email: string,
      displayName: string,
      organizer: boolean,
      self: boolean,
      resource: boolean,
      optional: boolean,
      responseStatus: string,
      comment: string,
      additionalGuests: number
    }
  ];
  attendeesOmitted: boolean;
  extendedProperties: {
    private: (key) => string,
    shared: (key) => string
  };
  hangoutLink: string;
  conferenceData: {
    createRequest: {
      requestId: string,
      conferenceSolutionKey: {
        type: string
      },
      status: {
        statusCode: string
      }
    };
    entryPoints: [
      {
        entryPointType: string,
        uri: string,
        label: string,
        pin: string,
        accessCode: string,
        meetingCode: string,
        passcode: string,
        password: string
      }
    ];
    conferenceSolution: {
      key: {
        type: string
      },
      name: string,
      iconUri: string
    },
    conferenceId: string,
    signature: string,
    notes: string
  };
  gadget: {
    type: string,
    title: string,
    link: string,
    iconLink: string,
    width: number,
    height: number,
    display: string,
    preferences: (key) => string
  };
  anyoneCanAddSelf: boolean;
  guestsCanInviteOthers: boolean;
  guestsCanModify: boolean;
  guestsCanSeeOtherGuests: boolean;
  privateCopy: boolean;
  locked: boolean;
  reminders: {
    useDefault: boolean,
    overrides: [
      {
        method: string,
        minutes: number
      }
    ]
  };
  source: {
    url: string,
    title: string
  };
  attachments: [
    {
      fileUrl: string,
      title: string,
      mimeType: string,
      iconLink: string,
      fileId: string
    }
  ];

    constructor() {

  this.id = null;
  this.status = null;
  this.htmlLink = null;
  this.created = null;
  this.updated = null;
  this.summary = null;
  this.description = null;
  this.location = null;
  this.colorId = null;
  this.creator = {
    id: null,
    email: null,
    displayName: null,
    self: null
  };
  this.organizer = {
    id: null,
    email: null,
    displayName: null,
    self: null
  };
  this.start = {
    date: null,
    dateTime: null,
    timeZone: null
  };
  this.end = {
    date: null,
    dateTime: null,
    timeZone: null
  };
  this.endTimeUnspecified = null;
  this.recurrence = [
    null
  ];
  this.recurringEventId = null;
  this.originalStartTime = {
    date: null,
    dateTime: null,
    timeZone: null
  },
  this.transparency = null;
  this.visibility = null;
  this.iCalUID = null;
  this.sequence = null;
  this.attendees = [
    {
      id: null,
      email: null,
      displayName: null,
      organizer: null,
      self: null,
      resource: null,
      optional: null,
      responseStatus: null,
      comment: null,
      additionalGuests: null
    }
  ];
  this.attendeesOmitted = null;
  this.extendedProperties = {
    private: (key: string) => null,
    shared: (key: string) => null
  };
  this.hangoutLink = null;
  this.conferenceData = {
    createRequest: {
      requestId: null,
      conferenceSolutionKey: {
        type: null
      },
      status: {
        statusCode: null
      }
    },
    entryPoints: [
      {
        entryPointType: null,
        uri: null,
        label: null,
        pin: null,
        accessCode: null,
        meetingCode: null,
        passcode: null,
        password: null
      }
    ],
    conferenceSolution: {
      key: {
        type: null
      },
      name: null,
      iconUri: null
    },
    conferenceId: null,
    signature: null,
    notes: null
  };
  this.gadget = {
    type: null,
    title: null,
    link: null,
    iconLink: null,
    width: null,
    height: null,
    display: null,
    preferences: (key: string) => null
  };
  this.anyoneCanAddSelf = null;
  this.guestsCanInviteOthers = null;
  this.guestsCanModify = null;
  this.guestsCanSeeOtherGuests = null;
  this.privateCopy = null;
  this.locked = null;
  this.reminders = {
    useDefault: null,
    overrides: [
      {
        method: null,
        minutes: null
      }
    ]
  };
  this.source = {
    url: null,
    title: null
  };
  this.attachments = [
    {
      fileUrl: null,
      title: null,
      mimeType: null,
      iconLink: null,
      fileId: null
    }
  ];

    }

    setStartDate (_date: Date) { this.start = {
        date: _date,
        dateTime: null,
        timeZone: null
      }; }



}
