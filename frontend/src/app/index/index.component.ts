import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs/Subject';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  dtOptions: any = {};

  dtTrigger: Subject<any> = new Subject();

  constructor(private http: HttpClient) {}

  ngOnInit() {
    let call_api = this.http;
    this.dtOptions = {
      dom: 'Bfrtip',
      ajax: {
        url: 'http://localhost:8080/get-tasks',
        data: { is_done: false }
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
      select: true,
      buttons: [
        {
          text: 'Complete Selected',
          action: function () {
            var data = this.rows({ selected: true }).data();
            var push_data = [];
            Object.keys(data).forEach(function (key) {
              if (data[key].hasOwnProperty('id')) {
                push_data.push(data[key].id);
              }
            });
            call_api.delete('http://localhost:8080/task',
              { params: { id_list: JSON.stringify(push_data) } }
            ).subscribe(results => {
              $("button#refresh-active").click();
              $("button#refresh-inactive").click();
            })
          }
        }
      ]
    };
  }

  ngAfterViewInit(): void { this.dtTrigger.next(); }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }
}
