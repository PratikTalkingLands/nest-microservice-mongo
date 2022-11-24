import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeesModule } from './employees/employees.module';
import { EmployeesService } from './employees/employees.service';


@Module({
  imports: [EmployeesModule, MongooseModule.forRoot("mongodb+srv://pratik:testdb@cluster0.oe4hvef.mongodb.net/?retryWrites=true&w=majority")],
  // providers: [EmployeesService],

})
export class AppModule {}
