import { Component, OnInit } from '@angular/core';
import { Table } from '../interfaces';
import { TableService } from '../services/table.service';

@Component({
  selector: 'app-table-page',
  templateUrl: './table-page.component.html',
  styleUrls: ['./table-page.component.css']
})
export class TablePageComponent implements OnInit {

  tables: Table[] = []

  constructor(private tableService: TableService) { }

  ngOnInit() {
    this.tableService.getAll().subscribe( 
      tables => {
        this.tables = tables
      },
      error => console.log(error.message ? error.message : error)
    )
  }

}
