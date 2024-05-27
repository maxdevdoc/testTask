import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatIconModule } from "@angular/material/icon";
import { AsyncPipe, NgFor } from "@angular/common";
import { HeaderComponent } from "../shared/header/header.component";
import { Store } from "@ngrx/store";
import { MatSnackBar } from '@angular/material/snack-bar';

import {
  setFromForScheduleAction,
  setTransportForScheduleAction,
  setToForScheduleAction,
  setDateForScheduleAction,
  getIataToAction,
  getIataFromAction,
  openModalWindowTranspor,
} from "../store/app.action";
import { ModalWindowTransportComponent } from "../shared/modal-window-transport/modal-window-transport.component";
import { Observable } from "rxjs";
import { selectWindowTransport } from "../store/app.selector";

@Component({
  selector: "transport-schedule-page",
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    NgFor,
    MatIconModule,
    HeaderComponent,
    ModalWindowTransportComponent,
    AsyncPipe,
  ],
  templateUrl: "./transport-schedule.component.html",
  styleUrl: "./transport-schedule.component.scss",
})
export class TransportScheduleComponent implements OnInit {
  bookingForm!: FormGroup;
  activeButton: string = "any";
  stateModalTransport!: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private formBuilder: FormBuilder,
    private store: Store,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.stateModalTransport = this.store.select(selectWindowTransport);
  }

  createForm() {
    this.bookingForm = this.formBuilder.group({
      from: ["", [Validators.required, Validators.maxLength(20)]],
      to: ["", [Validators.required, Validators.maxLength(20)]],
      date: ["", [Validators.required, Validators.maxLength(50)]],
    });
  }

  setTomorrow() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    this.bookingForm.get('date')?.setValue(tomorrow.toISOString().split('T')[0]);
  }

  
  setDayAfterTomorrow() {
    const today = new Date();
    const dayAfterTomorrow = new Date(today);
    dayAfterTomorrow.setDate(today.getDate() + 2);
    this.bookingForm.get('date')?.setValue(dayAfterTomorrow.toISOString().split('T')[0]);
  }

  setTransport(type: string) {
    this.activeButton = type;
    this.store.dispatch(
      setTransportForScheduleAction({ transport: this.activeButton })
    );
  }

  apply() {
    if (this.bookingForm.valid) {
    this.store.dispatch(
      getIataFromAction({ city: this.bookingForm.value.from })
    );
    this.store.dispatch(getIataToAction({ city: this.bookingForm.value.to }));
    this.store.dispatch(openModalWindowTranspor());
  }
  }

  setFromChanged() {
    this.store.dispatch(
      setFromForScheduleAction({ from: this.bookingForm.value.from })
    );
  }
  setToChanged() {
    this.store.dispatch(
      setToForScheduleAction({ to: this.bookingForm.value.to })
    );
  }
  setDateChanged() {
    this.store.dispatch(
      setDateForScheduleAction({ date: this.bookingForm.value.date })
    );
  }
  setTrasportFlight() {
    this.setTransport("plane");
  }
  setTrasportTrain() {
    this.setTransport("train");
  }
  setTrasportTram() {
    this.setTransport("suburban");
  }
  setTrasportBus() {
    this.setTransport("bus");
  }
  setTrasportAny() {
    this.setTransport("");
  }

  alertNotValidForm() {
    this.snackBar.open('Форма недействительна', 'Закрыть', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  onSearch(): void {
    const formValue = this.bookingForm.value;
    const params = {
      from: formValue.from,
      to: formValue.to,
      date: formValue.date.toISOString().split("T")[0],
      transportType: formValue.transportType,
    };
  }
}
