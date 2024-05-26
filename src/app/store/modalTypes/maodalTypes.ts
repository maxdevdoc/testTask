interface TicketsPrice {
    currency: string;
    price: {
      cents: number;
      whole: number;
    };
    name: string;
  }
  
  interface Carrier {
    code: number;
    contacts: string;
    url: string;
    logo_svg: string | null;
    title: string;
    phone: string;
    codes: {
      icao: string | null;
      sirena: string;
      iata: string;
    };
    address: string;
    logo: string | null;
    email: string;
  }
  
  interface TransportSubtype {
    color: string;
    code: string;
    title: string;
  }
  
  interface Interval {
    density: string;
    end_time: string;
    begin_time: string;
  }
  
  interface Thread {
    uid: string;
    title: string;
    interval: Interval;
    number: string;
    short_title: string;
    thread_method_link: string;
    carrier: Carrier;
    transport_type: string;
    vehicle: string;
    transport_subtype: TransportSubtype | null;
    express_type: string | null;
  }
  
  interface Location {
    code: string;
    title: string;
    popular_title: string;
    short_title: string;
    transport_type: string;
    station_type: string;
    station_type_name: string;
    type: string;
  }
  
  interface TicketsInfo {
    et_marker: boolean;
    places: TicketsPrice[];
  }
  
  export interface Segment {
    arrival: string;
    from: Location;
    thread: Thread;
    departure_platform: string;
    departure: string;
    stops: string;
    departure_terminal: string | null;
    to: Location;
    has_transfers: boolean;
    tickets_info: TicketsInfo;
    duration: number;
    arrival_terminal: string;
    start_date: string;
    arrival_platform: string;
  }
  
  interface Pagination {
    total: number;
    limit: number;
    offset: number;
  }
  
  interface Search {
    date: string;
    to: Location;
    from: Location;
  }
  
  interface Data {
    pagination: Pagination;
    interval_segments: Segment[];
    segments: Segment[];
    search: Search;
  }
  
  export interface ResponseModel {
    data: Data;
  }
  