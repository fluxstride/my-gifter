export interface User {
  id: string;
  name: string;
  code: string;
  pickedBy: string | null;
  hasPicked: boolean;
}

export interface AuthUser {
  username: string;
  password: string;
}

export interface UsersAPIResponse {
  data: { data: { gifters: User[] } };
}

export interface ApiErrorResponse {
  response: {
    data: { message: string };
  };
}

export interface ErrorResponse {
  message: string;
}

export interface UserData {
  id: 'string';
  username: string;
}

export interface AuthUserAPIResponse {
  data: { data: { user: UserData; token: string } };
}

export interface PickerResponse {
  data: {
    data: {
      picker: User;
      gifters: User[] | null;
      pickedUser: User | null;
    };
  };
}
