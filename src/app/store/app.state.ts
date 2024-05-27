import { ResponseModel } from "./modalTypes/maodalTypes";

export interface appStore {
    from: string,
    to: string,
    date: string,
    transportTypes: string,
    fromCode: string,
    toCode: string,
    stateModalWindowTransport: boolean,
    responseTransportState: ResponseModel, 
    

}
export const initialBookingState: appStore = {
  from: '',
  to: '',
  date: '',
  transportTypes: '',
  fromCode: '',
  toCode: '',
  stateModalWindowTransport: false, 
  responseTransportState: {
      pagination: {
        total: 0,
        limit: 0,
        offset: 0,
      },
      interval_segments: [],
      segments: [null],
      search: {
        date: '',
        to: {
          code: '',
          title: '',
          popular_title: '',
          short_title: '',
          transport_type: '',
          station_type: '',
          station_type_name: '',
          type: '',
        },
        from: {
          code: '',
          title: '',
          popular_title: '',
          short_title: '',
          transport_type: '',
          station_type: '',
          station_type_name: '',
          type: '',
        },
      },
    },
};
