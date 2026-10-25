const genres = [
  ['Aksi', 'Anak-anak', 'Anime', 'Britania'],
  ['Drama', 'Fantasi Ilmiah & Fantasi', 'Kejahatan', 'KDrama'],
  ['Komedi', 'Petualangan', 'Perang', 'Romantis'],
  ['Sains & Alam', 'Thriller'],
]

const helpLinks = ['FAQ', 'Kontak Kami', 'Privasi', 'Syarat & Ketentuan']

const Footer = () => {
  return (
    <footer className="flex w-full flex-col justify-between gap-10 border-t border-text-light/23 px-9 py-6 text-greyscale-400 md:gap-6 md:px-12 md:py-8 lg:flex-row lg:items-center lg:px-32 lg:py-12">
      <div className="flex flex-col items-start gap-4 md:gap-5 lg:gap-6.5">
        <img src="/assets/logo/logo-full.svg" className="h-6.5 lg:h-12" alt="Chill" />
        <div className="text-xs md:text-sm lg:text-base">©2023 Chill All Rights Reserved.</div>
      </div>
      <div className="flex flex-col justify-between gap-2 text-sm md:flex-row md:gap-16 lg:gap-24 lg:text-base">
        <div className="flex flex-col gap-3.75">
          <div className="flex w-full cursor-pointer justify-between px-2 py-1 text-text-light hover:bg-extra-background md:-mx-2 md:w-fit md:hover:bg-transparent">
            <p>Genre</p><img src="/assets/icons/chevron-right.svg" className="md:hidden" alt="" />
          </div>
          <div className="hidden justify-between gap-7 md:flex">
            {genres.map((column, index) => (
              <div className="flex flex-col gap-3.75" key={index}>
                {column.map((genre) => <a className="hover:text-text-light" href="#" key={genre}>{genre}</a>)}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3.75">
          <div className="flex w-full cursor-pointer justify-between px-2 py-1 text-text-light hover:bg-extra-background md:-mx-2 md:w-fit md:hover:bg-transparent">
            <p>Bantuan</p><img src="/assets/icons/chevron-right.svg" className="md:hidden" alt="" />
          </div>
          <div className="hidden justify-between md:flex">
            <div className="flex flex-col gap-3.75">
              {helpLinks.map((link) => <a className="hover:text-text-light" href="#" key={link}>{link}</a>)}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer