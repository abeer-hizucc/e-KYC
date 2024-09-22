import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { OrganizationApplicationService } from "./organization-application.service";

@Injectable()
export class OrganizationTypeService {
    private organizationTypeSubject = new BehaviorSubject<string>('');
    organizationType$ = this.organizationTypeSubject.asObservable();
    constructor(
      private organizationApplicationService:OrganizationApplicationService
    ){}
    setOrganizationType(organizationType: string) {
      this.organizationTypeSubject.next(organizationType);
      this.organizationApplicationService.setOrgType(organizationType);
    }
    getOrganizationType(): string {
      return this.organizationTypeSubject.getValue();
    }
}