import { Menu } from "./menu.interface";
import { PrivilegeName } from "../privileges/privileges.interfaces";

export const MENU: Menu[] = [
  {
    label: "Dashboard",
    icon: "/resources/icons/dashboard.svg",
    bleuIcon: "/resources/icons/blueDashboard.svg",
    link: "/",
    usePrivilege: PrivilegeName.VIEW_APPLICATION,
    child: [],
  },
  {
    label: "Candidats",
    icon: "/resources/icons/candidate.svg",
    bleuIcon: "/resources/icons/blueCandidate.svg",
    link: "/candidate",
    usePrivilege: PrivilegeName.VIEW_APPLICATION,
    child: [],
  },
  {
    label: "Inscriptions",
    icon: "/resources/icons/registration.svg",
    bleuIcon: "/resources/icons/blueRegistration.svg",
    link: "/registration",
    usePrivilege: PrivilegeName.VIEW_APPLICATION,
    child: [],
  },
  {
    label: "Etudiants",
    icon: "/resources/icons/student.svg",
    bleuIcon: "/resources/icons/blueStudent.svg",
    link: "/student",
    usePrivilege: PrivilegeName.VIEW_STUDENT,
    child: [],
  },
  {
    label: "Enseignants",
    icon: "/resources/icons/teacher.svg",
    bleuIcon: "/resources/icons/blueTeacher.svg",
    link: "/teacher",
    usePrivilege: PrivilegeName.CREATE_TEACHER,
    child: [],
  },
  {
    label: "Personnels Admin",
    icon: "/resources/icons/admin.svg",
    bleuIcon: "/resources/icons/adminBlue.svg",
    link: "/personnal-admin",
    usePrivilege: PrivilegeName.VIEW_ADMINISTRATION,
    child: [],
  },
  {
    label: "Paramètres",
    icon: "/resources/icons/setting.svg",
    bleuIcon: "/resources/icons/blueSetting.svg",
    link: "/setting",
    usePrivilege: PrivilegeName.VIEW_SETTING,
    child: [],
  },
  {
    label: "Administration",
    icon: "/resources/icons/adminMultiple.svg",
    bleuIcon: "/resources/icons/blueAdminMultiple.svg",
    link: "",
    usePrivilege: PrivilegeName.VIEW_ADMINISTRATION,
    child: [
      {
        label: "Utilisateurs",
        link: "/user",
        usePrivilege: PrivilegeName.VIEW_USER,
      },
      { label: "Rôles", link: "/roles", usePrivilege: PrivilegeName.VIEW_ROLE },
    ],
  },
  {
    label: "Gestion des classes",
    icon: "/resources/icons/classe.svg",
    bleuIcon: "/resources/icons/blueClasse.svg",
    link: "",
    usePrivilege: PrivilegeName.VIEW_EDUCATIONAL_CLASSES,
    child: [
      {
        label: "Classe",
        link: "/educational-classes",
        usePrivilege: PrivilegeName.VIEW_EDUCATIONAL_CLASSES,
      },
      {
        label: "Cours",
        link: "/course",
        usePrivilege: PrivilegeName.VIEW_COURSE,
      },
    ],
  },
];

export const DEFAULT_MENU: Menu[] = [
  {
    label: "Mon Profil",
    icon: "/resources/icons/profile-icon.svg",
    bleuIcon: "/resources/icons/blueProfile.svg",
    usePrivilege: PrivilegeName.VIEW_PROFILE,
    link: "/profile",
    child: [],
  },

  // {
  //   label: "Déconnexion",
  //   icon: "/resources/icons/setting.svg",
  //   bleuIcon: "/resources/icons/blueSetting.svg",
  //   link: "/auth",
  //   child: [],
  // },
];

export const DEFAULT_CANDIDATE_MENU: Menu[] = [
  {
    label: "Accueil",
    icon: "/resources/icons/logout.svg",
    bleuIcon: "/resources/icons/logout2.svg",
    usePrivilege: PrivilegeName.VIEW_PROFILE,
    link: "/profiles/student",
    child: [],
  },
  {
    label: "Admission",
    icon: "/resources/icons/candidate.svg",
    bleuIcon: "/resources/icons/blueCandidate.svg",
    usePrivilege: PrivilegeName.VIEW_PROFILE,
    link: "/profiles/student/admission",
    child: [],
  },
];
export const DEFAULT_STUDENT_MENU: Menu[] = [
  {
    label: "Accueil",
    icon: "/resources/icons/logout.svg",
    bleuIcon: "/resources/icons/logout2.svg",
    usePrivilege: PrivilegeName.VIEW_PROFILE,
    link: "/profiles/student",
    child: [],
  },
  {
    label: "Emploi du temps",
    icon: "/resources/icons/registration.svg",
    bleuIcon: "/resources/icons/blueRegistration.svg",
    usePrivilege: PrivilegeName.VIEW_PROFILE,
    link: "/profiles/student/schedule",
    child: [],
  },
  {
    label: "Admission",
    icon: "/resources/icons/candidate.svg",
    bleuIcon: "/resources/icons/blueCandidate.svg",
    usePrivilege: PrivilegeName.VIEW_PROFILE,
    link: "/profiles/student/admission",
    child: [],
  },
  {
    label: "Cours ",
    icon: "/resources/icons/classe.svg",
    bleuIcon: "/resources/icons/blueClasse.svg",
    usePrivilege: PrivilegeName.VIEW_PROFILE,
    link: "/profiles/student/cours-validation",
    child: [],
  },
  {
    label: "Résultat",
    icon: "/resources/icons/result.svg",
    bleuIcon: "/resources/icons/blueResult.svg",
    usePrivilege: PrivilegeName.VIEW_PROFILE,
    link: "/profiles/student/note",
    child: [],
  },
];
export const DEFAULT_TEACHER_MENU: Menu[] = [
  {
    label: "Accueil",
    icon: "/resources/icons/logout.svg",
    bleuIcon: "/resources/icons/logout2.svg",
    usePrivilege: PrivilegeName.VIEW_PROFILE,
    link: "/profiles/teacher",
    child: [],
  },
  {
    label: "Emploi du temps",
    icon: "/resources/icons/registration.svg",
    bleuIcon: "/resources/icons/blueRegistration.svg",
    usePrivilege: PrivilegeName.VIEW_PROFILE,
    link: "/profiles/teacher/schedule",
    child: [],
  },
  {
    label: "Cours ",
    icon: "/resources/icons/classe.svg",
    bleuIcon: "/resources/icons/blueClasse.svg",
    usePrivilege: PrivilegeName.VIEW_PROFILE,
    link: "/profiles/teacher/course",
    child: [],
  },
];
