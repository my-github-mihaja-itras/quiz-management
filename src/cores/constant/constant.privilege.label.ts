import { PrivilegeName } from "../privileges/privileges.interfaces";

export const PRIVILEGE_LABEL: Record<PrivilegeName, string> = {
  [PrivilegeName.VIEW_APPLICATION]: "Consultation Candidature", // Consultation liste APPLICATION
  [PrivilegeName.CREATE_APPLICATION]: "Création Candidature", // Création APPLICATION
  [PrivilegeName.EDIT_APPLICATION]: "Modification Candidature", // Modification APPLICATION
  [PrivilegeName.DELETE_APPLICATION]: "Suppression Candidature", // Suppression APPLICATION

  [PrivilegeName.VIEW_USER]: "Consultation Utilisateur", // Consultation liste utilisateur
  [PrivilegeName.CREATE_USER]: "Création Utilisateur", // Création utilisateur
  [PrivilegeName.EDIT_USER]: "Modification Utilisateur", // Modification utilisateur
  [PrivilegeName.DELETE_USER]: "Suppression Utilisateur", // Suppression utilisateur

  [PrivilegeName.VIEW_GROUP]: "Consultation Groupe", // Consultation liste groupe*
  [PrivilegeName.CREATE_GROUP]: "Création Groupe", // Création groupe
  [PrivilegeName.EDIT_GROUP]: "Modification Groupe", // Modification groupe
  [PrivilegeName.DELETE_GROUP]: "Suppression Groupe", // Suppression groupe

  [PrivilegeName.VIEW_ROLE]: "Consultation Rôle", // Consultation liste groupe*
  [PrivilegeName.CREATE_ROLE]: "Création Rôle", // Création groupe
  [PrivilegeName.EDIT_ROLE]: "Modification Rôle", // Modification groupe
  [PrivilegeName.DELETE_ROLE]: "Suppression Rôle", // Suppression groupe

  [PrivilegeName.VIEW_COURSE]: "Consultation Cours", // Consultation liste course
  [PrivilegeName.CREATE_COURSE]: "Création Cours", // Création course
  [PrivilegeName.EDIT_COURSE]: "Modification Cours", // Modification course
  [PrivilegeName.DELETE_COURSE]: "Suppression Cours", // Suppression course

  [PrivilegeName.VIEW_CURSUS]: "Consultation Cursus", // Consultation liste CURSUS
  [PrivilegeName.CREATE_CURSUS]: "Création Cursus", // Création CURSUS
  [PrivilegeName.EDIT_CURSUS]: "Modification Cursus", // Modification CURSUS
  [PrivilegeName.DELETE_CURSUS]: "Suppression Cursus", // Suppression CURSUS

  [PrivilegeName.VIEW_TEACHER]: "Consultation Professeur", // Consultation liste TEACHER
  [PrivilegeName.CREATE_TEACHER]: "Création Professeur", // Création TEACHER
  [PrivilegeName.EDIT_TEACHER]: "Modification Professeur", // Modification TEACHER
  [PrivilegeName.DELETE_TEACHER]: "Suppression Professeur", // Suppression TEACHER

  [PrivilegeName.VIEW_PRIVILEGE]: "Consultation Privilège", // Consultation liste privilege
  [PrivilegeName.CREATE_PRIVILEGE]: "Création Privilège", // Création privilege
  [PrivilegeName.EDIT_PRIVILEGE]: "Modification Privilège", // Modification privilege
  [PrivilegeName.DELETE_PRIVILEGE]: "Suppression Privilège", // Suppression privilege

  [PrivilegeName.VIEW_ADMINISTRATION]: "Consultation Administration", // Consultation liste administration
  [PrivilegeName.CREATE_ADMINISTRATION]: "Création Administration", // Création administration
  [PrivilegeName.EDIT_ADMINISTRATION]: "Modification Administration", // Modification administration
  [PrivilegeName.DELETE_ADMINISTRATION]: "Suppression Administration", // Suppression administration

  [PrivilegeName.VIEW_STUDENT]: "Consultation Etudiant", // Consultation liste STUDENT
  [PrivilegeName.CREATE_STUDENT]: "Création Etudiant", // Création STUDENT
  [PrivilegeName.EDIT_STUDENT]: "Modification Etudiant", // Modification STUDENT
  [PrivilegeName.DELETE_STUDENT]: "Suppression Etudiant", // Suppression STUDENT

  [PrivilegeName.VIEW_COMMENT]: "Consultation Commentaire", // Consultation liste COMMENT
  [PrivilegeName.CREATE_COMMENT]: "Création Commentaire", // Création COMMENT
  [PrivilegeName.EDIT_COMMENT]: "Modification Commentaire", // Modification COMMENT
  [PrivilegeName.DELETE_COMMENT]: "Suppression Commentaire", // Suppression COMMENT

  [PrivilegeName.VIEW_HISTORY]: "Consultation Historique", // Consultation liste HISTORY
  [PrivilegeName.CREATE_HISTORY]: "Création Historique", // Création HISTORY
  [PrivilegeName.EDIT_HISTORY]: "Modification Historique", // Modification HISTORY
  [PrivilegeName.DELETE_HISTORY]: "Suppression Historique", // Suppression HISTORY

  [PrivilegeName.VIEW_EDUCATIONAL_CLASSES]: "Consultation Classe", // Consultation liste EDUCATIONAL_CLASSES
  [PrivilegeName.CREATE_EDUCATIONAL_CLASSES]: "Création Classe", // Création EDUCATIONAL_CLASSES
  [PrivilegeName.EDIT_EDUCATIONAL_CLASSES]: "Modification Classe", // Modification EDUCATIONAL_CLASSES
  [PrivilegeName.DELETE_EDUCATIONAL_CLASSES]: "Suppression Classe", // Suppression EDUCATIONAL_CLASSES

  [PrivilegeName.VIEW_MAIL]: "Consultation Mail", // Consultation liste MAIL
  [PrivilegeName.CREATE_MAIL]: "Création Mail", // Création MAIL
  [PrivilegeName.EDIT_MAIL]: "Modification Mail", // Modification MAIL
  [PrivilegeName.DELETE_MAIL]: "Suppression Mail", // Suppression MAIL

  [PrivilegeName.VIEW_COUNT]: "Consultation Compte", // Consultation liste COUNT
  [PrivilegeName.CREATE_COUNT]: "Création Compte", // Création COUNT
  [PrivilegeName.EDIT_COUNT]: "Modification Compte", // Modification COUNT
  [PrivilegeName.DELETE_COUNT]: "Suppression Compte", // Suppression COUNT

  [PrivilegeName.VIEW_EVENT]: "Consultation Événement", // Consultation liste Événement
  [PrivilegeName.CREATE_EVENT]: "Création Événement", // Création Événement
  [PrivilegeName.EDIT_EVENT]: "Modification Événement", // Modification Événement
  [PrivilegeName.DELETE_EVENT]: "Suppression Événement", // Suppression Événement

  [PrivilegeName.VIEW_PROFILE]: "Consultation du profil", // Modification profil
  [PrivilegeName.EDIT_PROFILE]: "Modification du profil", // Suppression profil

  [PrivilegeName.VIEW_SETTING]: "Consultation Paramètre", // Suppression COUNT
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
