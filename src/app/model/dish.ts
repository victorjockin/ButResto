/**
 * Classe modèle représentant un plat.
 * 
 * Date de dernière modification :
 * - Mercredi 12 février 2025 -
 * 
 * @author Victor Jockin
 * Groupe 2B, BUT2
 */
export class Dish 
{
  // constructeur et attributs
  constructor(
    public id       : number      = 0,
    public menuId   : number|null = null,
    public name     : string      = "",
    public calories : number      = 0
  ) {}
}