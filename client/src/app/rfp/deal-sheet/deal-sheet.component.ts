import {  Component, Input, OnInit } from '@angular/core';
import { DealSheet } from 'src/app/shared/models/dealSheet.model';
import * as saveAs from 'file-saver';

@Component({
  selector: 'app-deal-sheet',
  templateUrl: './deal-sheet.component.html',
  styleUrls: ['./deal-sheet.component.scss']
})
export class DealSheetComponent implements OnInit {

  @Input() dealSheet: DealSheet;

  constructor() { }

  ngOnInit(): void {
  }

  downloadDealSheet() {
    const blob = new Blob([JSON.stringify(this.dealSheet)], { type: 'text/plain' });
    saveAs(blob, 'dealSheet.json');
  }
}
