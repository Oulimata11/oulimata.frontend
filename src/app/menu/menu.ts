import { CoreMenu } from '@core/types'

export const menu: CoreMenu[] = [
  { id: "Absence", title: "Absence", translate: "Absence", type: "item", icon: "file", url: "/home/absence" },
  { id: "Conges", title: "Conges", translate: "Conges", type: "item", icon: "file", url: "/home/conges" },
  { id: "Gardien", title: "Gardien", translate: "Gardien", type: "item", icon: "file", url: "/home/gardien" },
  { id: "Indemnite", title: "Indemnite", translate: "Indemnite", type: "item", icon: "file", url: "/home/indemnite" },
  { id: "IndemniteGardien", title: "IndemniteGardien", translate: "IndemniteGardien", type: "item", icon: "file", url: "/home/indemnite_gardien" },
  { id: "Localisation", title: "Localisation", translate: "Localisation", type: "item", icon: "file", url: "/home/localisation" },
  { id: "Note", title: "Note", translate: "Note", type: "item", icon: "file", url: "/home/note" },
  { id: "Role", title: "Role", translate: "Role", type: "item", icon: "file", url: "/home/role" },
  { id: "Societe", title: "Societe", translate: "Societe", type: "item", icon: "file", url: "/home/societe" },
  { id: "Utilisateur", title: "Utilisateur", translate: "Utilisateur", type: "item", icon: "file", url: "/home/utilisateur" }
]
