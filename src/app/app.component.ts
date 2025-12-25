// modules
import { Component } from '@angular/core' ;
import { Router }    from '@angular/router' ;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent
{
  // attributs
  public title: string = 'prj-restaurant' ;

  // constructeur
  constructor(public router: Router) {}
}