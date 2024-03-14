import { Component, Input, OnInit } from '@angular/core';
import { EMPTY, Subject, catchError, takeUntil, tap } from 'rxjs';
import { LocalServiceConst } from 'src/app/constanta/local-service-constanta';
import { UserDataDTO } from 'src/app/dto/user-data-dto';
import { LocalStorageService } from 'src/app/services/opex/local-storage/local-storage.service';
import { ApprovalService } from 'src/app/services/opex/need-approval/approval.service';
import { GetAllUsersService } from 'src/app/services/opex/user/get-all-users.service';
import Swal from 'sweetalert2';

type SidebarData = {
  path: string;
  title: string;
  src: string;
  srcActive: string;
  isSubMenuActive?: boolean;
  subMenu?: Array<SubMenu>;
  needApproval?: string;
};
type SubMenu = {
  path: string;
  title: string;
};

export const sidebarData: SidebarData[] = [
  {
    path: '/dashboard',
    title: 'Dashboard',
    src: 'assets/images/icons/ic-dashboard.svg',
    srcActive: 'assets/images/icons/ic-dashboard-active.svg',
  },

  {
    path: '/need-approval',
    title: 'Need Approval',
    src: 'assets/images/icons/ic-approval.svg',
    srcActive: 'assets/images/icons/ic-approval-active.svg',
    needApproval: '0',
  },
  {
    path: '/reallocation-budget',
    title: 'Reallocation Budget',
    src: 'assets/images/icons/ic-reallocation.svg',
    srcActive: 'assets/images/icons/ic-reallocation-active.svg',
    isSubMenuActive: false,
    subMenu: [
      {
        path: '/general',
        title: 'General',
      },
      {
        path: '/realokasi-corporate',
        title: 'Realokasi Corporate',
      },
    ],
  },
  {
    path: '/report',
    title: 'Report',
    src: 'assets/images/icons/ic-report.svg',
    srcActive: 'assets/images/icons/ic-report-active.svg',
    isSubMenuActive: false,
    subMenu: [
      {
        path: '/summary',
        title: 'Summary',
      },
      {
        path: '/view-budget',
        title: 'View Budget',
      },
      {
        path: '/personnel-summary',
        title: 'Personnel Summary',
      },
    ],
  },
  {
    path: '/guidance-application',
    title: 'Guidance Application',
    src: 'assets/images/icons/ic-guide.svg',
    srcActive: 'assets/images/icons/ic-guide-active.svg',
  },
  {
    path: '/feedback-application',
    title: 'Feedback Application',
    src: 'assets/images/icons/ic-feedback.svg',
    srcActive: 'assets/images/icons/ic-feedback-active.svg',
  },
  {
    path: '/master-data',
    title: 'Master Data',
    src: 'assets/images/icons/ic-master.svg',
    srcActive: 'assets/images/icons/ic-master-active.svg',
    isSubMenuActive: false,

    subMenu: [
      {
        path: '/summary',
        title: 'Summary',
      },
      {
        path: '/view-budget',
        title: 'View Budget',
      },
      {
        path: '/kurs-usd',
        title: 'Kurs USD',
      },
      {
        path: '/cost-center',
        title: 'Cost Center',
      },
      {
        path: '/glaccount',
        title: 'GL Account',
      },
    ],
  },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  @Input() active: string = '';
  @Input() activeSubMenu: string = '';
  needApproval!: string;

  sidebarData: SidebarData[] = sidebarData;
  ngOnInit() {
    sidebarData[1]['needApproval'] = this.needApproval;
    this.getUserInfo();
    this.getNeedApprovalNumber();
  }
  userInfo: UserDataDTO = <UserDataDTO>{};
  constructor(
    private approval: ApprovalService,
    private readonly localStorageService: LocalStorageService,
    private users: GetAllUsersService
  ) {}
  private readonly _onDestroy$: Subject<void> = new Subject<void>();

  async getUserInfo(): Promise<void> {
    if (!this.users.getPersonalInformationFromCache()) {
      try {
        let _data = await this.users.getUserInfo();
        this.userInfo = _data;
      } catch {
        Swal.fire({
          title: 'Alert!',
          html: 'failed to get user info',
          // icon: 'success',
          confirmButtonColor: '#1F569D',
        });
      }
    } else {
      let _userInfo: any = {
        ...this.localStorageService.getData(LocalServiceConst.USER_INFO),
      };
      this.userInfo = JSON.parse(_userInfo?._result);
    }
  }
  getNeedApprovalNumber(): void {
    this.approval
      .getCountApproval(this.userInfo.personalNumber)
      .pipe(
        catchError((err) => {
          console.error('Error occurred:', err);
          return EMPTY;
        }),
        tap((result) => {
          const allData = result.data; // Convert array of arrays to a single array

          sidebarData[1]['needApproval'] = allData as unknown as string;
        }),
        takeUntil(this._onDestroy$)
      )
      .subscribe();
  }
}
