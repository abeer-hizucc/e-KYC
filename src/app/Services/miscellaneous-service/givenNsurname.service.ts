import { Injectable } from "@angular/core";

@Injectable()
export class GivenNsurnameService {
    extractGivenAndSurname(data: string): [string, string] {
        const lastSpaceIndex = data.lastIndexOf(' ');
        if (lastSpaceIndex == -1) {
            return [data, ''];
        }
        const givenName = data.slice(0, lastSpaceIndex);
        const surname = data.slice(lastSpaceIndex + 1);

        return [givenName, surname];
    }
}