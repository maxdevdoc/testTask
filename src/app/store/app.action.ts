import { createAction, props } from "@ngrx/store";
import { ResponseModel } from "./modalTypes/maodalTypes";

///////////////////////////////////////////////
export const navigateToMapAction = createAction("[Navigation] Navigate to Map");

export const navigateToPolygonPageAction = createAction(
  "[Navigation] Navigate to polygon Page"
);

export const navigateToMainPageAction = createAction(
  "[Navigation] Navigate to Main Page"
);
///////////////////////////////////////////////
export const openModalWindowTranspor = createAction(
  '[Schedule page] open modal window transport'
);

export const closeModalWindowTranspor = createAction(
  '[Schedule page] close modal window transport'
)
///////////////////////////////////////////////
export const setFromForScheduleAction = createAction(
  "[Schedule page] Address from where is set",
  props<{ from: string }>()
);

export const setToForScheduleAction = createAction(
  "[Schedule page] Address is set to",
  props<{ to: string }>()
);

export const setDateForScheduleAction = createAction(
  "[Schedule page] Date set when",
  props<{ date: string }>()
);

export const setTransportForScheduleAction = createAction(
  "[Schedule page] Transport type set",
  props<{ transport: string }>()
);
/////////////
export const getScheduleAction = createAction(
  "[Schedule page] Get the schedule"
);

export const scheduleSuccessfullyAction = createAction(
  "[Schedule page] Schedule received successfully",
  props<{ response: ResponseModel }>()
);

export const scheduleErrorAction = createAction(
  "[Schedule page] Schedule received error",
  props<{ error: any }>()
);
/////////////
export const getIataFromAction = createAction(
  "[API IATA] get iata from code",
  props<{ city: string }>()
);

export const getIataFromSuccessfullAction = createAction(
  "[API IATA] get data from success",
  props<{ valueCode: string }>()
);

export const getIataFromErrorAction = createAction(
  "[API IATA] get data error",
  props<{ error: string }>()
);

/////////////

export const getIataToAction = createAction(
  "[API IATA] get iata to code",
  props<{ city: string }>()
);

export const getIataToSuccessfullAction = createAction(
  "[API IATA] get data to success",
  props<{ valueCode: string }>()
);

export const getIataToErrorAction = createAction(
  "[API IATA] get data error",
  props<{ error: string }>()
);