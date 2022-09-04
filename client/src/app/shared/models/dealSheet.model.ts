import { User } from './user.model';

export class DealSheet {
    id: number;
    created: Date;

    customer: User;
    supplier: User;

    volume: number;
    rate: number;
    destinationAddress: string;
    departureAddress: string;
}
