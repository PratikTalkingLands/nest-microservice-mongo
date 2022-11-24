import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as mongoose from 'mongoose'
import { EmployeeCreateDto } from "./EmployeeCreate.dto";
import { EmployeeSearchDto } from "./EmployeeSearch.dto";
import { EmployeeUpdateDto } from "./EmployeeUpdate.dto";
import { Employee, EmployeeDocument } from "./schemas/Employee.schema";
import console from "console";

@Injectable()
export class EmployeeRepository {

    constructor(@InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>) {}

    async create(createEmployeeDTO:EmployeeCreateDto): Promise<Employee> {
        let newEmployee = new this.employeeModel(createEmployeeDTO)
        return await newEmployee.save()
    }

    async findAll(): Promise<Employee[]> {
        return await this.employeeModel.find()
    }
    async findOne(id: string): Promise<Employee> {
        return await this.employeeModel.findOne({ _id: id })
    }
    async findWithFilters(filter: EmployeeSearchDto) {
        let name = Object.is(filter.name, undefined) ? '' : filter.name
        let designation = Object.is(filter.designation, undefined) ? '' : filter.designation
        return await this.employeeModel.find({ $and: [{ designation: { $regex: designation } }, { firstName: { $regex: name } }] })

    }
    async update(employee: EmployeeUpdateDto): Promise<Employee> {

        return await this.employeeModel.findOneAndUpdate({ _id: employee.id },
            { nearestCity: employee.city }, {
            new: true
        })

    }
    // async delete(id: string): Promise<boolean> {
    //     let objId = new mongoose.Types.ObjectId(id)
    //     let ret = await this.employeeModel.deleteOne({ _id: objId })
    //     console.log(ret.n)
    //     return (ret === 1) 
    // }
}