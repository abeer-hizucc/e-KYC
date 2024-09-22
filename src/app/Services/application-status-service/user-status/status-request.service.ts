import { Injectable } from "@angular/core";
import { UserStatusApiEndpointService } from "./api-endpoint.service";
import { HttpClient } from "@angular/common/http";
import { UserApplicationStatus } from "src/app/models/application-status-models/application-status.model";
import { Observable } from "rxjs";


@Injectable()
export class UserApplicationStatusRequestService{
    constructor(
        private apiEndpointService:UserStatusApiEndpointService,
        private http:HttpClient
    ){}

    getUserApplicationStatus(): Observable<UserApplicationStatus[]> {
        const userId = sessionStorage.getItem('userId');
        return this.http.get<UserApplicationStatus[]>(
          this.apiEndpointService.getUserApplicationStatusUrl() + userId
        );
      }
}