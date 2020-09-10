import { Summary } from './summary';
import { Comparsion } from './comparison';

export class BalanceConsar {
    id: number;
    dispatch_date: string;
    type: string;
    file_amounts: Summary;
    t24_amounts: Summary;
    comparison: Comparsion;
    balanced: boolean;
    status: number;
}