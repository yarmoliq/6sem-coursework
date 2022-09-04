import { Component, OnInit } from '@angular/core';
import { Rfp } from 'src/app/shared/models/rfp.model';
import { RfpDataService } from 'src/app/shared/services/rfp.data.service';

@Component({
  selector: 'app-create-rfp',
  templateUrl: './create-rfp.component.html',
  styleUrls: ['./create-rfp.component.scss']
})
export class CreateRfpComponent implements OnInit {

  public commodity: string;
  public volume: number;
  public location: string;
  public comments: string;

  constructor(
    private readonly rfpDataService: RfpDataService,
  ) { }

  ngOnInit(): void {
  }

  onClick() {
    const rfp: Rfp = {
      commodity: this.commodity,
      volume: this.volume,
      location: this.location,
      comments: this.comments,
    };
    this.rfpDataService.create(rfp).subscribe((rfpRespone) => {
    });
  }
}
