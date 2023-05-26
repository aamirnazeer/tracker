export interface IUser {
  firstname: string;
  id: number;
  lastname: string;
  username: string;
}

type UserResponseValidation = {
  data: {
    id: string;
  };
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
