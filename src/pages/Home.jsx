export default function Home() {
  return (
    <main className="main-index">
      <section className="section-carousel">
        <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="/img/Harley Davidson clasica_opt.jpg"
                className="d-block img-carousel"
                alt="Harley Davidson clasica"
              />
            </div>
            <div className="carousel-item">
              <img
                src="/img/Taller-de-motos_opt.jpg"
                className="d-block img-carousel"
                alt="Taller de motos"
              />
            </div>
            <div className="carousel-item">
              <img
                src="/img/Harley-Davidson-negra_opt.jpg"
                className="d-block img-carousel"
                alt="Harley Davidson negra"
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </section>
      <section className="texto-intro">
        <p>Somos un emprendimiento especializado en motos customs y clásicas, apasionados por cada detalle que hace única a tu máquina. Nuestro objetivo es que disfrutes de la ruta sin preocuparte por el mantenimiento.</p>
        <p>Ofrecemos un servicio integral de mecánica y cuidado, desde cambios de aceite hasta chequeos electrónicos, siempre utilizando productos de calidad y garantizando la máxima confiabilidad.</p>
        <p>Trabajamos a domicilio en CABA y GBA, para que puedas contar con la comodidad de tener tu moto lista sin moverte de tu casa. Nos encargamos de que tu moto esté preparada para cada salida, ya sea un paseo tranquilo o una larga travesía.</p>
      </section>
    </main>
  );
}
