import { PrivilegeName } from "../privileges/privileges.interfaces";

export const PRIVILEGE_LABEL: Record<PrivilegeName, string> = {
  [PrivilegeName.VIEW_APPLICATION]: "Consultation Candidature",
  [PrivilegeName.CREATE_APPLICATION]: "Création Candidature",
  [PrivilegeName.EDIT_APPLICATION]: "Modification Candidature",
  [PrivilegeName.DELETE_APPLICATION]: "Suppression Candidature",

  [PrivilegeName.VIEW_USER]: "Consultation Utilisateur",
  [PrivilegeName.CREATE_USER]: "Création Utilisateur",
  [PrivilegeName.EDIT_USER]: "Modification Utilisateur",
  [PrivilegeName.DELETE_USER]: "Suppression Utilisateur",

  [PrivilegeName.VIEW_GROUP]: "Consultation Groupe",
  [PrivilegeName.CREATE_GROUP]: "Création Groupe",
  [PrivilegeName.EDIT_GROUP]: "Modification Groupe",
  [PrivilegeName.DELETE_GROUP]: "Suppression Groupe",

  [PrivilegeName.VIEW_ROLE]: "Consultation Rôle",
  [PrivilegeName.CREATE_ROLE]: "Création Rôle",
  [PrivilegeName.EDIT_ROLE]: "Modification Rôle",
  [PrivilegeName.DELETE_ROLE]: "Suppression Rôle",

  [PrivilegeName.VIEW_COURSE]: "Consultation Cours",
  [PrivilegeName.CREATE_COURSE]: "Création Cours",
  [PrivilegeName.EDIT_COURSE]: "Modification Cours",
  [PrivilegeName.DELETE_COURSE]: "Suppression Cours",

  [PrivilegeName.VIEW_CURSUS]: "Consultation Cursus",
  [PrivilegeName.CREATE_CURSUS]: "Création Cursus",
  [PrivilegeName.EDIT_CURSUS]: "Modification Cursus",
  [PrivilegeName.DELETE_CURSUS]: "Suppression Cursus",

  [PrivilegeName.VIEW_TEACHER]: "Consultation Professeur",
  [PrivilegeName.CREATE_TEACHER]: "Création Professeur",
  [PrivilegeName.EDIT_TEACHER]: "Modification Professeur",
  [PrivilegeName.DELETE_TEACHER]: "Suppression Professeur",

  [PrivilegeName.VIEW_PRIVILEGE]: "Consultation Privilège",
  [PrivilegeName.CREATE_PRIVILEGE]: "Création Privilège",
  [PrivilegeName.EDIT_PRIVILEGE]: "Modification Privilège",
  [PrivilegeName.DELETE_PRIVILEGE]: "Suppression Privilège",

  [PrivilegeName.VIEW_ADMINISTRATION]: "Consultation Administration",
  [PrivilegeName.CREATE_ADMINISTRATION]: "Création Administration",
  [PrivilegeName.EDIT_ADMINISTRATION]: "Modification Administration",
  [PrivilegeName.DELETE_ADMINISTRATION]: "Suppression Administration",

  [PrivilegeName.VIEW_STUDENT]: "Consultation Etudiant",
  [PrivilegeName.CREATE_STUDENT]: "Création Etudiant",
  [PrivilegeName.EDIT_STUDENT]: "Modification Etudiant",
  [PrivilegeName.DELETE_STUDENT]: "Suppression Etudiant",

  [PrivilegeName.VIEW_COMMENT]: "Consultation Commentaire",
  [PrivilegeName.CREATE_COMMENT]: "Création Commentaire",
  [PrivilegeName.EDIT_COMMENT]: "Modification Commentaire",
  [PrivilegeName.DELETE_COMMENT]: "Suppression Commentaire",

  [PrivilegeName.VIEW_HISTORY]: "Consultation Historique",
  [PrivilegeName.CREATE_HISTORY]: "Création Historique",
  [PrivilegeName.EDIT_HISTORY]: "Modification Historique",
  [PrivilegeName.DELETE_HISTORY]: "Suppression Historique",

  [PrivilegeName.VIEW_EDUCATIONAL_CLASSES]: "Consultation Classe",
  [PrivilegeName.CREATE_EDUCATIONAL_CLASSES]: "Création Classe",
  [PrivilegeName.EDIT_EDUCATIONAL_CLASSES]: "Modification Classe",
  [PrivilegeName.DELETE_EDUCATIONAL_CLASSES]: "Suppression Classe",

  [PrivilegeName.VIEW_MAIL]: "Consultation Mail",
  [PrivilegeName.CREATE_MAIL]: "Création Mail",
  [PrivilegeName.EDIT_MAIL]: "Modification Mail",
  [PrivilegeName.DELETE_MAIL]: "Suppression Mail",

  [PrivilegeName.VIEW_COUNT]: "Consultation Compte",
  [PrivilegeName.CREATE_COUNT]: "Création Compte",
  [PrivilegeName.EDIT_COUNT]: "Modification Compte",
  [PrivilegeName.DELETE_COUNT]: "Suppression Compte",

  [PrivilegeName.VIEW_EVENT]: "Consultation Événement",
  [PrivilegeName.CREATE_EVENT]: "Création Événement",
  [PrivilegeName.EDIT_EVENT]: "Modification Événement",
  [PrivilegeName.DELETE_EVENT]: "Suppression Événement",

  [PrivilegeName.VIEW_PROFILE]: "Consultation du profil",
  [PrivilegeName.EDIT_PROFILE]: "Modification du profil",

  [PrivilegeName.VIEW_SETTING]: "Consultation Paramètre",
  [PrivilegeName.VIEW_QUIZ_SESSION]: "",
  [PrivilegeName.CREATE_QUIZ_SESSION]: "",
  [PrivilegeName.EDIT_QUIZ_SESSION]: "",
  [PrivilegeName.DELETE_QUIZ_SESSION]: ""
};

export const PRIVILEGE_TITLE: { [key: string]: string } = {
  APPLICATION: "Candidature",
  USER: "Utilisateur",
  GROUP: "Groupe",
  ROLE: "Rôle",
  COURSE: "Cours",
  CURSUS: "Cursus",
  TEACHER: "Professeur",
  PRIVILEGE: "Privilège",
  ADMINISTRATION: "Administration",
  STUDENT: "Étudiant",
  COMMENT: "Commentaire",
  HISTORY: "Historique",
  EDUCATIONAL: "Classe",
  MAIL: "Mail",
  COUNT: "Compte",
  PROFILE: "Profil",
  EVENT:"Événement",
  SETTING: "Paramètre",
};
