import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';


class Task {
  id: number;
  title: string;
  descrition: string;
}

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  tasks: Task[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    const that = this;

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        that.http
            .put<DataTablesResponse>(
              'http://localhost:8080/get-tasks',
              dataTablesParameters, {})
            .subscribe(resp => {
                that.tasks = resp.data;

                callback({
                    recordsTotal: resp.recordsTotal,
                    recordsFiltered: resp.recordsFiltered,
                    data: [],
                });
            });
      },
      columns: [
          { data: 'id' }, { data: 'title' }, { data: 'description' },
      ],
  };
  }

}
