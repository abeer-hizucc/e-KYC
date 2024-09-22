import { Injectable } from '@angular/core';
import { ConfirmInfoModel } from 'src/app/models/registration-models/confirm-info.model';
import { Observable, BehaviorSubject } from 'rxjs';
@Injectable()

export class NIDAndDOBService {
    private responseData$: BehaviorSubject<ConfirmInfoModel | null> = new BehaviorSubject<ConfirmInfoModel | null>(null);

    setResponseData(data: ConfirmInfoModel) {
        this.responseData$.next(data);
    }
    getResponseData(): Observable<ConfirmInfoModel | null> {
        return this.responseData$.asObservable();
    }
}