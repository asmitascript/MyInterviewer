import "./Footer.css";

import MainFooter from "./MainFooter"

function Footer() {
  return (
    <>
        <div className="footer-main">

            <div className="footer-brand">
                <h2>MyInterviewer</h2>

                <p>
                    Practice smarter with AI 
                    <br />and become interview-ready.
                </p>
            </div>


            <div className="footer-links">
                <h2>Product</h2>

                <ul>
                    <li>Features</li>
                    <li>How It Works</li>
                    <li>Pricing</li>
                </ul>
            </div>

        </div>
        <MainFooter></MainFooter>
    </>
  );
}

export default Footer;