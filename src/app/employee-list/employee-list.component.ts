import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Employee } from '../employee';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
  standalone: true,
  imports: [NgFor, RouterLink]
})
export class EmployeeListComponent {
  @Input() list: Employee[] = [];
  @Input() selectedId?: number;
}
