import { Routes } from '@angular/router';
import { MainComponent } from './main-page/main-page.component';
import { MapComponent } from './map-page/map-page.component';
import { TransportScheduleComponent } from './transport-schedule/transport-schedule.component'

export const routes: Routes = [
    { path: '', component: MainComponent },
    { path: 'map', component: MapComponent },
    { path: 'transport', component: TransportScheduleComponent }
];
