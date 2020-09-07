import { Summary } from './summary';
import { Comparsion } from './comparison';

export class BalanceProcesar {
    id: number;
    dispatch_date: string;
    type: string;
    file_amounts: Summary;
    t24_amounts: Summary;
    comparisons: any;
    balanced: boolean;
    status: number;
}