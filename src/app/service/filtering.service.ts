// modules
import { Injectable } from '@angular/core' ;

// services
import { TranslationService } from './translation.service' ;

// fonctions utilitaires
import { normalizeText } from '../utility/text-normalisation' ;

/**
 * Service de filtre.
 * 
 * Date de dernière modification :
 * - Samedi 5 avril 2025 -
 * 
 * @author Victor Jockin
 * Groupe 2B, BUT2
 */
@Injectable({ providedIn: 'root' })
export class FilteringService
{
  // constructeur
  constructor(private translationService: TranslationService) {}

  // filtre une liste par mots clés
  public filterByKeywords(
    list     : any[],
    fields   : string[],
    keywords : string
  ): any[] {
    if (keywords && keywords.trim()) {
      const normalizedKeywords = normalizeText(keywords.trim()).split(/\s+/) ;
      return list.filter(object => {
        const normalizedFields = fields.map(field => {
          const fieldValue = String(object[field] ?? '') ;
          const translatedFieldValue = this.translationService.getTranslation(fieldValue.toLocaleLowerCase()) ;
          return normalizeText(translatedFieldValue);
        }).join(' ') ;
        return normalizedKeywords.every(word => normalizedFields.includes(word)) ;
      }) ;
    }
    return list ;
  }
}
