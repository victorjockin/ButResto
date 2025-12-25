// modules
import { Pipe, PipeTransform } from '@angular/core' ;

// services
import { TranslationService } from '../service/translation.service' ;

/**
 * Pipe permettant de traduire le contenu des templates.
 * 
 * Date de dernière modification :
 * - Mardi 6 mai 2025 -
 * 
 * @author Victor Jockin
 * Groupe 2B, BUT2
 */
@Pipe({ name: 'translate', pure: false })
export class TranslatePipe implements PipeTransform
{
  // constructeur
  constructor(private translationService: TranslationService) {}

  // transformation
  transform(value: string | { key: string, params?: { [key: string]: any } }): string {
    if (typeof value === 'string') {
      return this.translationService.getTranslation(value) ;
    }
    if (typeof value === 'object' && value.key) {
      return this.translationService.getTranslation(value.key, value.params) ;
    }
    return '' ;
  }
}