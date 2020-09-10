import { Summary } from './summary';
import { Comparsion } from './comparison';

export class BalanceProcesar {
    id: number;
    type: string;
    comparisons: Comparsion;
    balanced: boolean;
    status: number;
    dispatch_date: string;
    payment_date: string;
    file_amounts: Summary;
    t24_amounts: Summary;
}