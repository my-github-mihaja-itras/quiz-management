import { PrivilegeName } from "@/cores/privileges/privileges.interfaces";



export const setPrivilegesValues = (privileges: string[]) => {
    const USE = {
            //application
        wiew_application: privileges.includes(PrivilegeName.VIEW_APPLICATION),
        edit_application: privileges.includes(PrivilegeName.EDIT_APPLICATION),
        create_application: privileges.includes(PrivilegeName.CREATE_APPLICATION),
        delete_application: privileges.includes(PrivilegeName.DELETE_APPLICATION),

        //user
        wiew_user: privileges.includes(PrivilegeName.VIEW_USER),
        edit_user: privileges.includes(PrivilegeName.EDIT_USER),
        create_user: privileges.includes(PrivilegeName.CREATE_USER),
        delete_user: privileges.includes(PrivilegeName.DELETE_USER),

        //group
        wiew_group: privileges.includes(PrivilegeName.VIEW_GROUP),
        edit_group: privileges.includes(PrivilegeName.EDIT_GROUP),
        create_group: privileges.includes(PrivilegeName.CREATE_GROUP),
        delete_group: privileges.includes(PrivilegeName.DELETE_GROUP),

        //role
        wiew_role: privileges.includes(PrivilegeName.VIEW_ROLE),
        edit_role: privileges.includes(PrivilegeName.EDIT_ROLE),
        create_role: privileges.includes(PrivilegeName.CREATE_ROLE),
        delete_role: privileges.includes(PrivilegeName.DELETE_ROLE),

        //course
        wiew_course: privileges.includes(PrivilegeName.VIEW_COURSE),
        edit_course: privileges.includes(PrivilegeName.EDIT_COURSE),
        create_course: privileges.includes(PrivilegeName.CREATE_COURSE),
        delete_course: privileges.includes(PrivilegeName.DELETE_COURSE),
        
        //cursus
        wiew_cursus: privileges.includes(PrivilegeName.VIEW_CURSUS),
        edit_cursus: privileges.includes(PrivilegeName.EDIT_CURSUS),
        create_cursus: privileges.includes(PrivilegeName.CREATE_CURSUS),
        delete_cursus: privileges.includes(PrivilegeName.DELETE_CURSUS),

        //teacher
        wiew_teacher: privileges.includes(PrivilegeName.VIEW_TEACHER),
        edit_teacher: privileges.includes(PrivilegeName.EDIT_TEACHER),
        create_teacher: privileges.includes(PrivilegeName.CREATE_TEACHER),
        delete_teacher: privileges.includes(PrivilegeName.DELETE_TEACHER),

        //privileges
        wiew_privilege: privileges.includes(PrivilegeName.VIEW_PRIVILEGE),
        edit_privilege: privileges.includes(PrivilegeName.EDIT_PRIVILEGE),
        create_privilege: privileges.includes(PrivilegeName.CREATE_PRIVILEGE),
        delete_privilege: privileges.includes(PrivilegeName.DELETE_PRIVILEGE),

        //admin
        wiew_administration: privileges.includes(PrivilegeName.VIEW_ADMINISTRATION),
        edit_administration: privileges.includes(PrivilegeName.EDIT_ADMINISTRATION),
        create_administration: privileges.includes(PrivilegeName.CREATE_ADMINISTRATION),
        delete_administration: privileges.includes(PrivilegeName.DELETE_ADMINISTRATION),

        //student
        wiew_student: privileges.includes(PrivilegeName.VIEW_STUDENT),
        edit_student: privileges.includes(PrivilegeName.EDIT_STUDENT),
        create_student: privileges.includes(PrivilegeName.CREATE_STUDENT),
        delete_student: privileges.includes(PrivilegeName.DELETE_STUDENT),

        //course
        wiew_educational_class: privileges.includes(PrivilegeName.VIEW_EDUCATIONAL_CLASSES),
        edit_educational_class: privileges.includes(PrivilegeName.EDIT_EDUCATIONAL_CLASSES),
        create_educational_class: privileges.includes(PrivilegeName.CREATE_EDUCATIONAL_CLASSES),
        delete_educational_class: privileges.includes(PrivilegeName.DELETE_EDUCATIONAL_CLASSES),
    
    } 
    return USE as any;
}