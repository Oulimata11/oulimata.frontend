import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private api:ApiService,private routage:Router) { }
    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
      var token= await this.api.get_token()
      console.log("token on guard= ",token)
      if (token!=undefined && token!=null) {
        await this.api.update_data_from_token()
        if (this.api.token.is_expired) {// le token exite mais expiré
          console.log("token existe mais expiré")
          return false
        } else {
          console.log("Utilisateur connecté")
          return true
        }
      } else {
        console.log("Utilisateur non connecté")
       // this.routage.navigate(['/public/login'])
       this.routage.navigate(['/public/error'], { queryParams: { returnUrl: state.url } });
        return false
      }
    }
  
}
