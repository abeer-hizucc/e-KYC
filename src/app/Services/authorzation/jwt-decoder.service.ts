import { Injectable } from "@angular/core";
import { jwtDecode } from "jwt-decode";


@Injectable({
    providedIn: 'root'
})
export class JwtDecoderService{
    decodeToken(token:string):string{
        return jwtDecode(token);
    }
}