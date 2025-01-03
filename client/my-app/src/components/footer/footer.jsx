
import "./footer.css"
export function Footer(){
    return(
        <div  className="footer" id="foot">
            <hr />
         <div className="footer-title">Savor Every Bite, Delivered Right</div>
         <div className="footer-container">
         <div className="footer-left">
            <h1 className="text-warning fst-italic mb-4">Foodie!</h1>
         From your favorite local eateries to global cuisines, we deliver fresh, hot, and delicious meals right to your doorstep, satisfying cravings anytime, anywhere!
         <div className="d-flex mt-3">
                 <i className="bi bi-facebook text-warning fs-1"></i>
                <i className="bi bi-messenger text-warning fs-1"></i>
                <i className="bi bi-whatsapp text-warning fs-1"></i></div>
         </div>
        
         <div className="footer-center">
            <div className="text-center fs-2 text-warning">Company</div>
            <ul>
                <li>Home</li>
                <li>About Us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>
         </div>
         <div className="footer-right">
              <div className="text-center fs-2 text-warning">GET IN TOUCH</div>
                <ul>
                    <li>+91-9146282986</li>
                    <li>hritikdev@24gmail.com</li>
                </ul>
         </div>
      
         </div>
         <div className="copyright">
          
          @HritikGangadhar
          </div>
      </div>
       
    )
}