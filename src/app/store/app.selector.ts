import { createFeatureSelector, createSelector } from "@ngrx/store"; 
import { appStore } from "./app.state"; 
import { Observable, map, of } from "rxjs";
import { Segment } from "./modalTypes/maodalTypes";
 
// Используйте createFeatureSelector для выбора feature состояния 
export const selectFeature = createFeatureSelector<appStore>('feature'); 
 
export const selectFrom = createSelector( 
  selectFeature, 
  (state: appStore) => state.from 
); 
 
export const selectTo = createSelector( 
  selectFeature, 
  (state: appStore) => state.to 
); 
 
export const selectFromCode = createSelector( 
  selectFeature, 
  (state: appStore) => state.fromCode 
); 
 
export const selectToCode = createSelector( 
  selectFeature, 
  (state: appStore) => state.toCode 
); 

export const selectWindowTransport = createSelector( 
  selectFeature, 
  (state: appStore) => state.stateModalWindowTransport 
); 

export const selectSegment = createSelector(
  selectFeature, 
  (state: appStore) => state.responseTransportState);

export const selectDataForApiSchedule = createSelector( 
  selectFeature, 
  (state: appStore) => ({ 
    fromCode: state.fromCode, 
    toCode: state.toCode, 
    from: state.from,
    to: state.to,
    transportType: state.transportTypes, 
    date: state.date, 
  }) 
);