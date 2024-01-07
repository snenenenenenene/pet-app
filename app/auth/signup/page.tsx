"use client";

import { PB } from "@/app/store/store";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Signup() {
  const signup = async (e: FormEvent) => {
    e.preventDefault();
    const data = {
      username: name,
      email: email,
      emailVisibility: true,
      password: password,
      passwordConfirm: passwordConfirm,
      name: name,
      role: "user",
    };
    await PB.collection("users")
      .create(data)
      .then(() => {
        router.push("/");
        PB.collection("users").requestVerification(email);
      });
  };

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setpasswordConfirm] = useState("");

  const router = useRouter();
  return (
    <div className="px-10 flex flex-col w-full h-full">
      <h1 className="mt-20 text-2xl">Sign up</h1>
      <form className="mt-10 flex flex-col gap-4">
        <section className="flex flex-col">
          <label className="text-lg" htmlFor="name">
            Name
          </label>
          <input
            onChange={(e) => {
              setName(e.target.value);
            }}
            type="text"
            name="name"
            className="border-2 border-light-dark rounded-lg px-4 py-2"
            id="name"
          />
        </section>
        <section className="flex flex-col">
          <label className="text-lg" htmlFor="email">
            Email
          </label>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            name="email"
            className="border-2 border-light-dark rounded-lg px-4 py-2"
            id="email"
          />
        </section>
        <section className="flex flex-col">
          <label className="text-lg" htmlFor="password">
            Password
          </label>
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="border-2 border-light-dark rounded-lg px-4 py-2"
            type="password"
            name="password"
            id="password"
          />
        </section>
        <section className="flex flex-col">
          <label className="text-lg" htmlFor="password-confirm">
            Password Confirm
          </label>
          <input
            onChange={(e) => {
              setpasswordConfirm(e.target.value);
            }}
            className="border-2 border-light-dark rounded-lg px-4 py-2"
            type="password"
            name="password-confirm"
            id="password-confirm"
          />
        </section>

        <button
          onClick={(e) => {
            signup(e);
          }}
          className="w-full h-14 mt-4 rounded-3xl shadow bg-light-primary text-light-dark font-bold hover:bg-light-primary-2 px-4 py-2"
        >
          Create an Account
        </button>
      </form>
      <p className="text-center mt-4">
        Already have an account? Log in{" "}
        <a href="/auth/login" className="text-light-primary">
          here
        </a>
      </p>
    </div>
  );
}

export const Input = ({ label, ...props }: any) => {
  return (
    <section className="flex flex-col">
      <label htmlFor={props.id}>{label}</label>
      <input
        type="text"
        className="border-2 border-light-dark rounded-lg px-4 py-2"
        {...props}
      />
    </section>
  );
};
