import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/LogoApp.jpg"; // Importa la imagen del logo

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link href="/">
          <Image
            className="logo-Img"
            src={logo}
            alt="Coviamuro Logo"
            width={65}
            height={65}
          />
        </Link>
      </div>
      <nav className="nav">
        <ul>
          <li>
            <Link href="/partnerForm">
              <button className="navBtn">Partner Form</button>
            </Link>
          </li>
          <li>
            <Link href="/contact">
              <button className="navBtn">Contacto</button>
            </Link>
          </li>
          <li>
            <Link href="/LoginPage">
              <button className="navBtn">Login</button>
            </Link>
          </li>
          <li>
            <Link href="/livingPlaceForm">
              <button className="navBtn">Living Place Form</button>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
