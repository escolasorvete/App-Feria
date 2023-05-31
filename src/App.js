import React, { Component } from "react";
import WheelComponent from "./weel";
import "react-wheel-of-prizes/dist/index.css";
import "./styles.css";
import IMAGES from "./assets";
import Logo from "./assets/logo-horizontal.png";
import TrPortal from "./portal";
import Confetti from "react-confetti";
// import emailjs from "emailjs-com"; // Comentar esta línea para desactivar el envío de correo electrónico

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      portal: false,
      show: false,
      email: "",
      emailSent: false,
    };
  }

  getEmail = async () => {
    try {
      const response = await fetch(
        "https://sheet2api.com/v1/o9EZiCzTliju/leads-feria"
      );
      const data = await response.json();
      const email = data[0].email;
      console.log("este es el email para el envio del premio: ", email);
      this.setState({ email });
    } catch (error) {
      console.error(error);
    }
  };

  // Comentar la función sendEmail para desactivar el envío de correo electrónico
  // sendEmail = async () => {
  //   const { email } = this.state;
  //   if (!email) {
  //     console.error("No email found");
  //     return;
  //   }

  //   const serviceId = "service_868fofh";
  //   const templateId = "template_6rnqza7";
  //   const userId = "mxT9ULWdZOKiPqppb";

  //   try {
  //     await new Promise((resolve) => {
  //       this.setState({ show: this.state.show }, resolve);
  //     });

  //     const templateParams = {
  //       message_html: `Parabéns! você ganhou um ${this.state.show}!`,
  //     };

  //     console.log(templateParams);

  //     await emailjs.send(
  //       serviceId,
  //       templateId,
  //       { to_name: email, ...templateParams },
  //       userId
  //     );
  //     console.log("Email sent!");
  //     this.setState({ emailSent: true });
  //   } catch (error) {
  //     console.error("Email error:", error);
  //   }
  // };

  onFinished = async (winner) => {
    console.log("Winner:", winner);
    this.setState({ portal: false, show: winner }, async () => {
      await this.getEmail();
      // Comentar la siguiente línea si no se desea enviar el correo electrónico
      // if (!this.state.emailSent) {
      //   this.sendEmail();
      // }
    });
  };

  render() {
    let objIndex = {
      Iphone13promax: 1,
      Bosesurroundspeakers: 2,
      "Samsung65-InchCrystalUHD4KFlatSmartTV": 3,
      "MacBookAirMGN6314”Display,AppleM1ChipWith8-Core": 4,
      KIATELLURIDE2022: 5,
      SAMSUNGFRONTLOADWASHINGMACHINE16KG: 6,
      "10GRAMSGOLDCOIN": 7,
      VOUCHERFORGEORGIAFAMILYTRIPUPTO4: 8,
      AMAZONGIFTVOUCHER1000: 9,
      "100GRAMSGOLDBAR": 10,
    };

    let array = Object.keys(objIndex);

    let selectedItem = null;
    if (this.state.show) {
      selectedItem = objIndex[this.state.show];
    }

    return (
      <div className="App">
        {this.state.portal ? (
          <TrPortal onFinished={this.onFinished} />
        ) : (
          <>
            <div className="App-header">
              <img src={Logo} className="App-logo" alt="logo" />
              <h1 className="App-title">Wheel of Prizes</h1>
            </div>
            <WheelComponent
              slices={[
                { value: array[0], name: array[0], id: 1 },
                { value: array[1], name: array[1], id: 2 },
                { value: array[2], name: array[2], id: 3 },
                { value: array[3], name: array[3], id: 4 },
                { value: array[4], name: array[4], id: 5 },
                { value: array[5], name: array[5], id: 6 },
                { value: array[6], name: array[6], id: 7 },
                { value: array[7], name: array[7], id: 8 },
                { value: array[8], name: array[8], id: 9 },
                { value: array[9], name: array[9], id: 10 },
              ]}
              onUpdate={(state) => console.log(state)}
              onFinished={(winner) => this.onFinished(winner)}
              selected={selectedItem}
              buttonText={"Spin the wheel!"}
              primaryColor={"#000"}
              contrastColor={"#FFF"}
              fontSize={"18px"}
              diameter={300}
              fontFamily={"monospace"}
              textDistance={80}
              perpendicularText={true}
            />
          </>
        )}
        {this.state.show && (
          <div className="prize-result">
            <h2>Congratulations!</h2>
            <p>You won a {this.state.show}!</p>
            {/* Comentar la siguiente línea si no se desea mostrar el confeti */}
            <Confetti />
          </div>
        )}
      </div>
    );
  }
}

export default App;
