import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OfferDetails } from 'src/app/shared/models/offer-details.model';
import { OfferDataService } from 'src/app/shared/services/offer.data.service';

@Component({
  selector: 'app-offer-create',
  templateUrl: './offer-create.component.html',
  styleUrls: ['./offer-create.component.scss']
})
export class OfferCreateComponent implements OnInit {

  public volume: number;
  public rate: number;
  public location: string;
  public comments: string;

  @Input() rfpId: number;
  @Output() createOfferEvent = new EventEmitter<OfferDetails>();

  constructor(
    private readonly offerDataService: OfferDataService,
  ) { }

  ngOnInit(): void {
  }

  onClick() {
    const offer: OfferDetails = {
      volume: this.volume,
      rate: this.rate,
      location: this.location,
      comments: this.comments,
    };

    this.offerDataService.create(offer, this.rfpId).subscribe((resp) => {
      if (resp !== undefined) {
        this.createOfferEvent.emit(resp);
      }
    });
  }
}
