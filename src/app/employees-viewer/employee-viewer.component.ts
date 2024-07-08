import { AsyncPipe } from '@angular/common';
import { Component, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map, of, switchMap } from 'rxjs';

import { Employee } from '../employee';
import { EmployeeDetailComponent } from '../employee-detail-view/employee-detail-view.component';
import { EmployeeFilterComponent } from '../employee-filter/employee-filter.component';
import { EmployeeListComponent } from '../employee-list/employee-list.component';
import { EmployeeLoaderService } from '../employee-loader.service';

@Component({
  selector: 'app-employee-viewer',
  templateUrl: './employee-viewer.component.html',
  styleUrl: './employee-viewer.component.scss',
  standalone: true,
  imports: [
    EmployeeFilterComponent,
    EmployeeListComponent,
    EmployeeDetailComponent,
    AsyncPipe
  ]
})
export default class EmployeeViewerComponent {
  filteredList: Signal<Employee[]>;
  selectedEmployee: Signal<Employee | undefined>;

  constructor(
    employeeLoader: EmployeeLoaderService,
    route: ActivatedRoute
  ) {
    this.filteredList = toSignal(
      route.queryParamMap.pipe(
        map(params => params.get('employeeFilter')),
        switchMap(filter => employeeLoader.getList(filter ?? ''))
      ),
      { initialValue: [] }
    );

    this.selectedEmployee = toSignal(
      route.queryParamMap.pipe(
        map(params => params.get('employeeId')),
        switchMap(id => {
          if (id) {
            return employeeLoader.getDetails(id);
          } else {
            return of(undefined);
          }
        })
      )
    );
  }
}
