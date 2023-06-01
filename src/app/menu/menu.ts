import { CoreMenu } from '@core/types'

export const menu: CoreMenu[] = [
  { id: "Absence", title: "Absence", translate: "Absence", type: "item", icon: "clipboard", url: "/home/absence" },
  { id: "Congés", title: "Congés", translate: "Congés", type: "item", icon: "calendar", url: "/home/conges" },
  { id: "Gardien", title: "Gardien", translate: "Gardien", type: "item", icon: "user-check", url: "/home/gardien" },
  { id: "Indemnité", title: "Indemnité", translate: "Indemnité", type: "item", icon: "server", url: "/home/indemnite" },
  // { id: "IndemniteGardien", title: "IndemniteGardien", translate: "IndemniteGardien", type: "item", icon: "file", url: "/home/indemnite_gardien" },
  { id: "Localisation", title: "Localisation", translate: "Localisation", type: "item", icon: "map-pin", url: "/home/localisation" },
  { id: "Evaluation", title: "Evaluation", translate: "Evaluation", type: "item", icon: "arrow-up-circle", url: "/home/note" },
  // { id: "Role", title: "Role", translate: "Role", type: "item", icon: "file", url: "/home/role" },
  { id: "Société", title: "Société", translate: "Société", type: "item", icon: "grid", url: "/home/societe" },
  { id: "Utilisateurs", title: "Utilisateurs", translate: "Utilisateurs", type: "item", icon: "users", url: "/home/utilisateur" }
]
