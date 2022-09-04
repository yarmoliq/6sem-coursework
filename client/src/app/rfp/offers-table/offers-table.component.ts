import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { OfferDetails } from 'src/app/shared/models/offer-details.model';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';
import { OfferDataService } from 'src/app/shared/services/offer.data.service';
import { DealSheetDataService } from 'src/app/shared/services/deal-sheet.data.service';

@Component({
  selector: 'app-offers-table',
  templateUrl: './offers-table.component.html',
  styleUrls: ['./offers-table.component.scss']
})
export class OffersTableComponent implements AfterViewInit {

  @Input() offers: OfferDetails[];
  falshivka: OfferDetails[] = [];

  displayedColumns: string[] = ['created', 'volume', 'rate', 'location', 'controls', 'comments'];
  dataSource = new MatTableDataSource(this.falshivka);

  currentUser: User | null;
  @Input() customer: User | null;
  @Input() disableAllEditing: boolean;

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private readonly userService: UserService,
    private readonly offerDataService: OfferDataService,
    private readonly dealSheetDataService: DealSheetDataService,
  ) {
    this.currentUser = userService.getUser();
  }

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.offers);
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  onOfferDeleteClick(offer: OfferDetails) {
    if (offer.id === undefined) {
      return;
    }
    const id: number = offer.id;
    this.offerDataService.delete(offer.id).subscribe(resp => {
      location.reload();
    });
  }

  onAcceptOfferClick(offer: OfferDetails) {
    if(offer.id) {
      this.dealSheetDataService.create(offer.id).subscribe(resp => {
        location.reload();
      });
    }
  }
}
