import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  activeDtOptions: DataTables.Settings = {};
  inactiveDtOptions: DataTables.Settings = {};


  ngOnInit() {
    this.activeDtOptions = {
      ajax: {
        url: 'http://localhost:8080/get-tasks',
        data: {
          is_active: true
        }
      },
      columns: [{
        title: 'ID',
        data: 'id'
      }, {
        title: 'Title',
        data: 'title'
      }, {
        title: 'Description',
        data: 'description'
      }],
    };
    this.inactiveDtOptions = {
      ajax: {
        url: 'http://localhost:8080/get-tasks',
        data: {
          is_active: false
        }
      },
      columns: [{
        title: 'ID',
        data: 'id'
      }, {
        title: 'Title',
        data: 'title'
      }, {
        title: 'Description',
        data: 'description'
      }],
    };
  }

}
