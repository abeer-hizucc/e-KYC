import { Injectable } from "@angular/core";
import { ApplicationAPIEndpoint } from "./api-endpoint.service";
import { HttpClient } from "@angular/common/http";
import { ApplicationFormModel } from "src/app/models/application-models/application-form.model";
import { map } from "rxjs";



@Injectable()
export class GetUserApplicantInfoFromBackendService {
    userId!: string;
    constructor(
        private apiEndpoint: ApplicationAPIEndpoint,
        private http: HttpClient
    ) { }

    getIndividualApplicationInfo() {
        const baseUrl = this.apiEndpoint.getUserInfoUrl();
        const apiUrl = `${baseUrl}/${this.userId}`;
        let applicantInfo$ = this.http.get<ApplicationFormModel>(apiUrl).pipe(
            map((response)=>({
                ...response,
                ekycnumber:this.userId
            }))
        );
        return applicantInfo$;

    }
    setuserId(userId: string) {
        this.userId = userId;
    }
}