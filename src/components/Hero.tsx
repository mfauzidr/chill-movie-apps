import Button from './Button'

const Hero = () => {
  return (
    <section
      className="relative isolate flex min-h-56 w-full flex-col justify-end gap-2.5 bg-cover bg-center px-8 pb-10 md:min-h-80 md:gap-5 md:px-12 lg:h-96 lg:gap-10 lg:px-32"
      style={{ backgroundImage: "url('/assets/banners/banner-das.webp')" }}
    >
      <div aria-hidden="true" className="absolute inset-0 bg-linear-to-b from-header-background/10 to-header-background" />
      <div className="relative z-10 flex w-full flex-col gap-2">
        <div className="flex w-full flex-col gap-2 md:max-w-3/4 lg:max-w-3/5">
          <h1 className="w-full text-2xl md:text-3xl lg:text-5xl">Duty After School</h1>
          <p className="line-clamp-2 text-sm md:line-clamp-3 md:text-base lg:line-clamp-none">
            Sebuah benda tak dikenal mengambil alih dunia. Dalam keputusasaan, Departemen Pertahanan mulai merekrut lebih banyak tentara, termasuk siswa sekolah menengah. Mereka pun segera menjadi pejuang garis depan dalam perang.
          </p>
        </div>
      </div>
      <div className="relative z-10 flex justify-between">
        <div className="flex gap-3">
          <Button className="px-4 py-1.5 text-xs md:px-5 md:text-sm lg:px-6 lg:text-base">Mulai</Button>
          <Button variant="secondary" className="gap-2 px-4 py-1.5 text-xs md:px-5 md:text-sm lg:px-6 lg:text-base">
            <img src="/assets/icons/about.svg" alt="" className="h-3 w-3 md:h-3.5 md:w-3.5 lg:h-4 lg:w-4" />
            Selengkapnya
          </Button>
          <Button variant="outline" className="px-2 text-xs md:text-sm lg:text-base">18+</Button>
        </div>
        <button aria-label="Mute" className="rounded-full border border-greyscale-400 px-2 hover:border-text-light">
          <img className="h-3 w-3 md:h-4 md:w-4" src="/assets/icons/mute.svg" alt="" />
        </button>
      </div>
    </section>
  )
}

export default Hero