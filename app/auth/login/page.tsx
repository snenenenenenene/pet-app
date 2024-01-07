"use client";
import { PB } from "@/app/store/store";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Login() {
  const login = async (e: FormEvent) => {
    e.preventDefault();
    await PB.collection("users")
      .authWithPassword(email, password)
      .then(() => {
        router.push("/");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  return (
    <div className="px-10 flex flex-col w-full h-full">
      <h1 className="mt-20 text-2xl">Log in</h1>
      <form className="mt-10 flex flex-col gap-4">
        <section className="flex flex-col">
          <label className="text-lg" htmlFor="email">
            Email
          </label>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="text"
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

        <button
          onClick={(e) => {
            login(e);
          }}
          className="w-full h-14 mt-4 rounded-3xl shadow bg-light-primary text-light-dark font-bold hover:bg-light-primary-2 px-4 py-2"
        >
          Log in
        </button>
      </form>
      <p className="text-center mt-4">
        Don&apos;t have an account yet? Sign up{" "}
        <a href="/auth/signup" className="text-light-primary">
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
