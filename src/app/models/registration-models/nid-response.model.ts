export interface NIDResponseModel {
    code:number;
    nid: string;
    dob:string;
    name:string;
    father:string;
    mother:string;
}
export interface NIDResponsePorichoyModel{
    percentage: number;
    nameEn: string;
    fatherEn: string;
    motherEn: string;
    nationalId:string;
    dob:string;
}