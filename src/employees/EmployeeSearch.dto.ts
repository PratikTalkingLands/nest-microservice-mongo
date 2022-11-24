import { IsIn } from "class-validator";
import { EmployeeStatus, EmployeeTier } from "./Employee.enum";

export class EmployeeSearchDto {
    designation(designation: any, undefined: undefined) {
        throw new Error("Method not implemented.");
    }
    status: EmployeeStatus
    name: string
}