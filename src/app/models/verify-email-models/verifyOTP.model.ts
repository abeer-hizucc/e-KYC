

export interface VerifyOTPRequestModel{
    email:string;
    otp:string;
}
export interface VerifyOTPResponseModel{
    status:number;
    message:string;
}