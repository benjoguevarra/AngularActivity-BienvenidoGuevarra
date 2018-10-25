import { Component, OnInit, ViewChild } from '@angular/core';
import { Author } from '../../domain/author';
import { AuthorService } from '../../services/author.service';
import { DatePipe } from '@angular/common';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import {RadioButtonModule} from 'primeng/radiobutton';
import { DataTable, SelectButton, RadioButton } from 'primeng/primeng';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css'],
  providers: [AuthorService, DatePipe]
})

export class AuthorComponent implements OnInit {
  authorList: Author[];
  selectAuthor: Author;
  authorForm: FormGroup;
  isAddAuthor: boolean;
  indexOfAuthor: number = 0;
  isDeleteAuthor: boolean;
  authorBirthday: Date;
  totalRecords: number = 0;
  searchAuthorFirstname: string = "";
  authorIsAlive: boolean; 

  
  constructor(private authorService: AuthorService,
    private fb: FormBuilder, private datePipe: DatePipe) { }

    @ViewChild('dt') public dataTable: DataTable;

    ngOnInit() {
      this.authorForm = this.fb.group({
      'authorFirstname': new FormControl('', Validators.required),
      'authorLastname': new FormControl('', Validators.required),
      'authorGender': new FormControl(''),
      'authorIsAlive': new FormControl('', Validators.required),
      'authorBirthday': new FormControl(''),
      });
  
    this.loadAllAuthors();
  }

  loadAllAuthors() {
    this.authorService.getAuthor().then(result => {
      this.authorList = result;
      for (let i = 0; i < this.authorList.length; i++) {
        this.authorList[i].authorBirthday =
          this.datePipe.transform(this.authorList[i].authorBirthday, 'yyyy-MM-dd');

      } 
    })
  }
 
  paginate($event) {
    this.authorService.getAuthorWithPagination($event.first, $event.rows, this.searchAuthorFirstname).then(result => {
      this.totalRecords = result.totalRecords;
      this.authorList = result.results;

      for (let i = 0; i < this.authorList.length; i++) {
        this.authorList[i].authorBirthday =
          this.datePipe.transform(this.authorList[i].authorBirthday, 'yyyy-MM-dd');

      console.log(this.authorList);
      }
    })
  }

  searchAuthor() {
    if (this.searchAuthorFirstname.length != 1) {
      this.resetTable();
    }
  }

  resetTable() {
    this.dataTable.reset();
  }


  addAuthor() {
    this.authorForm.enable();
    this.isAddAuthor = true;
    this.isDeleteAuthor = false;
    this.selectAuthor = {} as Author;
  }

  editAuthor(Author) {
    this.authorForm.enable();
    this.isAddAuthor = false;
    this.isDeleteAuthor = false;
    this.indexOfAuthor = this.authorList.indexOf(Author);
    this.selectAuthor = Author;
    this.selectAuthor = Object.assign({}, this.selectAuthor);
    this.authorBirthday = new Date(this.selectAuthor.authorBirthday);
    this.authorIsAlive = this.selectAuthor.authorIsAlive;

  }

  deleteAuthor(Author) {
    this.authorForm.disable();
    this.isDeleteAuthor = true;
    this.indexOfAuthor = this.authorList.indexOf(Author);
    this.selectAuthor = Author;
    this.selectAuthor = Object.assign({}, this.selectAuthor);
  }

  okDelete() {
    let tmpAuthorList = [...this.authorList];
    this.authorService.deleteAuthor(this.selectAuthor.authorID)
      .then(() => {
        tmpAuthorList.splice(this.indexOfAuthor, 1);
        this.authorList = tmpAuthorList;
        this.selectAuthor = null;
      });
  }

  saveAuthor() {
    let tmpAuthorList = [...this.authorList];

    this.selectAuthor.authorBirthday =
    this.datePipe.transform(this.authorBirthday, 'yyyy-MM-dd');

    if (this.isAddAuthor == true) {
      this.authorService.addAuthor(this.selectAuthor).then(result => {

        result.authorBirthday =
        this.datePipe.transform(this.authorBirthday, 'yyyy-MM-dd');

        tmpAuthorList.push(result);
        this.authorList = tmpAuthorList;
        this.selectAuthor = null;
      })
    }
    else {
      this.authorService.editAuthor(this.selectAuthor.authorID, this.selectAuthor)
        .then(result => {
          
          result.authorBirthday =
          this.datePipe.transform(this.authorBirthday, 'yyyy-MM-dd');
          tmpAuthorList[this.indexOfAuthor] = result;
          this.authorList = tmpAuthorList;
          this.selectAuthor = null;
        })
    }
    // let tmpAuthorList = [...this.authorList];
    // this.selectAuthor.dateEnrolled =
    //   this.datePipe.transform(this.dateEnrolled, 'yyyy-MM-dd');
    // if (this.isAddAuthor == true) {
    //   this.authorService.addAuthor(this.selectAuthor).then(result => {
    //     result.dateEnrolled =
    //       this.datePipe.transform(this.dateEnrolled, 'yyyy-MM-dd');
      
    //     tmpAuthorList.push(result);
    //     this.authorList = tmpAuthorList;
    //     this.selectAuthor = null;
    //   });
    // }
    // else {
    //   this.authorService.editAuthor(this.selectAuthor.authorID,
    //     this.selectAuthor).then(result => {
    //       result.dateEnrolled =
    //         this.datePipe.transform(this.dateEnrolled, 'yyyy-MM-dd');
    //       tmpAuthorList[this.indexOfAuthor] = result;
    //       this.authorList = tmpAuthorList;
    //       this.selectAuthor = null;
    //     });
    // }
  }

  cancelAuthor() {
    this.selectAuthor = null;
  }
}