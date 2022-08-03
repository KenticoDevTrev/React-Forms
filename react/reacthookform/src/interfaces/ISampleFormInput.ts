export interface ISampleFormInput {
  firstName: string;
  lastName: string;
  gender: string | undefined;
  includeMoreInfo: boolean | undefined;
  favoriteColor: any | undefined; // can't use string[] as it won't accept the value of an array
}