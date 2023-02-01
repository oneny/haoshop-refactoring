import React from "react";

export interface Auth {
  accessToken: string;
}

export interface AuthState {
  token: string | null;
}

export interface TSigninProps {
  errMsg: string;
  onChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  emailRef: React.RefObject<HTMLInputElement>;
  errRef: React.RefObject<HTMLParagraphElement>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}