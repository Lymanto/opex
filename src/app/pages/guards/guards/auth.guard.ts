import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
import { Observable, lastValueFrom, tap } from 'rxjs';
import { LocalServiceConst } from 'src/app/constanta/local-service-constanta';
import { UserDataDTO } from 'src/app/dto/user-data-dto';
import { GetAllUsersService } from 'src/app/services/opex/user/get-all-users.service';
import { LocalStorageService } from 'src/app/services/opex/local-storage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard extends KeycloakAuthGuard implements CanActivateChild {
  userInfo: UserDataDTO = <UserDataDTO>{};
  role: string = '';
  localStorageService: any;

  constructor(
    protected override readonly router: Router,
    protected readonly keycloak: KeycloakService,
    private readonly userSoeService: GetAllUsersService
  ) {
    super(router, keycloak);
    this.localStorageService = new LocalStorageService();
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.isAccessAllowed(childRoute, state);
  }

  public async isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    // Force the user to log in if currently unauthenticated.
    if (!this.authenticated) {
      await this.keycloak.login();

      localStorage.clear();

      const userProfile = await this.keycloak.loadUserProfile(true);

      const result = await this.userSoeService.getDetailUsers(
        userProfile.username as string
      );
      console.log('userProfile', userProfile);
      this.userInfo = (await lastValueFrom(result)).body;

      this.localStorageService.saveData(
        LocalServiceConst.USER_INFO,
        JSON.stringify(result)
      );
    }

    if (!this.userSoeService.getPersonalInformationFromCache()) {
      const userProfile = await this.keycloak.loadUserProfile(true);

      const result = await this.userSoeService.getDetailUsers(
        userProfile.username as string
      );
      console.log(result);

      // console.log('userProfile', userProfile)
      result
        .pipe(
          tap((v) => {
            console.log('keluar');
            console.log(v);
          })
        )
        .subscribe();
      this.userInfo = (await lastValueFrom(result)).body;

      // this.localStorageService.saveData(LocalServiceConst.KEYCLOACK_INFO, JSON.stringify(userProfile));
      this.localStorageService.saveData(
        LocalServiceConst.USER_INFO,
        JSON.stringify(result)
      );

      // location.reload();
    }

    // console.log( this.keycloak.login());

    // Get the roles required from the route.
    const requiredRoles = route.data['roles'];

    // console.log('requiredRoles 1', requiredRoles);

    // Set role to localstorage
    let _role: any = {
      ...this.localStorageService.getData(LocalServiceConst.ROLE),
    };

    // if (!_role._result) {
    // Define a custom sorting order based on prefixes
    // const customOrder: { [key: string]: number } = {
    //   USER: 1,
    //   SM_USER: 2,
    //   VP_USER: 3,
    //   MANAGER_PMO: 4,
    //   PMO: 5,
    //   SM_PMO: 6,
    //   MANAGER_SME_SDA: 7,
    //   MANAGER_SME_SAP: 8,
    //   MANAGER_SME_INFRA: 9,
    //   SME_SDA: 10,
    //   SME_SAP: 11,
    //   SME_INFRA: 12,
    //   SM_ICT_SDA: 13,
    //   SM_ICT_SAP: 14,
    //   SM_ICT_INFRA: 15,
    //   VP_ICT: 16,
    // };
    const keycloackRole = this.keycloak.getUserRoles();
    // console.log(this.keycloak.getUserRoles());
    const activeRole = [
      'user',
      'sm_user',
      'vp_user',
      'manager_user',
      'pmo',
      'sm_pmo',
      'manager_sme_sda',
      'manager_sme_sap',
      'manager_sme_infra',
      'sme_sda',
      'sme_sap',
      'sme_infra',
      'sm_ict_sda',
      'sm_ict_sap',
      'sm_ict_infra',
      'vp_ict',
    ];
    // FILTERING ROLE
    // this.role = keycloackRole
    //   .filter((v) => activeRole.includes(v))
    //   .map((v) => v.toUpperCase());

    // injecting user, sm_user and vp_user keycloackRole by userinfo
    if (
      this.userInfo?.personalUnit?.includes('TA') &&
      this.userInfo?.personalJob?.includes('VICE PRESIDENT')
    ) {
      this.role = 'VP_TA';
    } else if (
      this.userInfo.personalUnit.includes('TAB') &&
      this.userInfo?.personalJob.includes('SENIOR MANAGER')
    ) {
      this.role = 'SM_TAB';
    } else if (
      this.userInfo.personalUnit.includes('TAB') &&
      this.userInfo?.personalJob.includes('PROFESSIONAL')
    ) {
      this.role = 'TAB';
    } else if (
      this.userInfo.personalUnit.includes('TAM') &&
      this.userInfo?.personalJob.includes('PROFESSIONAL')
    ) {
      this.role = 'TAM';
    } else if (
      this.userInfo.personalUnit.includes('TAM') &&
      this.userInfo?.personalJob.includes('SENIOR MANAGER')
    ) {
      this.role = 'SM_TAM';
    } else if (
      this.userInfo.personalUnit.includes('TAM') &&
      this.userInfo?.personalJob.includes('VICE PRESIDENT')
    ) {
      this.role = 'VP_TAM';
    } else if (
      this.userInfo.personalUnit.includes('TAP') &&
      this.userInfo?.personalJob.includes('PROFESSIONAL')
    ) {
      this.role = 'TAP';
    } else if (
      this.userInfo.personalUnit.includes('TAP') &&
      this.userInfo?.personalJob.includes('SENIOR MANAGER')
    ) {
      this.role = 'SM_TAP';
    } else if (
      this.userInfo.personalUnit.includes('TAP') &&
      this.userInfo?.personalJob.includes('VICE PRESIDENT')
    ) {
      this.role = 'VP_TAP';
    } else if (
      this.userInfo.personalUnit.includes('TX') &&
      this.userInfo?.personalJob.includes('VICE PRESIDENT')
    ) {
      this.role = 'VP_TX';
    } else if (
      this.userInfo.personalUnit.includes('TX') &&
      this.userInfo?.personalJob.includes('SENIOR MANAGER')
    ) {
      this.role = 'SM_TX';
    } else if (
      this.userInfo.personalUnit.includes('TXC-3') &&
      this.userInfo?.personalJob.includes('PROFESSIONAL')
    ) {
      this.role = 'TXC-3';
    } else if (
      this.userInfo.personalUnit.includes('DF') &&
      this.userInfo?.personalJob.includes('DIRECTOR')
    ) {
      this.role = 'DF';
    } else if (
      this.userInfo.personalUnit.includes('DT') &&
      this.userInfo?.personalJob.includes('DIRECTOR')
    ) {
      this.role = 'DT';
    } else if (this.userInfo?.personalTitle?.includes('SM ')) {
      this.role = 'SM_USER';
      // console.log('push list sm', this.role);
    } else if (this.userInfo?.personalTitle?.includes('VP ')) {
      this.role = 'VP_USER';
      console.log('push list vp', this.role);
    } else if (this.userInfo?.personalTitle?.includes('MANAGER ')) {
      this.role = 'MANAGER_USER';
    } else {
      this.role = 'USER';
      // console.log('push list user', this.role)
      // console.log('NOT PUSHING user', this.role)
    }

    // this.role.sort((a, b) => {
    //   const orderA = customOrder[a] || Number.MAX_SAFE_INTEGER;
    //   const orderB = customOrder[b] || Number.MAX_SAFE_INTEGER;
    //   return orderA - orderB;
    // });
    this.localStorageService.saveData(LocalServiceConst.ROLE, this.role);
    // } else {
    //   // console.log('masuk 2');
    //   this.role = [_role?._result];
    //   // console.log('ROLE =>', _role);
    // }

    // const userProfile = await this.keycloak.loadUserProfile(true);

    // const result = await this.userSoeService.getUserInfo(userProfile.username);

    // this.localservice.saveData('USER_INFO', JSON.stringify(result));

    // this.userService
    //   .getData({GET_SOE_PERSONAL_INFO: {personalNumber: userProfile.username! }}, 'GET_SOE_PERSONAL_INFO')
    //   .valueChanges
    //   .subscribe((value) => {
    //     this.localservice.saveData('USER_INFO', JSON.stringify(value.data.personalInfo));
    //   });

    // Allow the user to proceed if no additional roles are required to access the route.
    if (!(requiredRoles instanceof Array) || requiredRoles?.length === 0) {
      return true;
    }

    // Allow the user to proceed if all the required roles are present.
    // console.log('requiredRoles 3', requiredRoles.includes(this.role));
    console.log('requiredRoles 4', this.role);
    // console.log('requiredRoles 5', requiredRoles.some((role) => this.role.includes(role)));

    return requiredRoles.some((role) => this.role.includes(role));
  }
}
