import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { TaskForm } from '../task-form';

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.css']
})
export class FormModalComponent implements OnInit {
  model = new TaskForm('', '');

  constructor(
    private modalService: NgbModal,
    private http: HttpClient
  ) {}

  ngOnInit() {}

  open(content) { this.modalService.open(content);  }

  newTask() { this.model = new TaskForm('', '');  }

  onSubmit(taskForm: NgForm) {
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    this.http.put('http://localhost:8080/task',
    { task: taskForm.value },
    { headers }
    ).subscribe(results => {
      this.newTask();
      $("button#refresh-active").click();
    });
  }

}
