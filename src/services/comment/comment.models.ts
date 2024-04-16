import { Group } from "../group/group.models";
import { Role } from "../role/role.models";

export interface CommentType {
    _id?: string;
    user: {
        _id: string;
        firstname: string;
        lastname: string;
        username: string;
        address: string;
        birthDate: string;
        birthPlace: string;
        creationDate: string;
        email: string;
        gender: string;
        phone: string[];
        groups: Group[] | any[];
        roles: Role[] | any[];
        photo: string;
        isActive: boolean;
        isDelete: boolean;
    };
    targetId: string;
    entity: string;
    comment: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface CommentTypeToInsert {
    _id?: string;
    user: string;
    targetId: string;
    entity: string;
    comment: string;
}
