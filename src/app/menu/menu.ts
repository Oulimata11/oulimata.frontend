import { CoreMenu } from '@core/types'

export const menu: CoreMenu[] = []
  // { id: "Absence", title: "Absence", translate: "Absence", type: "item", icon: "clipboard", url: "/home/absence" },
  // { id: "Gardien", title: "Gardien", translate: "Gardien", type: "item", icon: "user-check", url: "/home/gardien" },
  // { id: "Congés", title: "Congés", translate: "Congés", type: "item", icon: "calendar", url: "/home/conges" },
  // { id: "Indemnité", title: "Indemnité", translate: "Indemnité", type: "item", icon: "server", url: "/home/indemnite" },
  // { id: "Affectation", title: "Affectation", translate: "Affectation", type: "item", icon: "file", url: "/home/societe_gardien" },
  // // { id: "Maps", title: "Maps", translate: "Maps", type: "item", icon: "map-pin", url: "/home/localisation" },
  // { id: "Evaluation", title: "Evaluation", translate: "Evaluation", type: "item", icon: "arrow-up-circle", url: "/home/evaluation" },
  // // { id: "Role", title: "Role", translate: "Role", type: "item", icon: "file", url: "/home/role" },
  // { id: "Collaborateurs", title: "Collaborateurs", translate: "Collaborateurs", type: "item", icon: "grid", url: "/home/societe" },
export function get_menu(user: any): CoreMenu[] {
  switch (+user.id_role) {
    case 1:
      return [
        // Dashboard Admnistrateur role=1
        { id: "Utilisateurs", title: "Utilisateurs", translate: "Utilisateurs", type: "item", icon: "users", url: "/home/utilisateur" }
      ];
    case 2:
      return [
        // Dashboard Directeur=2 
        { id: "Absence", title: "Absence", translate: "Absence", type: "item", icon: "clipboard", url: "/home/absence" },
        { id: "Gardien", title: "Gardien", translate: "Gardien", type: "item", icon: "user-check", url: "/home/gardien" },
        { id: "Congés", title: "Congés", translate: "Congés", type: "item", icon: "calendar", url: "/home/conges" },
        { id: "Indemnité", title: "Indemnité", translate: "Indemnité", type: "item", icon: "server", url: "/home/indemnite" },
        { id: "Affectation", title: "Affectation", translate: "Affectation", type: "item", icon: "file", url: "/home/societe_gardien" },
        { id: "Evaluation", title: "Evaluation", translate: "Evaluation", type: "item", icon: "arrow-up-circle", url: "/home/evaluation" },
        { id: "Collaborateurs", title: "Collaborateurs", translate: "Collaborateurs", type: "item", icon: "grid", url: "/home/societe" },
      ];
    case 3:
      return [
        // Dashboard Assistant Secretaire =3 
        { id: "Absence", title: "Absence", translate: "Absence", type: "item", icon: "clipboard", url: "/home/absence" },
        { id: "Gardien", title: "Gardien", translate: "Gardien", type: "item", icon: "user-check", url: "/home/gardien" },
        { id: "Congés", title: "Congés", translate: "Congés", type: "item", icon: "calendar", url: "/home/conges" },
        { id: "Indemnité", title: "Indemnité", translate: "Indemnité", type: "item", icon: "server", url: "/home/indemnite" },
        { id: "Evaluation", title: "Evaluation", translate: "Evaluation", type: "item", icon: "arrow-up-circle", url: "/home/evaluation" },
        { id: "Collaborateurs", title: "Collaborateurs", translate: "Collaborateurs", type: "item", icon: "grid", url: "/home/societe" },
      ];
    case 4:
      return [
        // Dashboard Superviseur =4 
          { id: "Absence", title: "Absence", translate: "Absence", type: "item", icon: "clipboard", url: "/home/absence" },
          { id: "Gardien", title: "Gardien", translate: "Gardien", type: "item", icon: "user-check", url: "/home/gardien" },
          { id: "Congés", title: "Congés", translate: "Congés", type: "item", icon: "calendar", url: "/home/conges" },
          { id: "Evaluation", title: "Evaluation", translate: "Evaluation", type: "item", icon: "arrow-up-circle", url: "/home/evaluation" },
          { id: "Collaborateurs", title: "Collaborateurs", translate: "Collaborateurs", type: "item", icon: "grid", url: "/home/societe" },
      ];
    case 5:
      return [
        // Dashboard Responsable financier =5 
        { id: "Gardien", title: "Gardien", translate: "Gardien", type: "item", icon: "user-check", url: "/home/gardien" },
        { id: "Indemnité", title: "Indemnité", translate: "Indemnité", type: "item", icon: "server", url: "/home/indemnite" },
        { id: "Collaborateurs", title: "Collaborateurs", translate: "Collaborateurs", type: "item", icon: "grid", url: "/home/societe" },
      ];
    default:
      return [
        { id: "Gardien", title: "Gardien", translate: "Gardien", type: "item", icon: "user-check", url: "/home/gardien" },
      ];
  }
}