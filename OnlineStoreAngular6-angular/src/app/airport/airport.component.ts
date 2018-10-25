import { Component, OnInit, ViewChild } from '@angular/core';
import { Airport } from '../../domain/airport'
import { AirportService } from '../../services/airport.service';
import { FormBuilder } from '@angular/forms'
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-airport',
  templateUrl: './airport.component.html',
  styleUrls: ['./airport.component.css'],
  providers: [AirportService]
})

export class AirportComponent implements OnInit {

  dataSource;;
  displayedColumns: string[] = ['code', 'name'];
  airports: Airport[];
  totalRecords: number = 0;
  httpResponseObject: string = "response";
  rows: number = 10;

  constructor(private airportService: AirportService, private fb: FormBuilder) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {

    this.showAirportsResponse();

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  showAirports() {
    this.airportService.getAirports()
      .subscribe(
        (data: Airport[]) => this.airports = { ...data }
      );
  }

  showAirportsResponse() {
    this.airportService.getAirportResponse()
      .subscribe(resp => {

        this.airports = { ...resp.body }
        this.airports = this.airports[this.httpResponseObject];
        this.totalRecords = this.airports.length;
        this.dataSource = new MatTableDataSource<Airport>(this.airports);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
  }
}

