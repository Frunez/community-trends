import React from "react";

type ErrorMessageProps = { errorMessage: string; };

export default function ErrorMessage({ errorMessage }: ErrorMessageProps) {
  return <div>{errorMessage}</div>;
}