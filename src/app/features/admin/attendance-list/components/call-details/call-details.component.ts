import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CallData, PresenceCallList } from 'src/app/core/models/callData.model';
import { AttendanceListService } from 'src/app/core/services/attendance-list/attendance-list.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

// const ELEMENT_DATA: PeriodicElement[] = [
//   { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
//   { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
//   { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
//   { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
//   { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
//   { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
//   { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
//   { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
//   { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
//   { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
// ];

@Component({
  selector: 'app-call-details',
  templateUrl: './call-details.component.html',
  styleUrls: ['./call-details.component.scss'],
})
export class CallDetailsComponent implements OnInit {
  id!: string;
  displayedColumns: string[] = ['lastName', 'firstName', 'email', 'status'];
  dataSource!: CallData[];

  callDataInfos!: CallData[];
  callList!: PresenceCallList;

  constructor(
    public route: ActivatedRoute,
    private attendanceListService: AttendanceListService
  ) {}

  ngOnInit(): void {
    const param = this.route.snapshot.params;
    this.id = param['id'];
    console.log(this.id);
    this.getList();
    // console.log(this.callList);
  }

  getList(): void {
    this.callList = this.attendanceListService.getPresenceCallLists1(this.id);

    if (this.callList) {
      this.dataSource = this.callList['presenceList'];
      console.log('datas', this.dataSource);
    } else {
      this.dataSource = [];
    }
  }

  printData(): void {
    console.log('List imprimer avec success');
  }

  getClass(row: CallData) {
    return {
      red: row.isPresent == true,
      green: row.isPresent == false,
    };
  }

  getText(row: CallData): string {
    if (row.isPresent == true) {
      return 'Présent';
    } else {
      return 'Absent';
    }
  }
}
