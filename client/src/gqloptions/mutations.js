import { gql } from "@apollo/client";

export const SIGNUP_USER = gql`
  mutation createUser($newUser: UserInput!) {
    user: singupUser(newUser: $newUser) {
      firstName
    }
  }
`;

export const LOGIN_USER = gql`
  mutation singinUser($userSignin: UserSigninInput!) {
    user: singinUser(userSignin: $userSignin) {
      token
    }
  }
`;

export const CREATE_QUOTE = gql`
  mutation createQuote($name: String!) {
    quote: createQuote(name: $name)
  }
`;
