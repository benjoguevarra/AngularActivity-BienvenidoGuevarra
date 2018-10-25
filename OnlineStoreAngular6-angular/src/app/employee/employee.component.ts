import { Component, OnInit } from '@angular/core';
import { Employee } from '../../domain/employee';
import { EmployeeService } from '../../services/employee.service';
import { DatePipe } from '@angular/common';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [EmployeeService, DatePipe]
})

export class EmployeeComponent implements OnInit {
  employeeList: Employee[];
  selectEmployee: Employee;
  isAddEmployee: boolean;
  indexOfEmployee: number = 0;
  isDeleteEmployee: boolean;
  employeeForm: FormGroup;
  birthDate: Date;
  hireDate: Date;

  constructor(private employeeService: EmployeeService,
    private fb: FormBuilder, private datePipe: DatePipe) { }

  ngOnInit() {
    this.employeeForm = this.fb.group({
      'firstName': new FormControl('', Validators.required),
      'lastName': new FormControl('', Validators.required),
      'title': new FormControl('', Validators.required),
      'titleOfCourtesy': new FormControl('', Validators.required),
      'birthDate': new FormControl('', Validators.required),
      'hireDate': new FormControl('', Validators.required),
      'country': new FormControl('', Validators.required),
      'postalCode': new FormControl('', Validators.required),
      'address': new FormControl('', Validators.required),
      'city': new FormControl('', Validators.required),
      'region': new FormControl('', Validators.required),
      'homePhone': new FormControl('', Validators.required),
      'extension': new FormControl('', Validators.required),
      'photo': new FormControl('', Validators.required),
      'note': new FormControl('', Validators.required),
      'reportsTo': new FormControl('', Validators.required)
    });

    this.loadAllEmployees();
  }

  loadAllEmployees() {
    this.employeeService.getEmployee().then(result => {
      this.employeeList = result;
      for (let i = 0; i < this.employeeList.length; i++) {
        this.employeeList[i].birthDate = this.datePipe.transform(this.employeeList[i].birthDate, 'yyyy-MM-dd');
        this.employeeList[i].hireDate = this.datePipe.transform(this.employeeList[i].hireDate, 'yyyy-MM-dd');
      }});
  }



addEmployee() {
  this.isAddEmployee = true;
  this.isDeleteEmployee = false;
  this.selectEmployee = {} as Employee;
}

editEmployee(Employee) {
  this.isAddEmployee = false;
  this.isDeleteEmployee = false;
  this.indexOfEmployee = this.employeeList.indexOf(Employee);
  this.selectEmployee = Employee;
  this.selectEmployee = Object.assign({}, this.selectEmployee);
  this.birthDate = new Date(this.selectEmployee.birthDate);
  this.hireDate = new Date(this.selectEmployee.hireDate);
}

deleteEmployee(Employee) {
  this.isDeleteEmployee = true;
  this.indexOfEmployee = this.employeeList.indexOf(Employee);
  this.selectEmployee = Employee;
  this.selectEmployee = Object.assign({}, this.selectEmployee);
}

okDelete() {
  let tmpEmployeeList = [...this.employeeList];
  this.employeeService.deleteEmployee(this.selectEmployee.employeeID)
    .then(() => {
      tmpEmployeeList.splice(this.indexOfEmployee, 1);
      this.employeeList = tmpEmployeeList;
      this.selectEmployee = null;
    });
}

saveEmployee() {
  let tmpEmployeeList = [...this.employeeList];

  this.selectEmployee.birthDate =
    this.datePipe.transform(this.birthDate, 'yyyy-MM-dd');

  this.selectEmployee.hireDate =
    this.datePipe.transform(this.hireDate, 'yyyy-MM-dd');

  if (this.isAddEmployee == true) {
    this.employeeService.addEmployee(this.selectEmployee).then(result => {
      result.birthDate =
        this.datePipe.transform(this.birthDate, 'yyyy-MM-dd');
      result.hireDate =
        this.datePipe.transform(this.hireDate, 'yyyy-MM-dd');

      tmpEmployeeList.push(result);
      this.employeeList = tmpEmployeeList;
      this.selectEmployee = null;
    });
  }
  else {
    this.employeeService.editEmployee(this.selectEmployee.employeeID,
      this.selectEmployee).then(result => {
        result.birthDate =
          this.datePipe.transform(this.birthDate, 'yyyy-MM-dd');
        result.hireDate =
          this.datePipe.transform(this.hireDate, 'yyyy-MM-dd');
        tmpEmployeeList[this.indexOfEmployee] = result;
        this.employeeList = tmpEmployeeList;
        this.selectEmployee = null;
      });
  }
}

cancelEmployee() {
  this.selectEmployee = null;
}
}