import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { Router } from "@angular/router";
import {
  navigateToMapAction,
  navigateToPolygonPageAction,
  navigateToMainPageAction,
  getIataFromAction,
  getIataFromSuccessfullAction,
  getIataFromErrorAction,
  getIataToAction,
  getIataToSuccessfullAction,
  getIataToErrorAction,
  scheduleSuccessfullyAction,
  scheduleErrorAction,
} from "./app.action";
import { take, tap } from "rxjs/operators";
import { IataService } from "../service/get-IATA";
import { ScheduleService } from "../service/transport";
import { mergeMap, map, catchError } from "rxjs/operators";
import { of } from "rxjs";
import { Store } from "@ngrx/store";


@Injectable()
export class AppEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private iataService: IataService,
    private scheduleService: ScheduleService
  ) {}

  navigateToMap$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(navigateToMapAction),
        tap(() => this.router.navigate(["/map"]))
      ),
    { dispatch: false }
  );

  navigateToPolygonPage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(navigateToPolygonPageAction),
        tap(() => this.router.navigate(["/transport"]))
      ),
    { dispatch: false }
  );

  navigateToMainPage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(navigateToMainPageAction),
        tap(() => this.router.navigate([""]))
      ),
    { dispatch: false }
  );

  /////////////Request///////////////
  loadCodeFrom$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getIataFromAction),
      mergeMap(action =>
        this.iataService.getIata(action.city).pipe(
          map(response => {
            const cityCode = response[1]?.[0]?.[0];
            if (cityCode) {
              return getIataFromSuccessfullAction({ valueCode: cityCode });
            } else {
              throw new Error('City code not found');
            }
          }),
          catchError(error => of(getIataFromErrorAction({ error: error.message }))),
          take(1)
        )
      )
    )
  );

  loadCodeTo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getIataToAction),
      mergeMap(action =>
        this.iataService.getIata(action.city).pipe(
          map(response => {
            const cityCode = response[1]?.[0]?.[0];
            if (cityCode) {
              return getIataToSuccessfullAction({ valueCode: cityCode });
            } else {
              throw new Error('City code not found');
            }
          }),
          catchError(error => of(getIataToErrorAction({ error: error.message }))),
          take(1)
        )
      )
    )
  );



  loadSchedule$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getIataToSuccessfullAction),
      mergeMap((action) =>
        this.scheduleService.getSchedule().pipe(
          map((value) => {
            return scheduleSuccessfullyAction({ response: value })}),
          catchError((error) => of(scheduleErrorAction({ error: error }))),
          take(1)  
        )
      )
    )
  );
}