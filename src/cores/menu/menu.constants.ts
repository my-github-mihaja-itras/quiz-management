import { Menu } from "./menu.interface";
import { PrivilegeName } from "../privileges/privileges.interfaces";

export const MENU: Menu[] = [
  {
    label: "Questions",
    icon: "/resources/icons/registration.svg",
    bleuIcon: "/resources/icons/blueRegistration.svg",
    link: "/question",
    usePrivilege: PrivilegeName.VIEW_SETTING,
    child: [],
  },
  {
    label: "Sessions Quiz",
    icon: "/resources/icons/candidate.svg",
    bleuIcon: "/resources/icons/blueCandidate.svg",
    link: "/quiz",
    usePrivilege: PrivilegeName.VIEW_SETTING,
    child: [],
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
