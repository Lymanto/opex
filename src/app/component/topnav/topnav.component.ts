import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { KeycloakService } from 'keycloak-angular';
import { lastValueFrom, of, switchMap } from 'rxjs';
import { LocalServiceConst } from 'src/app/constanta/local-service-constanta';
import { UserDataDTO } from 'src/app/dto/user-data-dto';
import { LocalStorageService } from 'src/app/services/opex/local-storage/local-storage.service';
import { GetAllUsersService } from 'src/app/services/opex/user/get-all-users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css'],
})
export class TopnavComponent implements OnInit {
  active: boolean = false;
  role: string = '';

  inputPersonalNumber = new FormControl<string>('');

  userInfo: UserDataDTO = <UserDataDTO>{};
  constructor(
    private readonly keycloakService: KeycloakService,
    private readonly GetAllUsersService: GetAllUsersService,
    private readonly localStorageService: LocalStorageService
  ) {}
  logout(): void {
    localStorage.clear();
    this.keycloakService.clearToken();
    this.keycloakService.logout();
  }
  ngOnInit(): void {
    this.getUserInfo();
    this.getRoleFromLocalStorage();
  }

  async getUserInfo(): Promise<void> {
    if (!this.GetAllUsersService.getPersonalInformationFromCache()) {
      try {
        let _data = await this.GetAllUsersService.getUserInfo();
        this.userInfo = _data;
        console.log('ngambil dari getUserInfo');
        console.log('userInfo', this.userInfo);
      } catch {
        Swal.fire({
          title: 'Alert!',
          html: 'failed to get user info',
          // icon: 'success',
          confirmButtonColor: '#276BC5',
        });
      }
    } else {
      let _userInfo: any = {
        ...this.localStorageService.getData(LocalServiceConst.USER_INFO),
      };
      this.userInfo = JSON.parse(_userInfo?._result);
    }
  }
  getRoleFromLocalStorage() {
    const _role: any = {
      ...this.localStorageService.getData(LocalServiceConst.ROLE),
    };
    this.role = _role._result.toUpperCase();
  }

  async changeUserInfo() {
    try {
      const result = await this.GetAllUsersService.getDetailUsers(
        this.inputPersonalNumber.value as string
      );

      console.log('this is result => ', result);

      const result$ = of(result).pipe(switchMap((item) => item));
      const hasil = await lastValueFrom(result$);

      console.log('this is hasil => ', hasil);

      this.localStorageService.clearData();
      this.localStorageService.saveData(
        LocalServiceConst.USER_INFO,
        JSON.stringify(hasil.body)
      );

      if (
        hasil.body?.personalUnit === 'TA' &&
        hasil.body?.personalJob === 'VICE PRESIDENT'
      ) {
        this.role = 'VP_TA';
      } else if (
        hasil.body?.personalUnit === 'TAB' &&
        hasil.body?.personalJob === 'SENIOR MANAGER'
      ) {
        this.role = 'SM_TAB';
      } else if (
        hasil.body?.personalUnit === 'TAB' &&
        hasil.body?.personalJob === 'PROFESSIONAL'
      ) {
        this.role = 'TAB';
      } else if (
        hasil.body?.personalUnit === 'TAM' &&
        hasil.body?.personalJob === 'PROFESSIONAL'
      ) {
        this.role = 'TAM';
      } else if (
        hasil.body?.personalUnit === 'TAM' &&
        hasil.body?.personalJob === 'SENIOR MANAGER'
      ) {
        this.role = 'SM_TAM';
      } else if (
        hasil.body?.personalUnit === 'TAM' &&
        hasil.body?.personalJob === 'VICE PRESIDENT'
      ) {
        this.role = 'VP_TAM';
      } else if (
        hasil.body?.personalUnit === 'TAP' &&
        hasil.body?.personalJob === 'PROFESSIONAL'
      ) {
        this.role = 'TAP';
      } else if (
        hasil.body?.personalUnit === 'TAP' &&
        hasil.body?.personalJob === 'SENIOR MANAGER'
      ) {
        this.role = 'SM_TAP';
      } else if (
        hasil.body?.personalUnit === 'TX' &&
        hasil.body?.personalJob === 'VICE PRESIDENT'
      ) {
        this.role = 'VP_TX';
      } else if (
        hasil.body?.personalUnit === 'TX' &&
        hasil.body?.personalJob === 'SENIOR MANAGER'
      ) {
        this.role = 'SM_TX';
      } else if (
        hasil.body?.personalUnit === 'TXC-3' &&
        hasil.body?.personalJob === 'PROFESSIONAL'
      ) {
        this.role = 'TXC-3';
      } else if (
        hasil.body?.personalUnit === 'TXC' &&
        hasil.body?.personalJob === 'SENIOR MANAGER'
      ) {
        this.role = 'SM_TXC';
      } else if (
        hasil.body?.personalUnit === 'DF' &&
        hasil.body?.personalJob === 'DIRECTOR'
      ) {
        this.role = 'DF';
      } else if (
        hasil.body?.personalUnit === 'DT' &&
        hasil.body?.personalJob === 'DIRECTOR'
      ) {
        this.role = 'DT';
      } else if (hasil.body?.personalJob === 'SENIOR MANAGER') {
        this.role = 'SM_USER';
        // console.log('push list sm', this.role);
      } else if (hasil.body?.personalJob === 'VICE PRESIDENT') {
        this.role = 'VP_USER';
        console.log('push list vp', this.role);
      } else if (hasil.body?.personalJob === 'MANAGER') {
        this.role = 'MANAGER_USER';
      } else {
        this.role = 'USER';
        // console.log('push list user', this.role)
        // console.log('NOT PUSHING user', this.role)
      }
      console.log('ROLE INI ' + this.role);
      // console.log(hasil.body.personalJob);
      // if (
      //   this.userInfo?.personalUnit?.includes('TA') &&
      //   this.userInfo?.personalJob?.includes('VICE PRESIDENT')
      // ) {
      //   this.role = 'VP TA';
      // } else if (
      //   this.userInfo.personalUnit.includes('TAB') &&
      //   this.userInfo?.personalJob.includes('SENIOR MANAGER')
      // ) {
      //   this.role = 'SM TAB';
      // } else if (
      //   this.userInfo.personalUnit.includes('TAB') &&
      //   this.userInfo?.personalJob.includes('PROFESSIONAL')
      // ) {
      //   this.role = 'TAB';
      // } else if (
      //   this.userInfo.personalUnit.includes('TAM') &&
      //   this.userInfo?.personalJob.includes('PROFESSIONAL')
      // ) {
      //   this.role = 'TAM';
      // } else if (
      //   this.userInfo.personalUnit.includes('TAM') &&
      //   this.userInfo?.personalJob.includes('SENIOR MANAGER')
      // ) {
      //   this.role = 'SM TAM';
      // } else if (
      //   this.userInfo.personalUnit.includes('TAM') &&
      //   this.userInfo?.personalJob.includes('VICE PRESIDENT')
      // ) {
      //   this.role = 'VP TAM';
      // } else if (
      //   this.userInfo.personalUnit.includes('TAP') &&
      //   this.userInfo?.personalJob.includes('PROFESSIONAL')
      // ) {
      //   this.role = 'TAP';
      // } else if (
      //   this.userInfo.personalUnit.includes('TAP') &&
      //   this.userInfo?.personalJob.includes('SENIOR MANAGER')
      // ) {
      //   this.role = 'SM TAP';
      // } else if (
      //   this.userInfo.personalUnit.includes('TAP') &&
      //   this.userInfo?.personalJob.includes('VICE PRESIDENT')
      // ) {
      //   this.role = 'VP TAP';
      // } else if (
      //   this.userInfo.personalUnit.includes('TX') &&
      //   this.userInfo?.personalJob.includes('VICE PRESIDENT')
      // ) {
      //   this.role = 'VP TX';
      // } else if (
      //   this.userInfo.personalUnit.includes('TX') &&
      //   this.userInfo?.personalJob.includes('SENIOR MANAGER')
      // ) {
      //   this.role = 'SM TX';
      // } else if (
      //   this.userInfo.personalUnit.includes('TXC-3') &&
      //   this.userInfo?.personalJob.includes('PROFESSIONAL')
      // ) {
      //   this.role = 'TXC-3';
      // } else if (
      //   this.userInfo.personalUnit.includes('DF') &&
      //   this.userInfo?.personalJob.includes('DIRECTOR')
      // ) {
      //   this.role = 'DF';
      // } else if (
      //   this.userInfo.personalUnit.includes('DT') &&
      //   this.userInfo?.personalJob.includes('DIRECTOR')
      // ) {
      //   this.role = 'DT';
      // } else if (this.userInfo?.personalJob?.includes('SM ')) {
      //   this.role = 'SM_USER';
      //   // console.log('push list sm', this.role);
      // } else if (this.userInfo?.personalJob?.includes('VP ')) {
      //   this.role = 'VP_USER';
      //   console.log('push list vp', this.role);
      // } else if (this.userInfo?.personalJob?.includes('MANAGER ')) {
      //   this.role = 'MANAGER_USER';
      // } else {
      //   this.role = 'USER';
      //   // console.log('push list user', this.role)
      //   // console.log('NOT PUSHING user', this.role)
      // }

      // this.role.sort((a, b) => {
      //   const orderA = customOrder[a] || Number.MAX_SAFE_INTEGER;
      //   const orderB = customOrder[b] || Number.MAX_SAFE_INTEGER;
      //   return orderA - orderB;
      // });
      this.localStorageService.saveData(LocalServiceConst.ROLE, this.role);
      this.getUserInfo();
      this.getRoleFromLocalStorage();
      Swal.fire({
        title: 'Success!',
        html:
          'User has changed : ' +
          hasil.body.personalNumber +
          ' with role: ' +
          this.role,
        icon: 'success',
        confirmButtonColor: '#276BC5',
      }).then(() => window.location.reload());
    } catch (error) {
      console.log('error: ', error);
      Swal.fire({
        title: 'Failed!',
        html: 'failed changed user info ',
        icon: 'error',
        confirmButtonColor: '#276BC5',
      });
    }
  }
}
