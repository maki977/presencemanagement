import { Component, OnInit } from '@angular/core';
// import { Chart, registerables } from 'chart.js';
import {
  Student,
  StudentService,
} from 'src/app/core/services/student/student.service';
import { TeacherService } from 'src/app/core/services/teacher/teacher.service';

// Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  students!: Student[];

  numberStudent!: number;
  numberOfGirl!: number;
  numberOfMan!: number;
  numberTeacher!: number;

  constructor(
    private studentService: StudentService,
    private teacherService: TeacherService
  ) {}

  ngOnInit(): void { 
    this.getStudents();
    this.getTeachers();
  }

  getStudents(): void {
    this.studentService.getStudents().subscribe((students) => {
      this.numberStudent = students.length;
      this.students = students;
    });
  }

  getTeachers(): void {
    this.teacherService.getTeachers().subscribe((teachers) => {
      this.numberTeacher = teachers.length;
    });
  }


}
