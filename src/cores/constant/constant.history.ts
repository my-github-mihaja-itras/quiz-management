export enum ActionType {
  CREATE_COMMENT = "CREATE_COMMENT",
  UPDATE_COMMENT = "UPDATE_COMMENT",
  DELETE_COMMENT = "DELETE_COMMENT",

  UPDATE_APPLICATION_STATUS = "UPDATE_APPLICATION_STATUS",

  CREATE_ROLE = "CREATE_ROLE",
  UPDATE_ROLE = "UPDATE_ROLE",
  DELETE_ROLE = "DELETE_ROLE",

  CREATE_USER = "CREATE_USER",
  UPDATE_USER = "UPDATE_USER",
  DELETE_USER = "DELETE_USER",

  ENABLE_USER = "ENABLE_USER",
  DISABLE_USER = "DISABLE_USER",

  CREATE_STUDENT = "CREATE_STUDENT",
  UPDATE_STUDENT = "UPDATE_STUDENT",
  UPDATE_STUDENT_RESULT = "UPDATE_STUDENT_RESULT",
  DELETE_STUDENT = "DELETE_STUDENT",

  CREATE_TEACHER = "CREATE_TEACHER",
  UPDATE_TEACHER = "UPDATE_TEACHER",
  DELETE_TEACHER = "DELETE_TEACHER",

  CREATE_COURSE = "CREATE_COURSE",
  UPDATE_COURSE = "UPDATE_COURSE",
  DELETE_COURSE = "DELETE_COURSE",
  UPDATE_COURSE_TEACHER = "UPDATE_COURSE_TEACHER",

  CREATE_SESSION = "CREATE_SESSION",
  UPDATE_SESSION = "UPDATE_SESSION",
  DELETE_SESSION = "DELETE_SESSION",

  CREATE_CURSUS = "CREATE_CURSUS",
  UPDATE_CURSUS = "UPDATE_CURSUS",
  DELETE_CURSUS = "DELETE_CURSUS",

  CREATE_ADMIN = "CREATE_ADMIN",
  UPDATE_ADMIN = "UPDATE_ADMIN",
  DELETE_ADMIN = "DELETE_ADMIN",

  CREATE_REGISTRATION_PERIOD = "CREATE_REGISTRATION_PERIOD",
  UPDATE_REGISTRATION_PERIOD = "UPDATE_REGISTRATION_PERIOD",
  DELETE_REGISTRATION_PERIOD = "DELETE_REGISTRATION_PERIOD",
}

export enum ActionName {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
  DISABLE = "DISABLE",
  ENABLE = "ENABLE",
}

export enum EntityName {
  COMMENT = "COMMENT",
  APPLICATION = "APPLICATION",
  APPLICATION_STATUS = "APPLICATION_STATUS",
  USER = "USER",
  TEACHER = "TEACHER",
  STUDENT = "STUDENT",
  ROLE = "ROLE",
  COURSE = "COURSE",
  SESSION = "SESSION",
  CURSUS = "CURSUS",
  ADMIN = "ADMIN",
  REGISTRATION_PERIOD = "REGISTRATION_PERIOD",
}

export enum TranslateName {
  // ACTION NAME
  CREATE = "ajouté",
  UPDATE = "modifié",
  DELETE = "supprimé",
  DISABLE = "désactivé",
  ENABLE = "activé",
  REPLACE = "remplacer",

  // ENTITY NAME
  COMMENT = "un commentaire ",
  APPLICATION = "un candidat",
  USER = "cet utilisateur",
  UPDATE_APPLICATION_STATUS = "changé le statut",
  TEACHER = "cet enseignant",
  STUDENT = "un élève",
  ROLE = "un rôle",
  CURSUS = "un filière",
  COURSE = "ce cours",
  ADMIN = "ce personnel administrateur",
  UPDATE_COURSE_TEACHER = "remplacer",
  REGISTRATION_PERIOD = "la période d'inscription",
  SESSION = "une séance",
}

export const translateActionName = (action: string) => {
  const actionName = action.split("_")[0];
  if (action === ActionType.UPDATE_APPLICATION_STATUS) {
    return TranslateName.UPDATE_APPLICATION_STATUS;
  } else if (action === ActionType.UPDATE_COURSE_TEACHER) {
    return TranslateName.UPDATE_COURSE_TEACHER;
  } else {
    switch (actionName) {
      case ActionName.CREATE:
        return TranslateName.CREATE;
      case ActionName.UPDATE:
        return TranslateName.UPDATE;
      case ActionName.DELETE:
        return TranslateName.DELETE;
      case ActionName.DISABLE:
        return TranslateName.DISABLE;
      case ActionName.ENABLE:
        return TranslateName.ENABLE;
      default:
        return TranslateName.UPDATE_APPLICATION_STATUS;
    }
  }
};

export const translateEntityName = (action: string) => {
  const entity = action.split("_")[1];
  if (action === ActionType.UPDATE_APPLICATION_STATUS) {
    return "";
  } else if (action === ActionType.UPDATE_COURSE_TEACHER) {
    return "";
  } else {
    switch (entity) {
      case EntityName.APPLICATION:
        return TranslateName.APPLICATION;
      case EntityName.COMMENT:
        return TranslateName.COMMENT;
      case EntityName.USER:
        return TranslateName.USER;
      case EntityName.TEACHER:
        return TranslateName.TEACHER;
      case EntityName.STUDENT:
        return TranslateName.STUDENT;
      case EntityName.COURSE:
        return TranslateName.COURSE;
      case EntityName.CURSUS:
        return TranslateName.CURSUS;
      case EntityName.ADMIN:
        return TranslateName.ADMIN;
      case "REGISTRATION":
        return TranslateName.REGISTRATION_PERIOD;
      default:
        return TranslateName.UPDATE_APPLICATION_STATUS;
    }
  }
};
