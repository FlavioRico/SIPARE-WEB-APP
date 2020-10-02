import { Parameter } from '../models-parameters/parameter'

export class LiquidationPreAviso extends Parameter {
    imss: number;
    viv: number;
    acv: number;
    total: number;
    rcv: number;
    id: number;
    transaction_type: string;
    registry_date: string;
    receiving_date: string;
    transaction_flag: string;
    issuing_bank_name: string;
    receiving_bank_name: string;
}
