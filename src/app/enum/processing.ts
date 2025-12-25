/**
 * Classe d'énumération des types de traitement.
 * 
 * Date de dernière modification :
 * - Samedi 1er mars 2025 -
 * 
 * @author Victor Jockin
 * Groupe 2B, BUT2
 */
export enum Processing
{
  ADD    = 'ADD',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE'
}
export namespace Processing {
  export function getTranslationKey(p:Processing|null): string {
    switch (p) {
      case Processing.ADD :    return 'processing.addition' ;
      case Processing.UPDATE : return 'processing.update' ;
      case Processing.DELETE : return 'processing.deletion' ;
      default :                return '' ;
    }
  }
}