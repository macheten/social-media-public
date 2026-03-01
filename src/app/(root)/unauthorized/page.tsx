import { LoginButton } from "@shared/components/shared/login-button";

export default function UnauthorizedPage() {
  return <div className="flex flex-col justify-center items-center text-xl h-full">
    <div className="text-2xl text-center mb-4">
      Эту страницу могут просматривать только авторизованные пользователи
    </div>

    <LoginButton />
  </div>
}
