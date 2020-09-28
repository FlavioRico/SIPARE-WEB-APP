export class Parameter {
    operation_type: string
    office: string
    sheet_number: string
    issuing_bank_key: string
    account_number: string
    receiving_bank_key : string
    description : string
    created_by: string
}

// example: 
// {
//     "operation_type": "116027",
//     "office": "789",
//     "sheet_number": "456",
//     "issuing_bank_key": "04540",
//     "account_number": "123456789123456789",
//     "receiving_bank_key" : "04540",
//     "description" : "T+1 Prueba",
//     "created_by": "jonathan.martinez"
// }
