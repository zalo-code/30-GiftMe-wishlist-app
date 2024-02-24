"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import BasicBox from "@/frontend/components/ui/basic-box/basic-box";
import PasswordInvisibleIcon from "@/frontend/components/icons/password-invisible-icon";
import PasswordVisibleIcon from "@/frontend/components/icons/password-visible-icon";
import GoogleIcon from "@/frontend/components/icons/google-icon";
import FacebookIcon from "@/frontend/components/icons/facebook-icon";

import BasicButton from "@/frontend/components/ui/basic-button/basic-button";

type Credentials = {
  email: string;
  password: string;
};
const SigninForm = () => {
  const [credentials, setCredentials] = useState<Credentials>({ email: "", password: "" });
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [errors, setErrors] = useState({
    email: "abc",
    password: "123",
  });
  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible((current) => !current);
  };

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCredentials((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    type Error = {
      regEx: string;
      message: string;
    };

    type CredentialErrors = Error[];

    const emailErrors: CredentialErrors = [
      { regEx: "/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/", 
      message: "Invalid email" },
      {
        regEx: "^.{6,254}$",
        message: "Email length",
      },
    ];

    const passwordErrors: CredentialErrors = [
      { regEx: "^.{8,}$",
       message: "Password too short" },
      {
        regEx: "^(?=.*[A-Z]).{8,}$",
        message: "At least oen uppercase letter",
        // Not offering details for security reasons - Password must contain at least one uppercase
      },
      {
        regEx: "^(?=.*[a-z]).{8,}$",
        message: "At least one lowercase letter",
        // Not offering details for security reasons - Password must contain at least one lowercase
      },
      {
        regEx: "^(?=.*\d).{8,}$",
        message: "At least oen digit",
        // Not offering details for security reasons - Password must contain at least one digit
      },
     
      

    ];

    alert(`email: ${credentials.email} password: ${credentials.password}`);
  };

  return (
    <div className="">
      <BasicBox background={"bg-yellow-200"}>
        <form className="flex flex-col space-y-3" onSubmit={handleSubmit}>
          <div className="font-bold text-xl ">Sign in</div>
          <div className="flex flex-col">
            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm font-semibold">
                Email
              </label>
              <input
                className="rounded bg-yellow-100 h-9"
                id="email"
                name="email"
                value={credentials.email}
                onChange={handleOnChange}></input>
              <div
                className={`${
                  errors.email ? "visible" : "invisible"
                } text-xs text-red-500 font-semibold mt-1 mb-3 `}>
                {errors.email}
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex justify-between">
                <label htmlFor="email" className="text-sm font-semibold">
                  Password
                </label>
                <span onClick={handleTogglePasswordVisibility}>
                  {isPasswordVisible ? <PasswordVisibleIcon /> : <PasswordInvisibleIcon />}
                </span>
              </div>
              <input
                className="rounded bg-yellow-100 h-9"
                id="password"
                name="password"
                type={isPasswordVisible ? "text" : "password"}
                value={credentials.password}
                onChange={handleOnChange}></input>
            </div>
            <div
              className={`${
                errors.password ? "visible" : "invisible"
              } text-xs text-red-500 font-semibold mt-1 mb-3`}>
              {errors.password}
            </div>
          </div>
          <div className="flex items-baseline ">
            <div className="text-[0.6rem] font-semibold">Sign in with</div>
            <div className="flex ms-3 space-x-3">
              <div className="">
                <GoogleIcon scale={0.36} />
              </div>
              <div className="">
                <FacebookIcon scale={0.75} />
              </div>
            </div>
          </div>
          <div className="text-[0.6rem] font-semibold">Forgot password?</div>
          <div className="flex space-x-3">
            <BasicButton size={"sm"}>
              <Link
                href="/"
                className="font-semibold w-full h-full flex items-center justify-center">
                Cancel
              </Link>
            </BasicButton>
            <BasicButton size={"lg"} variant={"full"}>
              <button
                type="submit"
                className="font-semibold w-full h-full items-center flex justify-center">
                Sign in
              </button>
            </BasicButton>
          </div>
        </form>
      </BasicBox>
    </div>
  );
};
export default SigninForm;
