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
import { Role } from 'src/app/core/models/role.model';
import { User } from 'src/app/core/models/user.model';

import { RoleService } from 'src/app/core/services/role/role.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { UserFormComponent } from './components/user-form/user-form.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = [
    'lastName',
    'firstName',
    'email',
    'createdAt',
    'phone',
    'actions',
  ];
  dataSource!: MatTableDataSource<User>;
  durationInSeconds = 2;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  roles!: Role[];

  user!: User;

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.userService.get().subscribe((users) => {
      this.dataSource = new MatTableDataSource(users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openDialog(user?: User): void {
    const dialogRef = this.dialog.open(UserFormComponent, {
      data: { roles: this.roles, user },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      this.getAll();
    });
  }

  deleteUser(userId: number): void {
    this.userService.delete(userId).subscribe({
      next: (res) => {
        this.openSnackBar('Employee deleted!');
        this.getAll();
      },
      error: console.log,
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
