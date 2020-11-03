import { Parameter } from '../models-parameters/parameter'

export class Liquidation extends Parameter {
    imss: number;
    viv: number;
    acv: number;
    total: number;
    id: number;
    transaction_type: string;
    registry_date: string;
    receiving_date: string;
    transaction_flag: string;
    issuing_bank_name: string;
    receiving_bank_name: string;
}

/*
example
{
    "operation_type": 116027,
    "office": "123",
    "sheet_number": 456,
    "issuing_bank_key": "40132",
    "account_number": "123456",
    "receiving_bank_key": "04540",
    "description": "Test",
    "imss": 0.00,
    "viv": 0.00,
    "acv": 0.00,
    "total": 0.00,
    "id": 75,
    "transaction_type": "T+1",
    "registry_date": "2020/09/24",
    "receiving_date": "2020-09-24 17:24:02.84",
    "transaction_flag": "N",
    "issuing_bank_name": "\tBANCO MULTIVA SOCIEDAD ANONIMA INSTITUCION DE BANCA MULTIPLE GRUPO FINANCIERO MULTIVA\t ",
    "receiving_bank_name": "\tSANTANDER MEXICANO, S.A. DE C.V., AFORE\t "
}
*/