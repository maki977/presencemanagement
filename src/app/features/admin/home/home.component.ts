import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AbsenceRequest, AbsenceRequestService } from 'src/app/core/services/absence-request/absence-request.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent  {
  displayedColumns: string[] = [
    'nameStudent',
    'object',
    'message',
    'createdAt',
    'status',
    'actions',
  ];
  dataSource!: MatTableDataSource<AbsenceRequest>;
  durationInSeconds = 2;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  absence!: AbsenceRequest;

  constructor(
    private absenceRequestService: AbsenceRequestService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
this. getAbsenceRequests()
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

  updateStatus(absenceRequest:AbsenceRequest, statusname: string): void {
    console.log(absenceRequest);
    absenceRequest.status = statusname;

    this.absenceRequestService.updateAbsenceRequest(absenceRequest.id, absenceRequest)
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'x', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 2000,
    });
  }
  getClass(row:any) {
    return {
      red: row.status == 'Rejected',
      green: row.status == 'Accepted',
      yellow: row.status == 'Pending',
    };
  }

}
