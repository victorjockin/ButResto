// modules
import { Pipe, PipeTransform } from '@angular/core' ;

// utilitaires
import { normalizeText } from '../utility/text-normalisation' ;

/**
 * Pipe permettant de mettre en évidence certaines parties d'un texte.
 * 
 * Date de dernière modification :
 * - Samedi 22 mars 2025 -
 * 
 * @author Victor Jockin
 * Groupe 2B, BUT2
 */
@Pipe({ name: 'splitForHighlight' })
export class SplitForHighlightPipe implements PipeTransform {
  transform(value: any, filter: string): { text: string, highlighted: boolean }[] {
    const string = String(value) ;
    if (filter.trim()) {
      const keywords        = normalizeText(filter.trim()).split(/\s+/) ;
      const regex           = new RegExp(`(${keywords.join('|')})`, 'gi') ;
      const normalizedParts = normalizeText(string).split(regex) ;
      let originalParts     = [] ;
      let lastIndex         = 0 ;
      for (let i = 0 ; i < normalizedParts.length ; i++) {
        if (normalizedParts[i].toLowerCase() == normalizedParts[i]) {
          originalParts.push(string.slice(lastIndex, lastIndex + normalizedParts[i].length)) ;
        } else {
          originalParts.push(normalizedParts[i]) ;
        }
        lastIndex += normalizedParts[i].length ;
      }
      return originalParts.map(part => ({
        text        : part.replace(/ /g, '\u00A0'),
        highlighted : keywords.some(word => normalizeText(part) == word)
      })) ;
    }
    return [{ text: string.replace(/ /g, '\u00A0'), highlighted: false }] ;
  }
}