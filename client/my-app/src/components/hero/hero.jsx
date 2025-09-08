
import "./hero.css"
export function Hero(){
    return (
        <div className="hero">
<div id="carouselExampleDark" className="carousel carousel-dark slide">
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
     <a href="#menu"> <button className="view-menu">view menu</button></a>
  <div className="carousel-inner">
    <div className="carousel-item active" data-bs-interval="500">

      <img src="./images/bannerTwo.jpg" className="d-block w-100" alt="..."/>
      <div className="carousel-caption d-none d-md-block banner-title">
        <h5>Make Your Life Easyyy!</h5>
        <p>Some representative placeholder content for the first slide.</p>
      </div>
    </div>
    <div className="carousel-item" data-bs-interval="500">
    <img src="./images/bannerThree.jpg" className="d-block w-100" alt="..."/>
    <div className="carousel-caption d-none d-md-block banner-title">
        <h5>Second slide label</h5>
        <p>Some representative placeholder content for the second slide.</p>
      </div>
    </div>
   
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
        </div>
    )
}
