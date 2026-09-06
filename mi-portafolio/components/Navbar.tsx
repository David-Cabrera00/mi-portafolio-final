"use client";

type Language = "es" | "en";
type Theme = "light" | "dark";

type NavbarProps = {
  lang: Language;
  theme: Theme;
  navOpen: boolean;
  activeSection: string;
  onToggleLanguage: () => void;
  onToggleTheme: () => void;
  onToggleMenu: () => void;
  onCloseMenu: () => void;
  onNavigate: (id: string) => void;
};

const navItems = [
  { id: "hero", es: "Inicio", en: "Home" },
  { id: "sobre-mi", es: "Sobre mí", en: "About" },
  { id: "habilidades", es: "Habilidades", en: "Skills" },
  { id: "proyectos", es: "Proyectos", en: "Projects" },
  { id: "contacto", es: "Contacto", en: "Contact" },
] as const;

function SunIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="M4.93 4.93l1.41 1.41" />
      <path d="M17.66 17.66l1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="M6.34 17.66l-1.41 1.41" />
      <path d="M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
    </svg>
  );
}

export default function Navbar({
  lang,
  theme,
  navOpen,
  activeSection,
  onToggleLanguage,
  onToggleTheme,
  onToggleMenu,
  onCloseMenu,
  onNavigate,
}: NavbarProps) {
  return (
    <header
      className="
        fixed top-5 left-1/2 z-50
        w-[94%] max-w-6xl
        -translate-x-1/2
      "
    >
      <nav
        role="navigation"
        aria-label="Navegación principal"
        className="
          relative
          flex min-h-[68px] items-center justify-between
          gap-3
          rounded-full
          border border-white/60
          bg-white/80
          px-6 py-2
          text-slate-800
          shadow-[0_10px_32px_rgba(15,23,42,0.10)]
          backdrop-blur-xl
          backdrop-saturate-150
          transition-all duration-300

          sm:px-8
          md:grid
          md:grid-cols-[1fr_auto_1fr]
          md:px-10
          lg:px-12

          dark:border-white/10
          dark:bg-neutral-900/80
          dark:text-white
          dark:shadow-[0_10px_32px_rgba(0,0,0,0.30)]
        "
      >
        {/* IZQUIERDA */}
        <a
          href="#hero"
          onClick={(event) => {
            event.preventDefault();
            onNavigate("hero");
            onCloseMenu();
          }}
          className="
            justify-self-start
            shrink-0 whitespace-nowrap
            text-[1.05rem] font-bold tracking-tight
            text-slate-950
            transition-colors duration-200
            hover:text-indigo-600

            dark:text-white
            dark:hover:text-indigo-400
          "
        >
          Mi Portafolio
        </a>

        {/* CENTRO */}
        <div
          className="
            hidden md:flex
            items-center justify-center
            gap-6
            lg:gap-7
          "
        >
          {navItems.map((item) => {
            const active = activeSection === item.id;

            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(event) => {
                  event.preventDefault();
                  onNavigate(item.id);
                  onCloseMenu();
                }}
                className={`
                  group relative
                  whitespace-nowrap
                  px-0.5 py-2
                  text-[0.95rem] font-medium
                  transition-colors duration-200
                  ${
                    active
                      ? "text-slate-950 dark:text-white"
                      : "text-slate-500 hover:text-slate-950 dark:text-neutral-400 dark:hover:text-white"
                  }
                `}
              >
                {lang === "es" ? item.es : item.en}

                <span
                  aria-hidden="true"
                  className={`
                    absolute left-1/2 -bottom-0.5
                    h-[3px] -translate-x-1/2
                    rounded-full
                    bg-gradient-to-r from-indigo-500 to-violet-500
                    transition-all duration-300
                    group-hover:w-full group-hover:opacity-100
                    ${active ? "w-full opacity-100" : "w-0 opacity-0"}
                  `}
                />
              </a>
            );
          })}
        </div>

        {/* DERECHA */}
        <div
          className="
            ml-auto flex shrink-0 items-center gap-2
            md:ml-0 md:justify-self-end
          "
        >
          <button
            type="button"
            onClick={onToggleLanguage}
            aria-label={lang === "es" ? "Cambiar a inglés" : "Cambiar a español"}
            className="
              flex h-11 min-w-[52px] items-center justify-center
              rounded-xl
              border border-slate-200/80
              bg-white/20
              px-3
              text-sm font-semibold tracking-wide text-slate-600
              backdrop-blur-md
              transition-all duration-200
              hover:border-indigo-400 hover:text-indigo-600

              dark:border-white/10
              dark:bg-white/5
              dark:text-neutral-300
              dark:hover:border-indigo-400
              dark:hover:text-indigo-400
            "
          >
            {lang === "es" ? "EN" : "ES"}
          </button>

          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={
              theme === "dark" ? "Activar modo claro" : "Activar modo oscuro"
            }
            className="
              flex h-11 w-11 items-center justify-center
              rounded-xl
              border border-slate-200/80
              bg-white/20
              text-slate-600
              backdrop-blur-md
              transition-all duration-200
              hover:border-indigo-400 hover:text-indigo-600

              dark:border-white/10
              dark:bg-white/5
              dark:text-neutral-300
              dark:hover:border-indigo-400
              dark:hover:text-indigo-400
            "
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>

          <button
            type="button"
            onClick={onToggleMenu}
            aria-label={navOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={navOpen}
            className="
              flex h-11 w-11 items-center justify-center
              rounded-xl
              border border-slate-200/80
              bg-white/20
              text-xl leading-none text-slate-600
              backdrop-blur-md
              transition-all duration-200
              hover:border-indigo-400 hover:text-indigo-600

              md:hidden

              dark:border-white/10
              dark:bg-white/5
              dark:text-neutral-300
              dark:hover:border-indigo-400
              dark:hover:text-indigo-400
            "
          >
            {navOpen ? "×" : "☰"}
          </button>
        </div>

        {/* MENÚ MÓVIL */}
        {navOpen && (
          <div
            className="
              absolute top-[calc(100%+0.75rem)] left-0 right-0
              z-50
              flex flex-col gap-1
              rounded-3xl
              border border-white/60
              bg-white/90
              p-3
              text-slate-800
              shadow-xl shadow-slate-900/10
              backdrop-blur-xl

              md:hidden

              dark:border-white/10
              dark:bg-neutral-900/90
              dark:text-white
              dark:shadow-black/30
            "
          >
            {navItems.map((item) => {
              const active = activeSection === item.id;

              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(event) => {
                    event.preventDefault();
                    onNavigate(item.id);
                    onCloseMenu();
                  }}
                  className={`
                    rounded-2xl px-4 py-3
                    text-sm font-medium
                    transition-colors duration-200
                    ${
                      active
                        ? "bg-indigo-500/10 text-indigo-600 dark:text-indigo-300"
                        : "text-slate-600 hover:bg-slate-100 dark:text-neutral-300 dark:hover:bg-white/5"
                    }
                  `}
                >
                  {lang === "es" ? item.es : item.en}
                </a>
              );
            })}
          </div>
        )}
      </nav>
    </header>
  );
}
