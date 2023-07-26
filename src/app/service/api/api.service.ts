import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import moment from 'moment';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  local_storage_prefixe = "oulimata.frontend";
  //taf_base_url = "http://localhost/oulimata.backend/";
  taf_base_url = "http://localhost/os/oulimata.backend/";

  network: any = {
    token: undefined,
    status: true,
    message: "Aucun probléme détecté",
  }
  token: any = {
    token_key: null,
    token_decoded: null,
    user_connected: null,
    is_expired: null,
    date_expiration: null
  }
  //mes tableaux
  les_roles_des_utilisateurs: any[] = []
  //les droits
  /*
  1=>admin
  2=>Directeur
  3=>Assistant Secretaire
  4=> Superviseur
  5=>Responsable Financier 
  */
  les_droits: any = {
    //utilisateurs
    add_user: [1],
    list_user: [1],
    //gardiens 
    add_gardien: [2, 3],
    list_gardien: [2, 3, 4, 5],
    //conges 
    add_conges: [2, 3],
    list_conges: [2, 3, 4],
    //absences 
    add_absence: [2, 3, 4],
    list_absence: [2, 3, 4],
    //evolution 
    add_note: [2, 3, 4],
    list_note: [2, 3, 4],
    //affectation
    add_affectation: [2],
    list_affectation: [2, 3, 4],
    edit_affectation: [2, 3],
    //indemnite
    add_indemnite: [2, 5],
    list_indemnite: [2, 3, 5],
    //collaborateurs
    add_societe: [2, 3],
    list_societe: [2, 3, 4, 5]
  }
  constructor(private http: HttpClient, private route: Router, private location: Location) { }
  // sauvegardes
  async get_from_local_storage(key: string): Promise<any> {
    let res: any = await localStorage.getItem(this.local_storage_prefixe + key);
    return JSON.parse(res)
  }
  async save_on_local_storage(key: string, value: any): Promise<void> {
    await localStorage.setItem(this.local_storage_prefixe + key, JSON.stringify(value));
  }
  async delete_from_local_storage(key: string) {
    await localStorage.setItem(this.local_storage_prefixe + key, 'null');
  }

  async get_token() {
    //le token n'est pas encore chargé
    if (this.network.token == undefined) {
      this.network.token = await this.get_from_local_storage("token")
      if (this.network.token != undefined && this.network.token != null) {// token existant
        this.update_data_from_token()// mise a jour du token
      }
    } else {// token dèja chargé
      this.update_data_from_token()// mise a jour du token
    }
    return this.network.token
  }
  //les requetes http
  async taf_get(path: string, on_success: Function, on_error: Function) {
    let api_url = this.taf_base_url + path;
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: "Bearer " + await this.get_token(),
      })
    };

    this.http.get(api_url, httpOptions).subscribe(
      (reponse: any) => {// on success
        on_success(reponse)
      },
      (error: any) => {// on error
        this.on_taf_get_error(error, on_error)
      }
    )
  }
  on_taf_get_error(error: any, on_error: Function) {
    this.network.status = false;
    this.network.message = error
    alert("Merci de vérifier votre connexion")
    on_error(error)
  }
  async taf_post(path: string, data_to_send: any, on_success: Function, on_error: Function) {
    let api_url = this.taf_base_url + path;
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: "Bearer " + await this.get_token(),
      })
    };
    this.http.post(api_url, data_to_send, httpOptions).subscribe(
      (reponse: any) => {// on success
        on_success(reponse)
      },
      (error: any) => {// on error
        this.on_taf_post_error(error, on_error)
      }
    )
  }
  async taf_post_login(path: string, data_to_send: any, on_success: Function, on_error: Function) {
    let api_url = this.taf_base_url + path;

    this.http.post(api_url, data_to_send).subscribe(
      (reponse: any) => {// on success
        on_success(reponse)
      },
      (error: any) => {// on error
        this.on_taf_post_error(error, on_error)
      }
    )
  }
  on_taf_post_error(error: any, on_error: any) {
    this.network.status = false;
    this.network.message = error
    alert("Merci de vérifier votre connexion")
    on_error(error)
  }
  async update_data_from_token() {
    let token_key = await this.get_from_local_storage("token")
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token_key);
    const expirationDate = helper.getTokenExpirationDate(token_key);
    const isExpired = helper.isTokenExpired(token_key);

    this.token = {
      token_key: token_key,
      token_decoded: decodedToken,
      user_connected: decodedToken.taf_data,
      is_expired: isExpired,
      date_expiration: expirationDate
    }
    if (this.token.is_expired) {
      this.on_token_expire()
    }
  }
  on_token_expire() {
    alert("Votre session s'est expiré! Veuillez vous connecter à nouveau")
    this.delete_from_local_storage("token")
    this.route.navigate(['/public/login'])
  }
  go_back() {
    this.location.back()
  }
  Swal_success(title: any) {
    let succes = Swal.fire({
      title: title,
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
      position: "top-start"
    });
    return succes
  }
  Swal_error(title: any) {
    let succes = Swal.fire({
      title: title,
      icon: "error",
      timer: 1500,
      showConfirmButton: false,
      position: "top-start"
    });
    return succes
  }
  //determiner s'il y'a chagement au niveau du formulaire ou pas 
  check_change(formulaire_actuel: any, donnees_update: any): boolean {
    // retourne true s'il y'a changement et false sinon
    for (const [key, value] of Object.entries(formulaire_actuel)) {
      if (donnees_update[key] != value) {
        // il y'a eu un changement
        return true;
      }
    }
    return false;
  }
  //format date 
  format_date(date: string): string {// 2021-06-18 12:00
    let res = moment(date).locale("fr").format('DD-MM-YYYY')
    return res // 18-06-2021
  }
  format_hour(hour: string) {
    let res = moment(hour, "hh:mm:ss").locale("fr").format("HH:mm")
    return res
  }
  can(action: string) {
    let id_role = this.token.token_decoded.taf_data.id_role || 0
    if (this.les_droits[action].indexOf(+id_role) != -1) {
      return true
    } else {
      return false
    }
  }
}