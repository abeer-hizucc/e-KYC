import { Injectable } from "@angular/core";
import { RegistrationAPIEndpoint } from "./api-endpoint.service";
import { UserInfoModel } from "src/app/models/registration-models/user-info.model";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { UserCreationResponseModel } from "src/app/models/registration-models/user-creation-response.model";

@Injectable()
export class UserRegistrationService {
    url = this.regAPI.getUserRegistrationUrl();
    constructor(private regAPI: RegistrationAPIEndpoint,
        private http: HttpClient
    ) {

    }
    registerUserInfo(userInfo: UserInfoModel): Observable<any> {
        return this.http.post<UserCreationResponseModel>(this.url, userInfo);
    }
}