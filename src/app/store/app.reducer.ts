import { Action, createReducer, on } from "@ngrx/store";
import {
  setFromForScheduleAction,
  setTransportForScheduleAction,
  setToForScheduleAction,
  setDateForScheduleAction, 
  getIataFromSuccessfullAction,
  getIataToSuccessfullAction,
  scheduleSuccessfullyAction,
  openModalWindowTranspor,
  closeModalWindowTranspor
} from "./app.action";
import { appStore, initialBookingState } from "./app.state";

const appReducer = createReducer(
  initialBookingState,
  on(setFromForScheduleAction, (state, { from }) => ({
    ...state,
    from,
  })),

  on(setToForScheduleAction, (state, { to }) => ({
    ...state,
    to,
  })),

  on(setTransportForScheduleAction, (state, { transport }) => ({
    ...state,
    transport,
  })),

  on(getIataFromSuccessfullAction, (state, { valueCode }) => ({
    ...state,
    fromCode: valueCode,
  })),

  on(getIataToSuccessfullAction, (state, { valueCode }) => ({
    ...state,
    toCode: valueCode,
  })),

  on(setDateForScheduleAction, (state, { date }) => ({
    ...state,
    date: date,
  })),

  on(scheduleSuccessfullyAction, (state, { response }) => ({
    ...state,
    responseTransportState: response,
  })),

  on(openModalWindowTranspor, (state) => ({
    ...state, 
    stateModalWindowTransport: true
  })),

  on(closeModalWindowTranspor, (state) => ({
    ...state, 
    stateModalWindowTransport: false
  })),

);

export function reducer(state: appStore | undefined, action: Action) {
  return appReducer(state, action);
}
