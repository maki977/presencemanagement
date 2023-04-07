import { MatDialog } from '@angular/material/dialog';
import {
  AbsenceRequest,
  AbsenceRequestService,
} from 'src/app/core/services/absence-request/absence-request.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

interface Status {
  value: string;
  viewValue: string;
}

// enum Status {
//   Pending = 'Pending',
//   Accepted = 'Accepted',
//   Rejected = 'Rejected',
// }

@Component({
  selector: 'app-absence-request-details',
  templateUrl: './absence-request-details.component.html',
  styleUrls: ['./absence-request-details.component.scss'],
})
export class AbsenceRequestDetailsComponent implements OnInit {
  private id!: string;
  absenceRequest!: AbsenceRequest;
  name!: string;
  animal!: string;

  statusForm!: FormGroup;

  status: Status[] = [
    { value: 'Pending', viewValue: 'En Attente' },
    { value: 'Accepted', viewValue: 'Accepter' },
    { value: 'Rejected', viewValue: 'Rejeter' },
  ];

  constructor(
    public route: ActivatedRoute,
    private absenceRequestService: AbsenceRequestService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    const param = this.route.snapshot.params;
    this.id = param['id'];
    this.getAbsenceRequest(this.id);
    this.initForm();
  }

  initForm(): void {
    this.statusForm = this.fb.group({
      status: new FormControl('', Validators.required),
    });
  }

  getAbsenceRequest(id: string): void {
    this.absenceRequestService.getAbsenceRequest(id).subscribe((res) => {
      console.log(res);
      this.absenceRequest = res;
    });
  }

  getClass(absenceRequest: AbsenceRequest) {
    return {
      red: absenceRequest.status == 'Rejected',
      green: absenceRequest.status == 'Accepted',
      yellow: absenceRequest.status == 'Pending',
    };
  }

  onNoClick(): void {
    this.router.navigate(['/admin/absence-request']);
  }
  onSubmit(): void {
    const data: AbsenceRequest = {
      ...this.absenceRequest,
      status: this.statusForm.value.status,
      updatedAt: new Date(),
    };
    this.absenceRequestService
      .updateAbsenceRequest(this.id, data)
      .subscribe((res) => {
        console.log(res);
      });

    this.getAbsenceRequest(this.id);
  }
}
