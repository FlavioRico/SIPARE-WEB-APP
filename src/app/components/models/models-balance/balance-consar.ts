import { Summary } from './summary';
import { Comparsion } from './comparison';

export class BalanceConsar {
    id: number;
    type: string;
    status: number;
    timestamp: string;
    comparisons: Comparsion;
    balanced: boolean;
    dispatch_date: string;
    payment_date: string;
    approved_by: string;
    file_amounts: Summary;
    t24_amounts: Summary;
}