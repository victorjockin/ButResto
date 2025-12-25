// énumérations
import { MenuStatus } from "../enum/menu-status" ;

/**
 * Classe modèle représentant un menu.
 * 
 * Date de dernière modification :
 * - Mercredi 12 février 2025 -
 * 
 * @author Victor Jockin
 * Groupe 2B, BUT2
 */
export class Menu
{
  // constructeur et attributs
  constructor(
    public id           : number     = 0,
    public name         : string     = "",
    public description  : string     = "",
    public creationDate : string     = "",
    public status       : MenuStatus = MenuStatus.INACTIVE
  ) {}
}