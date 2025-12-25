// modules
import { Pipe, PipeTransform } from '@angular/core' ;

/**
 * Pipe de formatage des dates pour affichage.
 * 
 * Date de dernière modification :
 * - Mercredi 12 février 2025 -
 * 
 * @author Victor Jockin
 * Groupe 2B, BUT2
 */
@Pipe({ name: 'formatedDate' })
export class FormattedDatePipe implements PipeTransform
{
  transform(value: string): string
  {
    return value.substring(8,10)
      + '/' + value.substring(5,7)
      + '/' + value.substring(0,4) ;
  }
}