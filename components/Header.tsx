import Image from "next/image";

export default function Header({classes}: {classes?: string}) {
  return (
    <header className={`${classes}`}>
      <div className="relative w-28 h-28 md:w-44 md:h-44">
        <Image src="/logo-light.svg" alt="Logo" fill priority className="" />
      </div>
    </header>
  );
}
