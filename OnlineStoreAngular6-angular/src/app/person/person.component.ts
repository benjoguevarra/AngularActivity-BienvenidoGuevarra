import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Person } from '../../domain/person';
import { PersonService } from '../../services/person.service';
import { DataTable } from 'primeng/primeng';
import { DatePipe } from '@angular/common';;
import {MatPaginator, MatTableDataSource} from '@angular/material';


@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css'],
  providers: [PersonService, DatePipe]
})

export class PersonComponent implements OnInit {
  personFormGroup: FormGroup;
  personDetailFormGroup: FormGroup;
  selectPerson: Person;
  selectPersonDetail: Person;

  isDeletePerson: boolean;
  isAddPerson: boolean;
  indexOfPerson: number;
  totalRecords: number = 0;
  searchFirstName: string = "";
  birthday: Date;
  todayDate: Date = new Date;
  rows: number=5;
  
  dataSource;
  displayedColumns: string[] = ['button','firstName', 'middleName', 'lastName', 'age', 'birthday','photo', 'gender','relationshipStatus','nationality', 'phoneNumber','address'];
  personList: Person[];

  constructor(private fb: FormBuilder, private personService: PersonService,
     private datePipe: DatePipe) { }

   
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
		this.personService.getPerson().then(result => {
			this.personList = result;
			this.dataSource = new MatTableDataSource<Person>(result);
      this.dataSource.paginator = this.paginator;
      
    });


    this.personFormGroup = this.fb.group({
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthday: ['', Validators.required],
      gender: ['', Validators.required],
      relationshipStatus: ['', Validators.required],
      nationality: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      religion: ['', Validators.required],
    });

    this.personDetailFormGroup = this.fb.group({
      streetHouseBuilding: ['', Validators.required],
      baranggaySubdivision: ['', Validators.required],
      city: ['', Validators.required],
      region: ['', Validators.required],
      country: ['', Validators.required],
      postalCode: ['', Validators.required],
      latitude: ['', Validators.required],
      longtitude: ['', Validators.required],
    });

    this.loadAllPersons();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadAllPersons() {
    this.personService.getPerson().then(persons => {
    this.personList = persons;
      for (let i = 0; i < this.personList.length; i++) {
        this.personList[i].birthday =
          this.datePipe.transform(this.personList[i].birthday, 'yyyy-MM-dd');
      }
        this.dataSource = new MatTableDataSource<Person>(this.personList);
        this.dataSource.paginator = this.paginator;
    });
  }

  paginate($event) {
    this.personService.getPersonWithPagination($event.first, $event.rows, this.searchFirstName).then(result => {
      this.totalRecords = result.totalRecords;
      this.personList = result.results;
      for (let i = 0; i < this.personList.length; i++) {
        this.personList[i].birthday=
          this.datePipe.transform(this.personList[i].birthday, 'yyyy-MM-dd');
      }
    })
  }

  searchPerson() {
    if (this.searchFirstName.length != 1) {
      this.loadAllPersons();
    }
  }

  addPerson() {
    this.personFormGroup.enable();
    this.isAddPerson = true;
    this.isDeletePerson = false;
    this.selectPerson = {} as Person;
    this.loadAllPersons();

  }

  editPerson(Person) {
    this.personFormGroup.enable();
    this.isAddPerson = false;
    this.isDeletePerson = false;
    this.indexOfPerson = this.personList.indexOf(Person);
    this.selectPerson = Person;
    this.selectPerson = Object.assign({}, this.selectPerson);
    this.birthday = new Date(this.selectPerson.birthday);
    this.loadAllPersons();
  }

  deletePerson(Person) {
    this.personFormGroup.disable();
    this.personDetailFormGroup.disable();
    this.isDeletePerson = true;
    this.indexOfPerson = this.personList.indexOf(Person);
    this.selectPerson = Person;
    this.selectPerson = Object.assign({}, this.selectPerson);
  }

  okDelete() {
    let tmpPersonList = [...this.personList];
    this.personService.deletePerson(this.selectPerson.personID)
      .then(() => {
        tmpPersonList.splice(this.indexOfPerson, 1);
        this.personList = tmpPersonList;
        this.selectPerson = null;
        this.loadAllPersons();
      });
  }

  savePerson() {
    let tmpPersonList = [...this.personList];

    this.selectPerson.birthday =
    this.datePipe.transform(this.selectPerson.birthday, 'yyyy-MM-dd');

    if (this.isAddPerson == true) {
      this.personService.addPerson(this.selectPerson).then(result => {

        result.birthday =
        this.datePipe.transform(this.selectPerson.birthday, 'yyyy-MM-dd');

        tmpPersonList.push(result);
        this.personList = tmpPersonList;
        this.selectPerson = null;
        this.loadAllPersons();
      });
     
    }
    else {
      this.personService.editPerson(this.selectPerson.personID,
        this.selectPerson).then(result => {

          result.birthday =
          this.datePipe.transform(this.selectPerson.birthday, 'yyyy-MM-dd');

          tmpPersonList[this.indexOfPerson] = result;
          this.personList = tmpPersonList;
          this.selectPerson = null;
          this.loadAllPersons();
        }); 
    }


  }

  cancelPerson() {
    this.selectPerson = null;
  }

  computeAge() {
    var dateold = new Date(this.personFormGroup.value.birthday);
    var datenew = new Date();
    var ynew = datenew.getFullYear();
    var mnew = datenew.getMonth();
    var dnew = datenew.getDate();
    var yold = dateold.getFullYear();
    var mold = dateold.getMonth();
    var dold = dateold.getDate();
    var diff = ynew - yold;
    if (mold > mnew) diff--;
      else {
        if (mold == mnew) {
            if (dold > dnew) diff--;
        }
    }
    this.selectPerson.age = diff;  
  }

  // searchEmpty() {
  //   if(this.searchFirstName.length ==0)
  //   this.resetTable();
  // }

  // resetTable() {
  //   this.dataTable.reset();
  // }

}