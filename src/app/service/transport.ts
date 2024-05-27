import { Injectable } from "@angular/core"; 
import { HttpClient } from "@angular/common/http"; 
import { Observable, BehaviorSubject, combineLatest } from "rxjs"; 
import { map, switchMap, tap } from "rxjs/operators"; 
import { IataService } from "./get-IATA"; 
import { Store } from "@ngrx/store"; 
import { selectDataForApiSchedule } from "../store/app.selector"; 
 
@Injectable({ 
  providedIn: "root", 
}) 
export class ScheduleService { 
  private apiKey = "4d177e45-c393-407a-a87c-14121328cdcf"; 
  private fromCode$ = new BehaviorSubject<string>(''); 
  private toCode$ = new BehaviorSubject<string>(''); 
  private transport$ = new BehaviorSubject<string>('Any'); 
  private date$ = new BehaviorSubject<string>(''); 
 
  constructor( 
    private http: HttpClient, 
    private store: Store 
  ) { 
    this.store.select(selectDataForApiSchedule).subscribe((value) => { 
      this.fromCode$.next(value.fromCode); 
      this.toCode$.next(value.toCode); 
      this.transport$.next(value.transportType); 
      this.date$.next(value.date); 
    }); 
  } 
 
  getSchedule(): Observable<any> { 
    console.log('work service get schedule')
    return combineLatest([this.fromCode$, this.toCode$, this.transport$, this.date$]).pipe( 
      tap(response => {
        console.log('Response:', JSON.stringify(response));
      }),
      map(([fromCode, toCode, transport, date]) => { 
        if (fromCode && toCode && date) { 
          // const apiUrl = `https://api.rasp.yandex.net/v3.0/search/?apikey=${this.apiKey}&format=json&from=${fromCode}&transport_types=${transport}&to=${toCode}&lang=ru_RU&page=1&date=${date}`; 
          const apiUrl = `/api2/v3.0/search/?apikey=${this.apiKey}&format=json&from=${fromCode}&transport_types=${transport}&to=${toCode}&lang=ru_RU&page=1&date=${date}`; 
          return this.http.get<any>(apiUrl).pipe( 
            map((response) => response) 
          ); 
        } else { 
          return new Observable(observer => { 
            observer.next(null); 
            observer.complete(); 
          }); 
        } 
      }) 
    ).pipe( 
      switchMap(scheduleObservable => scheduleObservable) 
    ); 
  } 
}