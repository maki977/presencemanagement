import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  Matter,
  MatterService,
} from 'src/app/core/services/matter/matter.service';
import { MatterFormComponent } from './matter-form/matter-form.component';

@Component({
  selector: 'app-matter',
  templateUrl: './matter.component.html',
  styleUrls: ['./matter.component.scss'],
})
export class MatterComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'actions',
  ];
  dataSource!: MatTableDataSource<any>;
  durationInSeconds = 2;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private matterService: MatterService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMatters();
  }

  getMatters(): void {
    this.matterService.getMatters().subscribe((res) => {
      console.log(res);

      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openDialog(user?: any): void {
    const dialogRef = this.dialog.open(MatterFormComponent, {
      data: { roles: [], promotions: [] },
    });
    // dialogRef.afterClosed().subscribe((result) => {
    //   console.log(result);
    //   // this.getUsers();
    // });
  }

  deleteMatter(id: string): void {
    this.matterService.DeleteMatter(id).subscribe(() => {
      this.getMatters();
      this.openSnackBar('User deleted');
    });
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
}
