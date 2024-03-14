import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, Subject, catchError, takeUntil, tap } from 'rxjs';
import { RealizationDTO } from 'src/app/dto/request-verification.dto';
import { ApprovalService } from 'src/app/services/opex/need-approval/approval.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  tabState: string = 'requestVerification';
  idApproval!: string | null;
  data!: RealizationDTO;
  console = console;
  constructor(
    private route: ActivatedRoute,
    private approval: ApprovalService
  ) {}
  private readonly _onDestroy$: Subject<void> = new Subject<void>();
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.idApproval = params.get('id');
    });
    if (this.idApproval) {
      this.getApprovalById(this.idApproval);
    }
  }
  getApprovalById(id: string) {
    this.approval
      .getApprovalById(id)
      .pipe(
        catchError((err) => {
          console.error('Error occurred:', err);
          return EMPTY;
        }),
        tap((result: any) => {
          if (result) {
            // Ensure result.data is a single array of glAccountType objects

            this.data = result.realization;
          }
        }),
        takeUntil(this._onDestroy$)
      )
      .subscribe();
  }
}
