import { PrivilegeName } from "../privileges/privileges.interfaces";

export const ROUTES = [
  {
    path: "/",
    usePrivilege: PrivilegeName.VIEW_APPLICATION,
  },
  {
    path: "/candidate",
    usePrivilege: PrivilegeName.VIEW_APPLICATION,
  },
  {
    path: "/registration",
    usePrivilege: PrivilegeName.VIEW_APPLICATION,
  },
  {
    path: "/educational-classes",
    usePrivilege: PrivilegeName.VIEW_EDUCATIONAL_CLASSES,
  },
  {
    path: "/personnal-admin",
    usePrivilege: PrivilegeName.VIEW_ADMINISTRATION,
  },
  {
    path: "/roles",
    usePrivilege: PrivilegeName.VIEW_ROLE,
  },
  {
    path: "/student",
    usePrivilege: PrivilegeName.VIEW_STUDENT,
  },
  {
    path: "/teacher",
    usePrivilege: PrivilegeName.VIEW_TEACHER,
  },
  {
    path: "/user",
    usePrivilege: PrivilegeName.VIEW_USER,
  },
  {
    path: "/profiles",
    usePrivilege: PrivilegeName.VIEW_PROFILE,
  },
  {
    path: "/course",
    usePrivilege: PrivilegeName.VIEW_COURSE,
  },
  {
    path: "/question",
    usePrivilege: PrivilegeName.VIEW_SETTING,
  },
];
