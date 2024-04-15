import Image from 'next/image';
import Link from 'next/link';
import '../../../public/Styles.css'; // Importa el archivo correcto de estilos
import logo from '../../../public/LogoApp.jpg'; // Importa la imagen del logo

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link href="/">
          <Image className="logo-Img"src={logo} alt="Coviamuro Logo" width={150} height={60} />
        </Link>
      </div>
      <nav className="nav">
        <ul>
          <li>
            <Link href="/about">
              <button className="navBtn">Acerca de</button>
            </Link>
          </li>
          <li>
            <Link href="/contact">
              <button className="navBtn">Contacto</button>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
