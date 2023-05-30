export interface IUser {
  firstname: string;
  id: string;
  lastname: string;
  username: string;
}

type UserResponseValidation = {
  id: string;
};

export interface ILoginValues {
  username: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
}

export interface ISignUpValues {
  email: FormDataEntryValue | null;
  firstname: FormDataEntryValue | null;
  lastname: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
  username: FormDataEntryValue | null;
}

export interface ISignoutResponse {
  success: boolean;
  message: string;
}

export type ValidateUser = {
  username: string;
};
