export enum PrivilegeName {

    VIEW_APPLICATION = 'VIEW_APPLICATION', // Consultation liste APPLICATION
    CREATE_APPLICATION = 'CREATE_APPLICATION', // Création APPLICATION
    EDIT_APPLICATION = 'EDIT_APPLICATION', // Modification APPLICATION
    DELETE_APPLICATION = 'DELETE_APPLICATION', // Suppression APPLICATION
  
    VIEW_USER = 'VIEW_USER', // Consultation liste utilisateur
    CREATE_USER = 'CREATE_USER', // Création utilisateur
    EDIT_USER = 'EDIT_USER', // Modification utilisateur
    DELETE_USER = 'DELETE_USER', // Suppression utilisateur
  
    VIEW_GROUP = 'VIEW_GROUP', // Consultation liste groupe*
    CREATE_GROUP = 'CREATE_GROUP', // Création groupe
    EDIT_GROUP = 'EDIT_GROUP', // Modification groupe
    DELETE_GROUP = 'DELETE_GROUP', // Suppression groupe
  
    VIEW_ROLE = 'VIEW_ROLE', // Consultation liste groupe*
    CREATE_ROLE = 'CREATE_ROLE', // Création groupe
    EDIT_ROLE = 'EDIT_ROLE', // Modification groupe
    DELETE_ROLE = 'DELETE_ROLE', // Suppression groupe
  
    VIEW_COURSE = 'VIEW_COURSE', // Consultation liste course
    CREATE_COURSE = 'CREATE_COURSE', // Création course
    EDIT_COURSE = 'EDIT_COURSE', // Modification course
    DELETE_COURSE = 'DELETE_COURSE', // Suppression course
  
    VIEW_CURSUS = 'VIEW_CURSUS', // Consultation liste CURSUS
    CREATE_CURSUS = 'CREATE_CURSUS', // Création CURSUS
    EDIT_CURSUS = 'EDIT_CURSUS', // Modification CURSUS
    DELETE_CURSUS = 'DELETE_CURSUS', // Suppression CURSUS
  
    VIEW_TEACHER = 'VIEW_TEACHER', // Consultation liste TEACHER
    CREATE_TEACHER = 'CREATE_TEACHER', // Création TEACHER
    EDIT_TEACHER = 'EDIT_TEACHER', // Modification TEACHER
    DELETE_TEACHER = 'DELETE_TEACHER', // Suppression TEACHER
  
    VIEW_PRIVILEGE = 'VIEW_PRIVILEGE', // Consultation liste privilege
    CREATE_PRIVILEGE = 'CREATE_PRIVILEGE', // Création privilege
    EDIT_PRIVILEGE = 'EDIT_PRIVILEGE', // Modification privilege
    DELETE_PRIVILEGE = 'DELETE_PRIVILEGE', // Suppression privilege
  
    VIEW_ADMINISTRATION = 'VIEW_ADMINISTRATION', // Consultation liste administration
    CREATE_ADMINISTRATION = 'CREATE_ADMINISTRATION', // Création administration
    EDIT_ADMINISTRATION = 'EDIT_ADMINISTRATION', // Modification administration
    DELETE_ADMINISTRATION = 'DELETE_ADMINISTRATION', // Suppression administration
  
    VIEW_STUDENT = 'VIEW_STUDENT', // Consultation liste STUDENT
    CREATE_STUDENT = 'CREATE_STUDENT', // Création STUDENT
    EDIT_STUDENT = 'EDIT_STUDENT', // Modification STUDENT
    DELETE_STUDENT = 'DELETE_STUDENT', // Suppression STUDENT
  
    VIEW_EDUCATIONAL_CLASSES = 'VIEW_EDUCATIONAL_CLASSES', // Consultation liste EDUCATIONAL_CLASSES
    CREATE_EDUCATIONAL_CLASSES = 'CREATE_EDUCATIONAL_CLASSES', // Création EDUCATIONAL_CLASSES
    EDIT_EDUCATIONAL_CLASSES = 'EDIT_EDUCATIONAL_CLASSES', // Modification EDUCATIONAL_CLASSES
    DELETE_EDUCATIONAL_CLASSES = 'DELETE_EDUCATIONAL_CLASSES', // Suppression EDUCATIONAL_CLASSES
  
    VIEW_COMMENT = 'VIEW_COMMENT', // Consultation liste COMMENT
    CREATE_COMMENT = 'CREATE_COMMENT', // Création COMMENT
    EDIT_COMMENT = 'EDIT_COMMENT', // Modification COMMENT
    DELETE_COMMENT = 'DELETE_COMMENT', // Suppression COMMENT

    VIEW_HISTORY = 'VIEW_HISTORY', // Consultation liste HISTORY
    CREATE_HISTORY = 'CREATE_HISTORY', // Création HISTORY
    EDIT_HISTORY = 'EDIT_HISTORY', // Modification HISTORY
    DELETE_HISTORY = 'DELETE_HISTORY', // Suppression COMMENT

    VIEW_MAIL = 'VIEW_MAIL', // Consultation liste MAIL
    CREATE_MAIL = 'CREATE_MAIL', // Création MAIL
    EDIT_MAIL = 'EDIT_MAIL', // Modification MAIL
    DELETE_MAIL = 'DELETE_MAIL', // Suppression MAIL
  
    VIEW_COUNT = 'VIEW_COUNT', // Consultation liste COUNT
    CREATE_COUNT = 'CREATE_COUNT', // Création COUNT
    EDIT_COUNT = 'EDIT_COUNT', // Modification COUNT
    DELETE_COUNT = 'DELETE_COUNT', // Suppression COUNT

    VIEW_PROFILE = 'VIEW_PROFILE',   // can view his/her own profile
    EDIT_PROFILE = 'EDIT_PROFILE',   // can etit his/her own profile

    VIEW_EVENT = 'VIEW_EVENT', // Consultation liste EVENT
    CREATE_EVENT = 'CREATE_EVENT', // Création EVENT
    EDIT_EVENT = 'EDIT_EVENT', // Modification EVENT
    DELETE_EVENT = 'DELETE_EVENT', // Suppression EVENT

    VIEW_SETTING ='VIEW_SETTING' // Can view setting

  }