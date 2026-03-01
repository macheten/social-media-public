import React from "react";

interface Props {
  code: string;
}

export const RegisterEmail: React.FC<Props> = ({ code }) => {
  return (
    <div>
      <h1>Подтвердите регистрацию</h1>
      <p>
        Для того чтобы активировать аккаунт, перейдите{" "}
        <b><a href={`${process.env.NEXTAUTH_URL}/verification?code=${code}`}>по этой ссылке</a></b>
      </p>
    </div>
  );
};
