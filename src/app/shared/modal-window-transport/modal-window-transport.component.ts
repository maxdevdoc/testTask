import { Component, OnInit } from "@angular/core";
import { AsyncPipe, CommonModule, NgIf } from "@angular/common";
import { RouterModule } from "@angular/router";
import { Store } from "@ngrx/store";
import { selectSegment } from "../../store/app.selector";
import { Segment } from "../../store/modalTypes/maodalTypes";
import { closeModalWindowTranspor, clearModalWindowTransport } from "../../store/app.action";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-modal-window-transport",
  standalone: true,
  imports: [CommonModule, RouterModule, NgIf, AsyncPipe],
  templateUrl: "./modal-window-transport.component.html",
  styleUrls: ["./modal-window-transport.component.scss"],
})
export class ModalWindowTransportComponent implements OnInit {
  dataWithSemgentTransport$$: BehaviorSubject<any> = new BehaviorSubject<
    Segment[]
  >([]);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.select(selectSegment).subscribe((value) => {
      if (value && value.segments && value.segments) {
        this.dataWithSemgentTransport$$.next(value.segments);
      } else {
        this.dataWithSemgentTransport$$.next(null);
      }
    });
  }

  isValidDataResponse(data:Segment[]) {
    return data != null && data.length > 0 && data[0] !== null;
  }

  nothingFound(data:Segment[]){
    return (data === null) || (data.length === 0);
  }

  closeModal() {
    this.store.dispatch(closeModalWindowTranspor());
    this.store.dispatch(clearModalWindowTransport());
  }

  track(index: number, segments: Segment) {
    return segments;
  }
}
