import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header>
      <nav className="mx-auto flex h-14 w-full items-center justify-between px-8 md:h-16 md:px-12 lg:h-20 lg:px-32">
        <div className="flex items-center gap-3 md:gap-8 lg:gap-12">
          <button
            type="button"
            className="flex items-center justify-center"
            onClick={async () => navigate("/")}
          >
            <img
              src="/assets/logo/logo-full.svg"
              className="h-4 md:h-5 cursor-pointer"
              alt="Chill Logo"
            />
          </button>
          <div className="flex gap-3 md:gap-6 lg:gap-8">
            <a
              className="text-sm text-text-light no-underline hover:text-greyscale-400 md:text-base md:font-bold lg:text-lg"
              href="#series"
            >
              Series
            </a>
            <a
              className="text-sm text-text-light no-underline hover:text-greyscale-400 md:text-base md:font-bold lg:text-lg"
              href="#film"
            >
              Film
            </a>
            <a
              className="text-sm text-text-light no-underline hover:text-greyscale-400 md:text-base md:font-bold lg:text-lg"
              href="#lanjut-menonton"
            >
              Daftar Saya
            </a>
          </div>
        </div>
        <div className="group relative">
          <div className="flex items-center md:gap-1 lg:gap-2">
            <button
              aria-label="Profil"
              className="h-7.5 w-7.5 overflow-hidden rounded-full md:h-9 md:w-9 lg:h-11 lg:w-11"
            >
              <img
                src="/assets/images/avatar.webp"
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </button>
            <img
              src="/assets/icons/dropdown.svg"
              alt=""
              className="h-7.5 w-7.5 md:h-8 md:w-8 lg:h-10 lg:w-10"
            />
          </div>
          <div className="absolute right-0 top-full z-10 hidden w-40 rounded-b-md bg-header-background p-3 text-xs group-hover:block md:w-56 md:text-sm lg:text-base">
            {[
              ["Profil Saya", "profile.svg"],
              ["Ubah Premium", "star.svg"],
              ["Keluar", "sign.svg"],
            ].map(([label, icon]) => (
              <a
                key={label}
                href="#"
                className="flex items-center gap-2 px-3 py-3 font-bold text-text-light no-underline hover:text-primary-hover"
              >
                <img className="h-5 w-5" src={`/assets/icons/${icon}`} alt="" />
                <span>{label}</span>
              </a>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
