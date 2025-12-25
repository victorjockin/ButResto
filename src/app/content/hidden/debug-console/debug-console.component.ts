// modules
import { Component } from '@angular/core' ;
import { Router }    from '@angular/router' ;

@Component({
  selector: 'app-debug-console',
  templateUrl: './debug-console.component.html',
  styleUrl: './debug-console.component.css'
})
export class DebugConsoleComponent
{
  // constructeur
  constructor(private router : Router) {}

  // initialisation de la vue
  public ngOnInit(): void {
    let count = localStorage.getItem('appNameClicksCount') ;
    if (count != '144') {
      console.log('cheater') ;
      this.router.navigateByUrl('/') ;
    }
    localStorage.removeItem('appNameClicksCount') ;
  }
}