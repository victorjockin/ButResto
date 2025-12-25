// modules
import { Injectable } from '@angular/core' ;

@Injectable({ providedIn: 'root' })

/**
 * Service fournissant des méthodes relatives aux dates.
 * 
 * Date de dernière modification :
 * - Mercredi 19 février 2025 -
 * 
 * @author Victor Jockin
 * Groupe 2B, BUT2
 */
export class DateService
{
  constructor() { }

  // accesseur : donne la date courante au format YYYY-MM-DD
  public getCurrentDate(): string { return new Date().toISOString().split('T')[0] ; }

  // accesseur : donne l'année courante
  public getCurrentYear(): number { return new Date().getFullYear() ; }
}