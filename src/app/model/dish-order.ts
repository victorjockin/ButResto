// énumérations
import { OrderStatus } from "../enum/order-status" ;

/**
 * Classe modèle représentant un plat dans une commande.
 * 
 * Date de dernière modification :
 * - Samedi 24 mai 2025 -
 * 
 * @author Victor Jockin
 * Groupe 2B, BUT2
 */
export class DishOrder
{
  // constructeur et attributs
  constructor(
    public id       : number      = 0,
    public dishName : string      = "",
    public servedAt : Date|null   = null,
    public status   : OrderStatus = OrderStatus.NOT_SERVED
  ) {}
}