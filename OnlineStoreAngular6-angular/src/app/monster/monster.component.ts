import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Monster } from '../../domain/monster';
import { DataTable } from 'primeng/primeng';
import { DatePipe } from '@angular/common';;
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {MonsterService } from '../../services/monster.service';

@Component({
  selector: 'app-monster',
  templateUrl: './monster.component.html',
  styleUrls: ['./monster.component.css'],
  providers: [MonsterService, DatePipe]
})

export class MonsterComponent implements OnInit {
  monsterFormGroup: FormGroup;
  monsterDetailFormGroup: FormGroup;
  selectMonster: Monster;
  isDeleteMonster: boolean;
  isAddMonster: boolean;
  indexOfMonster: number;
  totalRecords: number = 0;
  searchFirstName: string = "";
  dateCreated: Date;
  todayDate: Date = new Date();
  rows: number=5;
  isActive: boolean;
  
  dataSource;
  displayedColumns: string[] = ['button','monsterName','price', 'isActive', 'dateCreated'];
  monsterList: Monster[];

  constructor(private fb: FormBuilder, private monsterService: MonsterService,
     private datePipe: DatePipe) { }

   
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
		this.monsterService.getMonster().then(result => {
			this.monsterList = result;
			this.dataSource = new MatTableDataSource<Monster>(result);
      this.dataSource.paginator = this.paginator;  
    });
    this.monsterFormGroup = this.fb.group({
      monsterName: ['', Validators.required],
      price: ['', Validators.required],
      isActive: ['', Validators.required],
      dateCreated: ['', Validators.required],
 
    });
    this.loadAllMonsters();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadAllMonsters() {
    this.monsterService.getMonster().then(monsters => {
    this.monsterList = monsters;
      for (let i = 0; i < this.monsterList.length; i++) {
        this.monsterList[i].dateCreated =
          this.datePipe.transform(this.monsterList[i].dateCreated, 'yyyy-MM-dd');
      }
        this.dataSource = new MatTableDataSource<Monster>(this.monsterList);
        this.dataSource.paginator = this.paginator;
    });
  }


  addMonster() {
    this.monsterFormGroup.enable();
    this.isAddMonster = true;
    this.isDeleteMonster = false;
    this.selectMonster = {} as Monster;
    this.loadAllMonsters();
    //this.selectMonster.isActive = null;
  }

  // this.personFormGroup.enable();
  // this.isAddPerson = false;
  // this.isDeletePerson = false;
  // this.indexOfPerson = this.personList.indexOf(Person);
  // this.selectPerson = Person;
  // this.selectPerson = Object.assign({}, this.selectPerson);
  // this.birthday = new Date(this.selectPerson.birthday);
  // this.loadAllPersons();


  editMonster(Monster) {
    this.monsterFormGroup.enable(); 
    this.isAddMonster = false;
    this.isDeleteMonster = false;
    this.indexOfMonster = this.monsterList.indexOf(Monster);
    this.selectMonster = Monster;
    this.selectMonster = Object.assign({}, this.selectMonster);

    this.dateCreated = new Date(this.selectMonster.dateCreated);
    this.isActive = this.selectMonster.isActive;
    this.loadAllMonsters();
  }


  deleteMonster(Monster) {
    this.monsterFormGroup.disable();
    this.isDeleteMonster = true;
    this.indexOfMonster = this.monsterList.indexOf(Monster);
    this.selectMonster = Monster;
    this.selectMonster = Object.assign({}, this.selectMonster);
  }


  okDelete() {
    let tmpMonsterList = [...this.monsterList];
    this.monsterService.deleteMonster(this.selectMonster.monsterID)
      .then(() => {
        tmpMonsterList.splice(this.indexOfMonster, 1);
        this.monsterList = tmpMonsterList;
        this.selectMonster = null;
        this.loadAllMonsters();
      });
  }


  saveMonster() {
    let tmpMonsterList = [...this.monsterList];
    // this.selectMonster.isActive = this.isActive;

    this.selectMonster.dateCreated =
    this.datePipe.transform(this.selectMonster.dateCreated, 'yyyy-MM-dd');

    if (this.isAddMonster == true) {
      this.monsterService.addMonster(this.selectMonster).then(result => {

        result.dateCreated =
        this.datePipe.transform(this.selectMonster.dateCreated, 'yyyy-MM-dd');

        tmpMonsterList.push(result);
        this.monsterList = tmpMonsterList;
        this.selectMonster = null;
        this.loadAllMonsters();
      });
    }
    else {
      this.monsterService.editMonster(this.selectMonster.monsterID,
        this.selectMonster).then(result => {

          result.dateCreated =
          this.datePipe.transform(this.selectMonster.dateCreated, 'yyyy-MM-dd');

          tmpMonsterList[this.indexOfMonster] = result;
          this.monsterList = tmpMonsterList;
          this.selectMonster = null;
          this.loadAllMonsters();
        }); 
    }

  }
  

  cancelMonster() {
    this.selectMonster = null;
  }
}