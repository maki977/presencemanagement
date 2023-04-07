import { ClasseSchoolService } from './../../../../core/services/classe-school/classe-school.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import {MatSnackBar,MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Classe } from 'src/app/core/models/Classe';
import { FormaddeditComponent } from '../formaddedit/formaddedit.component';
@Component({
  selector: 'app-classe-school',
  templateUrl: './classe-school.component.html',
  styleUrls: ['./classe-school.component.scss']
})
export class ClasseSchoolComponent implements OnInit  {
  displayedColumns: string[] = [
    'nom',
    'Annee de promotion'
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _classeservice: ClasseSchoolService,

  ) {}
  ngOnInit(): void {

  }
  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(FormaddeditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {

        }
      },
    });
  }
  getClasse() {
    this._classeservice.getAll().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
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
  openEditForm(data: any) {
    const dialogRef = this._dialog.open(FormaddeditComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getClasse();
        }
      },
    })
  }

}
