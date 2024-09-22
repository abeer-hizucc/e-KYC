import { Injectable } from "@angular/core";
import { RegistrationAPIEndpoint } from "./api-endpoint.service";
import { HttpClient } from "@angular/common/http";
import { ConfirmInfoModel,ConfirmInfoPorichoyModel } from "src/app/models/registration-models/confirm-info.model";
import { Observable } from "rxjs";
import { NIDResponseModel,NIDResponsePorichoyModel } from "src/app/models/registration-models/nid-response.model";


@Injectable()
export class NidCallService {
   apiUrl = this.url.getNIDInfoRequestUrl(); 
    constructor(
        private url: RegistrationAPIEndpoint,
        private http:HttpClient
    ){}
postNIDConfirmationInfo(data:ConfirmInfoPorichoyModel):Observable<NIDResponsePorichoyModel>{
    const formData = new FormData();
    formData.append("file", data.photo);
    formData.append("nid", data.nid);
    formData.append("dob", data.dob);
    return this.http.post<NIDResponsePorichoyModel>(this.apiUrl,formData);
}
  
}