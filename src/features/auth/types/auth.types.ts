export type SignUpInput = {
  name: string;
  email: string;
  password: string;
}

export type SignInInput = Pick<SignUpInput, 'email' | 'password'>