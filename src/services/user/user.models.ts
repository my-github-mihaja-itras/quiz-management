import { OptionsType } from "@/components/shared/form/input-field/input.interface";

export interface User {
  _id: string;
  firstname: string;
  lastname: string;
  username: string;
  address: string;
  city?: string;
  postalCode?: string;
  birthDate: string;
  birthPlace: string;
  creationDate: string;
  email: string;
  gender: string;
  phone: string[];
  photo: string;
  groups: [
    {
      _id: string;
      name: string;
      description: string;
      alias: string;
    }
  ];
  roles: [
    {
      _id: string;
      name: string;
      alias: string;
      privileges: [
        {
          _id: string;
          name: string;
          groups: {
            _id: string;
            name: string;
            description: string;
          };
        }
      ];
      description: string;
    }
  ];
  isActive: boolean;
  isDelete: boolean;
  failedConnectionCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface createUserDto {
  firstname: string;
  lastname: string;
  username: string;
  address: string;
  birthDate: string;
  birthPlace: string;
  password: string;
  email: string;
  gender: string;
  phone: string[];
  groups: string[];
  roles: string[];
  creationDate: string;
  photo?: string;
  filters?: [];
  isActive?: boolean;
  isDelete?: boolean;
}
export const posteOption: OptionsType[] = [
  {
    label: "Administration",
    value: "ADM",
  },
  {
    label: "Technicien",
    value: "TEC",
  },
  {
    label: "Secrétaire",
    value: "ADM",
  },
  {
    label: "Professeur",
    value: "ENS",
  },
  {
    label: "Stagiaire",
    value: "IC",
  },
];