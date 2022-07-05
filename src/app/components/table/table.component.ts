import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  constructor() { }

  @Input() data;
  @Input() keys;

  @Output() editEventEmitter = new EventEmitter();
  @Output() rowClickEventEmitter = new EventEmitter();
  @Output() deleteEventEmitter = new EventEmitter();

  ngOnInit(): void {
    console.log(this.data);
  }

  rowClicked(row) {
    console.log(row);
    this.rowClickEventEmitter.emit(row);
  }

  editClicked(row) {
    this.editEventEmitter.emit(row);
  }

  deleteClicked(row) {
    this.deleteEventEmitter.emit(row);
  }
}
