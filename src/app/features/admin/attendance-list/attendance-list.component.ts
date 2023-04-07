import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CallData, PresenceCallList } from 'src/app/core/models/callData.model';
import { callData } from 'src/app/core/services/attendance-list/attendance-list.service';

@Component({
  selector: 'app-attendance-list',
  templateUrl: './attendance-list.component.html',
  styleUrls: ['./attendance-list.component.scss'],
})
export class AttendanceListComponent implements OnInit {
  displayedColumns: string[] = [
    'matter',
    'start',
    'end',
    'createdAt',
    'numberPresent',
    'numberAbsence',
    'action',
  ];
  dataSource!: MatTableDataSource<PresenceCallList>;
  animal!: string;
  name!: string;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private router: Router, public dialog: MatDialog) {}
  ngOnInit(): void {
    this.initDataSource();
  }

  initDataSource(): void {
    this.dataSource = new MatTableDataSource(callData);
  }

  getNumberPresence(data: CallData[]): number {
    const presenceCount = data.filter((s) => s.isPresent === true).length;

    return presenceCount;
  }

  getNumberAbsence(data: CallData[]): number {
    const absenceCount = data.filter((s) => s.isPresent === false).length;

    return absenceCount;
  }

  showDetails(id: string) {
    this.router.navigate([`admin/attendance-list/${id}`]);
  }

  makeCall() {
    this.router.navigate(['admin/attendance-list/call']);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
