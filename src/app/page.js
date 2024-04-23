import Image from "next/image";
import Link from "next/link";
import Header from "../app/Components/header";
import imagen from "../../public/LogoApp.jpg";

export default function Home() {
  return (
    <div className="container">
      <main className="main">
        <section className="hero">
          <div className="heroContent">
            <h1>Bienvenido a Coviamuro</h1>
            <p>Cooperativa de Viviendas</p>
            <Link href="/about">
              <button className="btn">Acerca de Nosotros</button>
            </Link>
          </div>

          <iframe
            className="heroVideo"
            width="560"
            height="315"
            src="https://www.youtube.com/embed/w5B9cPEaEss"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </section>
        <section className="services">
          <h2>Nuestros Servicios</h2>
          <div className="serviceCards">
            <div className="serviceCard">
              <h3>Construcción Sostenible</h3>
              <p>Construimos viviendas respetuosas con el medio ambiente.</p>
            </div>
            <div className="serviceCard">
              <h3>Diseño Personalizado</h3>
              <p>Ofrecemos diseños únicos adaptados a tus necesidades.</p>
            </div>
            <div className="serviceCard">
              <h3>Asesoramiento Financiero</h3>
              <p>Te ayudamos a encontrar la mejor opción de financiación.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
