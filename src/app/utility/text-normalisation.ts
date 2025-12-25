/**
 * Fonctions utilitaires de normalisation de texte.
 * 
 * Date de dernière modification :
 * - Samedi 22 mars 2025 -
 * 
 * @author Victor Jockin
 * Groupe 2B, BUT2
 */

// normalise le texte passé en paramètres (minuscules sans accent)
export function normalizeText(text:string): string {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() ;
}