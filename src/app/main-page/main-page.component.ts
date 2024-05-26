import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {navigateToMapAction, navigateToPolygonPageAction} from '../store/app.action'

@Component({
  selector: 'main-page',
  standalone: true,
  imports: [],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainComponent {
  constructor(
    private store: Store
  ) {}

  routePolygonPage(){
    this.store.dispatch(navigateToMapAction());    
  }

  routeMapPage(){
    this.store.dispatch(navigateToPolygonPageAction());
  }
}
