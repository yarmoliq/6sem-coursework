import { Component, OnInit } from '@angular/core';
import { Rfp } from '../shared/models/rfp.model';
import { UserRole } from '../shared/models/user-role-for-note.model';
import { User } from '../shared/models/user.model';
import { RfpDataService } from '../shared/services/rfp.data.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-rfp',
  templateUrl: './rfp.component.html',
  styleUrls: ['./rfp.component.scss']
})
export class RfpComponent implements OnInit {

  rfps: Rfp[] = [];
  currentUser: User | null;

  showCreateRfpBtn: boolean;

  constructor(
    private readonly rfpDataService: RfpDataService,
    private readonly userService: UserService,
  ) {
    this.currentUser = userService.getUser();
    console.log(this.currentUser);
    this.showCreateRfpBtn = this.currentUser?.role === UserRole.customer;
  }

  ngOnInit(): void {
    this.rfpDataService.getAll().subscribe((rfps) => {
      this.rfps = rfps;
    });
  }

}
