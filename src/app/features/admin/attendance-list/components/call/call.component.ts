import { Matter } from './../../../../../core/services/matter/matter.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

import {
  Student,
  StudentService,
} from 'src/app/core/services/student/student.service';

import { MatterService } from 'src/app/core/services/matter/matter.service';
import { Router } from '@angular/router';
import { CallData, PresenceCallList } from 'src/app/core/models/callData.model';

interface Hour {
  value: string;
  viewValue: string;
}

export interface FormValue {
  start: string;
  end: string;
  matterId: string;
  promotionId: string;
}
@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.scss'],
})
export class CallComponent implements OnInit {
  displayedColumns: string[] = ['isPresent', 'firstName', 'lastName', 'email'];

  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());

  callForm!: FormGroup;

  startControl!: FormControl;
  endControl!: FormControl;
  matterIdControl!: FormControl;
  promotionIdControl!: FormControl;

  hours: Hour[] = [
    { value: '8', viewValue: '8 Heures' },
    { value: '9', viewValue: '9 Heures' },
    { value: '10', viewValue: '10 Heures' },
    { value: '11', viewValue: '11 Heures' },
    { value: '12', viewValue: '12 Heures' },
    { value: '13', viewValue: '13 Heures' },
    { value: '14', viewValue: '14 Heures' },
    { value: '15', viewValue: '15 Heures' },
    { value: '16', viewValue: '16 Heures' },
    { value: '17', viewValue: '17 Heures' },
  ];

  students!: Student[];

  matters!: Matter[];
  dataSource!: MatTableDataSource<any>;
  ELEMENT_DATA!: CallData[];

  canCall!: boolean;

  constructor(
    private studentService: StudentService,

    private matterService: MatterService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getDataTable();
    this.getMatter();
    
    this.initFormControls();
    this.initForm();
    this.canCall = true;
  }

  doCall() {
    this.getStudents(this.callForm.value);
    this.getDataTable();
    this.canCall = false;
    console.table('this.callForm.value' + this.callForm.value);
  }

  getDataTable(): void {
    this.dataSource = new MatTableDataSource<CallData>(this.ELEMENT_DATA);
  }



  getMatter() {
    this.matterService.getMatters().subscribe((matters) => {
      this.matters = matters;
    });
  }

  getStudents(data: FormValue): void {
    const { start, end, matterId, promotionId } = data;

    this.studentService.getStudents().subscribe((students) => {
      this.students = students.filter((student) => {
        return student.promotionId == promotionId;
      });

      let callArray: CallData[] = [];

      this.students.map((student) => {
        const dataForCall: CallData = {
          firstName: student.firstName,
          lastName: student.lastName,
          email: student.email,
          isPresent: false,
        };

        callArray.push(dataForCall);
      });

      this.ELEMENT_DATA = callArray;

      this.getDataTable();
    });
  }

  initForm(): void {
    this.callForm = this.fb.group({
      start: this.startControl,
      end: this.endControl,
      matterId: this.matterIdControl,
      promotionId: this.promotionIdControl,
    });
  }

  initFormControls(): void {
    this.startControl = new FormControl('', [Validators.required]);
    this.endControl = new FormControl('', [Validators.required]);
    this.matterIdControl = new FormControl('', Validators.required);
    this.promotionIdControl = new FormControl('', Validators.required);
  }

  markPresent(callData: CallData) {
    callData.isPresent = !callData.isPresent;
  }

  verifyAllchecked(): boolean {
    const dataLength = this.dataSource.data.length;
    const numberOfRowsSelected = this.dataSource.data.filter(
      (student) => student.isPresent === true
    ).length;
    return dataLength === numberOfRowsSelected;
  }

  checkAll() {
    if (this.verifyAllchecked()) {
      this.dataSource.data.map((student) => (student.isPresent = false));
    } else {
      this.dataSource.data.map((student) => (student.isPresent = true));
    }
  }

  goBack(): void {
    this.router.navigate(['admin/attendance-list']);
  }

  onSubmitCall(): void {
    const allInfos: PresenceCallList = {
      ...this.callForm.value,
      createdAt: new Date(),
      presenceList: this.dataSource.data,
    };
    console.log('Call: ', allInfos);
    // console.log('this.dataSource.data.', this.dataSource.data);
    this.goBack();
  }
}
