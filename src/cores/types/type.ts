export interface CommonProps {
    userPrivileges: string[]
  }
  
export interface PropsType extends CommonProps {
    [key: string]: any;
}