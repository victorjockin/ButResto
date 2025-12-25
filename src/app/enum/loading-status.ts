/**
 * Classe d'énumération des états de chargement.
 * 
 * Date de dernière modification :
 * - Dimanche 23 février 2025 -
 * 
 * @author Victor Jockin
 * Groupe 2B, BUT2
 */
export enum LoadingStatus
{
  LOADING = "LOADING",    // contenu en cours de chargement
  LOADED  = "LOADED",     // contenu chargé
  SUCCESS = "SUCCESS",    // chargement du contenu terminé et vue prête à être affichée
  ERROR   = "ERROR"       // erreur survenue au cours du chargement du contenu
}