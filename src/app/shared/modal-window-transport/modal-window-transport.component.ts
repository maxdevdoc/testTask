import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { AsyncPipe, CommonModule, NgIf } from "@angular/common";
import { RouterModule } from "@angular/router";
import { Store } from "@ngrx/store";
import { selectSegment } from "../../store/app.selector";
import { Segment } from "../../store/modalTypes/maodalTypes";
import { closeModalWindowTranspor } from "../../store/app.action";
import { BehaviorSubject, Observable } from "rxjs";

@Component({
  selector: "app-modal-window-transport",
  standalone: true,
  imports: [CommonModule, RouterModule, NgIf, AsyncPipe],
  templateUrl: "./modal-window-transport.component.html",
  styleUrls: ["./modal-window-transport.component.scss"]
})
export class ModalWindowTransportComponent implements OnInit {

  dataWithSemgentTransport$: BehaviorSubject<Segment[]> = new BehaviorSubject<Segment[]>([]);

  constructor(private store: Store) {}

  ngOnInit(): void {


    const checkData = () => {
      setTimeout(() => {
        this.store.select(selectSegment).subscribe((value) => {
          this.dataWithSemgentTransport$.next(value);
        });
        console.log('----------------');
        console.log(this.dataWithSemgentTransport$.getValue());
        console.log('----------------');
        checkData(); // Рекурсивный вызов setTimeout для повторного выполнения каждые 2 секунды
      }, 2000);
    };

    checkData(); 
    
  }

  closeModal() {
    this.store.dispatch(closeModalWindowTranspor());
  }

  track(index: number, segments: Segment) {
    return segments;
  }
}
