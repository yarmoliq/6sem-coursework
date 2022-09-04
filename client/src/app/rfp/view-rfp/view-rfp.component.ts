import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { rfpStatusDictionary } from 'src/app/shared/enums/rfp-status.model';
import { OfferDetails } from 'src/app/shared/models/offer-details.model';
import { Rfp } from 'src/app/shared/models/rfp.model';
import { UserRole } from 'src/app/shared/models/user-role-for-note.model';
import { User } from 'src/app/shared/models/user.model';
import { RfpDataService } from 'src/app/shared/services/rfp.data.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-view-rfp',
  templateUrl: './view-rfp.component.html',
  styleUrls: ['./view-rfp.component.scss']
})
export class ViewRfpComponent implements OnInit {

  rfp: Rfp;
  currentUser: User | null;

  panelOpenState = false;
  enableCreateOfferPanel = false;
  disableAllEditing = true;
  enableEditComment = false;
  rfpStatusDictionary = rfpStatusDictionary;
  newCommentText: string;

  constructor(
    private readonly rfpService: RfpDataService,
    private readonly route: ActivatedRoute,
    private readonly userService: UserService,
  ) {
    this.currentUser = userService.getUser();
    this.enableCreateOfferPanel = this.currentUser?.role === UserRole.supplier;
    this.enableEditComment = this.currentUser?.role === UserRole.customer;
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params: any) => {
      const id: number = params.params.id;
      this.rfpService.getById(id).subscribe((rfp) => {
        this.rfp = rfp;
        console.log(rfp);
        this.disableAllEditing = this.rfp.dealSheet !== null;
        this.newCommentText = rfp.comments;
        console.log(this.currentUser);
      });
    });
  }

  togglePanel() {
      this.panelOpenState = !this.panelOpenState;
  }

  addOfferToList(offer: OfferDetails) {
    this.rfp.offers?.push(offer);
    location.reload();
  }

  onUpdatedCommentClick() {
    const rfp = {...this.rfp};
    rfp.comments = this.newCommentText;
    this.rfpService.update(rfp).subscribe(rfpResponse => {
      if (rfpResponse !== undefined) {
        this.rfp = rfpResponse;
      }
    });
  }
}
