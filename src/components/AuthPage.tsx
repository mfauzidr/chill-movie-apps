import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import FormField from "./FormField";

interface AuthPageProps {
  mode: "login" | "register";
}

const AuthPage = ({ mode }: AuthPageProps) => {
  const navigate = useNavigate();
  const isLogin = mode === "login";
  const title = isLogin ? "Masuk" : "Daftar";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <main
      className="flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('/assets/bg/${mode}-bg.webp')` }}
    >
      <form
        onSubmit={handleSubmit}
        className="m-6 flex h-fit w-full min-w-3xs max-w-180 flex-col items-center gap-5 rounded-lg bg-header-background/84 p-6 md:p-8"
      >
        <button
          type="button"
          className="flex items-center justify-center"
          onClick={async () => navigate("/")}
        >
          <img
            src="/assets/logo/logo-full.svg"
            className="h-6 md:h-12 cursor-pointer"
            alt="Chill Logo"
          />
        </button>
        <div className="text-center">
          <h1 className="my-[0.67em] text-lg font-bold leading-[140%] tracking-[0.2px] text-text-light md:text-2xl lg:text-[28px]">
            {title}
          </h1>
          <p className="-mt-4 mb-4 text-xs font-normal leading-[140%] tracking-[0.2px] text-text-light md:text-sm lg:text-base">
            {isLogin ? "Selamat datang kembali!" : "Selamat datang!"}
          </p>
        </div>
        <div className="flex w-full flex-col gap-6">
          <fieldset className="m-0 flex flex-col gap-6 border-0 p-0">
            <FormField
              id="username"
              label="Username"
              placeholder="Masukkan username"
            />
            <FormField
              id="password"
              label="Kata Sandi"
              placeholder="Masukkan kata sandi"
              type="password"
            />
            {!isLogin && (
              <FormField
                id="confirm-password"
                label="Konfirmasi Kata Sandi"
                placeholder="Konfirmasi kata sandi"
                type="password"
              />
            )}
          </fieldset>
          <div className="flex w-full justify-between text-text-light">
            <p className="-mt-3 mb-4 flex text-xs leading-[140%] tracking-[0.2px] text-greyscale-400 md:text-sm lg:text-lg">
              {isLogin ? "Belum punya akun?" : "Sudah punya akun?"}
              <button
                type="button"
                className="ml-0.5 text-text-light cursor-pointer"
                onClick={async () => navigate(isLogin ? "/register" : "/login")}
              >
                {isLogin ? "Daftar" : "Masuk"}
              </button>
            </p>
            {isLogin && (
              <a
                className="-mt-3 mb-4 text-xs leading-[140%] tracking-[0.2px] text-text-light no-underline md:text-sm lg:text-lg"
                href="#"
              >
                Lupa kata sandi?
              </a>
            )}
          </div>
        </div>
        <div className="flex w-full flex-col justify-between">
          <Button
            type="submit"
            variant="secondary"
            className="h-7.5 rounded-[13.86px] border-[0.58px] border-solid border-text-light/23 px-5 py-2.5 text-xs font-medium text-text-light md:h-9 md:text-sm lg:h-10 lg:text-base"
          >
            {title}
          </Button>
          <p className="my-[1em] flex justify-center text-[10px] leading-[140%] tracking-[0.2px] text-text-light md:text-sm lg:text-base">
            Atau
          </p>
          <Button
            type="button"
            variant="outline"
            className="h-7.5 gap-1 rounded-[13.86px] border-[0.58px] border-solid border-text-light/23 px-5 py-2.5 text-xs font-medium text-text-light md:h-9 md:text-sm lg:h-10 lg:text-base"
          >
            <img
              className="h-2.5 w-2.5 md:h-3 md:w-3 lg:h-3.5 lg:w-3.5"
              src="/assets/icons/google.svg"
              alt=""
            />
            {isLogin ? "Masuk" : "Daftar"} dengan Google
          </Button>
        </div>
      </form>
    </main>
  );
};

export default AuthPage;
