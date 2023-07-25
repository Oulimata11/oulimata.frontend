import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ApiService } from 'app/service/api/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CongesGuard implements CanActivate {
  constructor(private api:ApiService,private routage:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let id_role_user=parseInt(this.api.token.token_decoded.taf_data.id_role);
      let index= this.api.les_droits.list_conges.indexOf(id_role_user)
      if (index==-1) {// l'utilisateur n'est pas autorisé
        this.routage.navigate(['/public/error'], { queryParams: { returnUrl: state.url } });
        return false;
      } else {
        return true;
      }
  }
  
}
