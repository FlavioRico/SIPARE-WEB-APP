import { Summary } from './summary';
import { Comparsion } from './comparison';

export class BalanceProcesar {
    id: number;
    type: string;
    comparisons: Comparsion;
    balanced: boolean;
    status: number;
    timestamp: string;
    dispatch_date: string;
    payment_date: string;
    approved_by: string;
    file_amounts: Summary;
    t24_amounts: Summary;
}