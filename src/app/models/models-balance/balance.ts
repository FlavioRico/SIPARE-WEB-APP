import { Summary } from './summary';
import { Comparsion } from './comparsion';

export class Balance {
    id: number;
    dispatch_date: string;
    type: string;
    file_amounts: Summary;
    t24_amounts: Summary;
    comparison: Comparsion;
    balanced: boolean;
    status: number;
}