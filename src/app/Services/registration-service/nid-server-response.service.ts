import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { NIDResponseModel,NIDResponsePorichoyModel } from "src/app/models/registration-models/nid-response.model";

@Injectable()
export class NidServerResponseService{
    private nidServerResponseData$ :BehaviorSubject<NIDResponsePorichoyModel | null> = new BehaviorSubject<any | null>(null);

    setResponseData(data: NIDResponsePorichoyModel){
        this.nidServerResponseData$.next(data);
    }
    getResponseData(): Observable <any | null>{
        return this.nidServerResponseData$.asObservable();
    }
}