import{Injectable} from '@angular/core';
@Injectable()
 export class FormatDateService{
    formatDate(inputDate: string): string  {
        const months: { [key: string]: string } = {
          Jan: '01',
          Feb: '02',
          Mar: '03',
          Apr: '04',
          May: '05',
          Jun: '06',
          Jul: '07',
          Aug: '08',
          Sep: '09',
          Oct: '10',
          Nov: '11',
          Dec: '12',
        };
      
        const parts = inputDate.split(' ');
        const day = parts[0];
        const month = months[parts[1]];
        const year = parts[2];
      
        return `${year}-${month}-${day}`;
      } 

}