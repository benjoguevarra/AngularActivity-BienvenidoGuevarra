import { Component, OnInit, ViewChild } from '@angular/core';
import { Book } from '../../domain/book';
import { BookService } from '../../services/book.service';
import { DatePipe } from '@angular/common';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DataTable, SelectButton, RadioButton } from 'primeng/primeng';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
  providers: [BookService, DatePipe]
})

export class BookComponent implements OnInit {
  bookList: Book[];
  selectBook: Book;
  bookForm: FormGroup;
  isAddBook: boolean;
  indexOfBook: number = 0;
  isDeleteBook: boolean;
  bookPublished: Date;
  totalRecords: number = 0;
  searchBookTitle: string = "";
  bookIsAvailable: boolean;


  constructor(private bookService: BookService,
    private fb: FormBuilder, private datePipe: DatePipe) { }

  @ViewChild('dt') public dataTable: DataTable;

  ngOnInit() {
    this.bookForm = this.fb.group({
      'authorID': new FormControl(''),
      'bookTitle': new FormControl('', Validators.required),
      'bookSypnosis': new FormControl(''),
      'bookGenre': new FormControl('', Validators.required),
      'bookPublished': new FormControl(''),
      'bookIsAvailable': new FormControl('', Validators.required)
    });

  }


  paginate($event) {

    this.bookService.getBookWithPagination($event.first, $event.rows, this.searchBookTitle).then(result => {
      this.totalRecords = result.totalRecords;
      this.bookList = result.results;
      for (let i = 0; i < this.bookList.length; i++) {
        this.bookList[i].bookPublished =
          this.datePipe.transform(this.bookList[i].bookPublished, 'yyyy-MM-dd');
       
      }
    })
  }

  searchBook() {
    if (this.searchBookTitle.length != 1) {
      this.resetTable();
    }
  }

  resetTable() {
    this.dataTable.reset();
  }


  addBook() {
    this.bookForm.enable();
    this.isAddBook = true;
    this.isDeleteBook = false;
    this.selectBook = {} as Book;
  }

  editBook(Book) {
    this.bookForm.enable();
    this.isAddBook = false;
    this.isDeleteBook = false;
    this.indexOfBook = this.bookList.indexOf(Book);
    this.selectBook = Book;
    this.selectBook = Object.assign({}, this.selectBook);
    this.bookPublished = new Date(this.selectBook.bookPublished);
    this.bookIsAvailable = this.selectBook.bookIsAvailable;

  }

  deleteBook(Book) {
    this.bookForm.disable();
    this.isDeleteBook = true;
    this.indexOfBook = this.bookList.indexOf(Book);
    this.selectBook = Book;
    this.selectBook = Object.assign({}, this.selectBook);
  }

  okDelete() {
    let tmpBookList = [...this.bookList];
    this.bookService.deleteBook(this.selectBook.bookID)
      .then(() => {
        tmpBookList.splice(this.indexOfBook, 1);
        this.bookList = tmpBookList;
        this.selectBook = null;
      });
  }

  saveBook() {
    let tmpBookList = [...this.bookList];
    this.selectBook.bookPublished =
      this.datePipe.transform(this.bookPublished, 'yyyy-MM-dd');
    if (this.isAddBook == true) {
      this.bookService.addBook(this.selectBook).then(result => {


        result.bookPublished =
          this.datePipe.transform(this.bookPublished, 'yyyy-MM-dd');
          
        tmpBookList.push(result);
        this.bookList = tmpBookList;
        this.selectBook = null;
      })
    }
    else {
      this.bookService.editBook(this.selectBook.bookID, this.selectBook)
        .then(result => {
          result.bookPublished =
            this.datePipe.transform(this.bookPublished, 'yyyy-MM-dd');
          tmpBookList[this.indexOfBook] = result;
          this.bookList = tmpBookList;
          this.selectBook = null;
        })
    }

  }

  cancelBook() {
    this.selectBook = null;
  }
}