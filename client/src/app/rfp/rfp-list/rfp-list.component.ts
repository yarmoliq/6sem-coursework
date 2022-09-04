import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, Input, ViewChild, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { rfpStatusDictionary } from 'src/app/shared/enums/rfp-status.model';
import { Rfp } from 'src/app/shared/models/rfp.model';
import { User } from 'src/app/shared/models/user.model';
import { RfpDataService } from 'src/app/shared/services/rfp.data.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-rfp-list',
  templateUrl: './rfp-list.component.html',
  styleUrls: ['./rfp-list.component.scss']
})
export class RfpListComponent implements AfterViewInit, OnChanges {

  @Input() rfps: Rfp[];
  falshivka: Rfp[] = [];
  displayedColumns: string[] = ['created', 'customer', 'status', 'commodity', 'volume', 'location', 'controls'];
  dataSource = new MatTableDataSource(this.falshivka);
  @ViewChild(MatSort) sort: MatSort;

  rfpStatusDictionary = rfpStatusDictionary;

  currentUser: User | null;

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private readonly userServie: UserService,
    private readonly rfpDataService: RfpDataService,
  ) {
    this.currentUser = userServie.getUser();
  }

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.rfps);
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = (rfp, filterValue) => {
            filterValue = filterValue.trim().toLowerCase();
            return !!rfp.customer?.userName && rfp.customer?.userName.toLowerCase().includes(filterValue)
              || !!rfp.commodity && rfp.commodity.toLowerCase().includes(filterValue)
              || !!rfp.location && rfp.location.toLowerCase().includes(filterValue)
              // || !!rfp.status && rfpStatusDictionary.get(rfp.status).toLowerCase().includes(filterValue)
              || !!rfp.volume && rfp.volume.toString().includes(filterValue);
          };
  }

  announceSortChange(sortState: Sort) {
    console.log('sort applied');
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.rfps = changes.rfps.currentValue;
    this.dataSource = new MatTableDataSource(this.rfps);
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = (rfp, filterValue) => {
            filterValue = filterValue.trim().toLowerCase();
            return !!rfp.customer?.userName && rfp.customer?.userName.toLowerCase().includes(filterValue)
              || !!rfp.commodity && rfp.commodity.toLowerCase().includes(filterValue)
              || !!rfp.location && rfp.location.toLowerCase().includes(filterValue)
              // || !!rfp.status && rfpStatusDictionary.get(rfp.status).toLowerCase().includes(filterValue)
              || !!rfp.volume && rfp.volume.toString().includes(filterValue);
          };
  }

  onDeleteClick(rfp: Rfp): void {
    if (!rfp.id) {
      return;
    }
    const id: number = rfp.id;

    this.rfpDataService.delete(id).subscribe(deletedRfp => {
      if (deletedRfp !== undefined) {
        const index = this.dataSource.data.indexOf(deletedRfp);
        this.dataSource.data.splice(index, 1);
        this.dataSource._updateChangeSubscription();
      }
    });
  }

  applyFilter(filter: string) {
    this.dataSource.filter = filter;
  }
}
