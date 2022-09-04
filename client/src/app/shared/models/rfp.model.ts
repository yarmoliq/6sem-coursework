import { RfpStatus } from '../enums/rfp-status.model';
import { DealSheet } from './dealSheet.model';
import { OfferDetails } from './offer-details.model';
import { User } from './user.model';

export interface Rfp {
  id?: number;
  created?: Date;
  status?: RfpStatus;

  customer?: User;
  ea?: User;
  suppliers?: User[];

  commodity: string;
  volume: number;
  location: string;
  comments: string;

  offers?: OfferDetails[];

  dealSheet?: DealSheet;
}
