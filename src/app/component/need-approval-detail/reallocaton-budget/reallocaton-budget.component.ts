import { Component } from '@angular/core';
import { RealizationDTO } from 'src/app/dto/request-verification.dto';

@Component({
  selector: 'app-reallocaton-budget',
  templateUrl: './reallocaton-budget.component.html',
  styleUrls: ['./reallocaton-budget.component.css'],
})
export class ReallocatonBudgetComponent {
  data!: RealizationDTO;
}
