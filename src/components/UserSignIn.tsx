"use client";

import { signIn } from "next-auth/react";

export default function UserSignIn() {
  return (
    <div>
      <h3>Hello and welcome to our app :) pls sign in</h3>
      <button onClick={() => signIn("discord")}>Sign In</button>
    </div>
  );
}
