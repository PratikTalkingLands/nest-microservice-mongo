import { Injectable, NotFoundException } from '@nestjs/common';
import { EmployeeStatus, EmployeeTier } from './Employee.enum';
import { v1 as uuid } from 'uuid'
import { EmployeeSearchDto } from './EmployeeSearch.dto';
import { EmployeeUpdateDto } from './EmployeeUpdate.dto';
import { EmployeeCreateDto } from './EmployeeCreate.dto';
import { Messages } from './Messages.data';
import { Employee } from './schemas/Employee.schema';
import { EmployeeRepository } from './Employee.repository';

@Injectable()
export class EmployeesService {

    constructor(private employeeRepository: EmployeeRepository) {

    }

    async getAllEmployees(): Promise<Employee[]> {
        return await this.employeeRepository.findAll()
    }

    async createEmployee(employeeCreateDto: EmployeeCreateDto): Promise<Employee> {

        
        return await this.employeeRepository.create(employeeCreateDto)

    }


    /*employeeSearch(employeeSearchDto: EmployeeSearchDto) {
        const { status, name } = employeeSearchDto;
        let employees = this.getAllEmployees();
        if (status) {
            employees = employees.filter(employee => employee.status === status);
            //   console.log(employees)
        }
        if (name) {
            employees = employees.filter(employee => employee.firstName.includes(name) || employee.lastName.includes(name))
            console.log(employees)
        }
        return employees;
    }*/

    async getEmployeeById(id: string): Promise<Employee> {
        const employees = this.getAllEmployees();
        let employee = (await employees).find(employee => employee.id === id)
        if (!employee) {
            throw new NotFoundException(`${id} ${Messages.EMPLOYEE_NOT_EXSIST}`)
        }
        return employee
    }
    employeeSearch(employeeSearchDto: EmployeeSearchDto) {
        return this.employeeRepository.findWithFilters(employeeSearchDto);
    }


    updateEmployee(employeeUpdatedto: EmployeeUpdateDto): Promise<Employee> {

        return this.employeeRepository.update(employeeUpdatedto)
    }

    // async delete(id: string): Promise<boolean> {

    //     let x = await this.employeeRepository.delete(id);
    //     console.log(x)
    //     return x;

    // }

}