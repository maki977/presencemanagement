import { AbsenceRequest } from './../../../../core/services/absence-request/absence-request.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AbsenceRequestService } from 'src/app/core/services/absence-request/absence-request.service';
import { Router } from '@angular/router';
import { AbsenceRequestFormComponent } from '../components/absence-request-form/absence-request-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-absence-request',
  templateUrl: './absence-request.component.html',
  styleUrls: ['./absence-request.component.scss'],
})
export class AbsenceRequestComponent implements OnInit {
  displayedColumns: string[] = [
    'nameStudent',
    'object',
    'message',
    'createdAt',
    'status',
    'actions',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  animal!: string;
  name!: string;

  constructor(
    private absenceRequestService: AbsenceRequestService,
    public router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {

    this.getAbsenceRequests();
  }

  getAbsenceRequests(): void {
    this.absenceRequestService
      .getAbsenceRequests()
      .subscribe((absenceRequests) => {
        console.log('absence', absenceRequests);

        this.dataSource = new MatTableDataSource(absenceRequests);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  openDialog(abs?: AbsenceRequest): void {
    const dialogRef = this.dialog.open(AbsenceRequestFormComponent, {
      data: { abs },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.getAbsenceRequests();
    });
  }

  showDetails(absenceRequest: AbsenceRequest) {
    this.router.navigate([`/admin/absence-request/${absenceRequest.id}`]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getClass(row:any) {
    return {
      red: row.status == 'Rejected',
      green: row.status == 'Accepted',
      yellow: row.status == 'Pending',
    };
  }

}
