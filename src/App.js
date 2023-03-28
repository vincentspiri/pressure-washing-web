import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import Navbar from "./components/Navbar";
import NavModal from "./components/NavModal";
import before from './images/before.webp';
import after from './images/after.webp';
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { AiOutlineDown } from 'react-icons/ai';
import bubblesvg from './images/bubble-blue.svg';
import { initializeApp } from 'firebase/app';
import { addDoc, collection, getFirestore } from "firebase/firestore";
import SuccessModal from "./components/SuccessModal";
import ErrorModal from "./components/ErrorModal";
import WebAd from "./components/WebAd";
import AboutPage from "./components/AboutPage";
import MyContext from "./MyContext";
import ContactPage from "./components/ContactPage";
import axios from "axios";

const firebaseConfig = {
  apiKey: "AIzaSyCx8_eZBavS6zROqDgv5OrLbd3MPamaqek",
  authDomain: "vk-pressure-washing.firebaseapp.com",
  projectId: "vk-pressure-washing",
  storageBucket: "vk-pressure-washing.appspot.com",
  messagingSenderId: "715190279585",
  appId: "1:715190279585:web:5635141bfa8dd8f8b6ffe0",
  measurementId: "G-JE39QJ08N5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function App() {
  const [nav, setNav] = useState(false);
  const [formFirstName, setFormFirstName] = useState(null);
  const [formLastName, setFormLastName] = useState(null);
  const [formPhone, setFormPhone] = useState(null);
  const [formMessage, setFormMessage] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [webAd, setWebAd] = useState(true);
  const parallax = useRef(null);

  function setFirst(event) {
    setFormFirstName(event.target.value);
  }
  function setLast(event) {
    setFormLastName(event.target.value);
  }
  function setPhone(event) {
    setFormPhone(event.target.value);
  }

  async function createClient(first, last, phone) {
    try {
      const docRef = await addDoc(collection(db, "clients"), {
        first: first,
        last: last,
        phone: phone
      });
      console.log(`Document writtten with ID: ${docRef.id}`);
      setShowSuccessModal(true);
      setTimeout(() => setShowSuccessModal(false), 5000);
      sendMessage("6086159052", `You got a new client! First: ${first}, Last: ${last}, Phone: ${phone}, Message: ${formMessage}`);
    } catch (e) {
      console.error(`Error adding document: ${e}`);
      setShowErrorModal(true);
      setTimeout(() => setShowErrorModal(false), 5000);
    }
  }

  const sendMessage = (phoneNumber, message) => {
    const formData = new FormData();
    formData.append("To", `+1${phoneNumber}`);
    formData.append("From", process.env.REACT_APP_TWILIO_PHONE);
    formData.append("Body", message);

    axios.post(`https://api.twilio.com/2010-04-01/Accounts/${process.env.REACT_APP_TWILIO_SID}/Messages.json`,
      formData,
      {
        auth: {
          username: process.env.REACT_APP_TWILIO_SID,
          password: process.env.REACT_APP_TWILIO_TOKEN,
        },
      }).then(response => {
        console.log(response.data);
      }).catch(error => {
        console.error(error);
      });
  };

  return (
    <div
      className="bg-[#0B132B] w-screen h-screen"
    >
      <Navbar callback={() => setNav(!nav)} />
      <AnimatePresence
        mode="wait"
      >
        {
          nav &&
          <NavModal
            handleClose={() => setNav(false)}
            clickEvent={(index) => parallax.current.scrollTo(index)}
          />
        }
        {
          showSuccessModal && <SuccessModal callback={() => setShowSuccessModal(false)} />
        }
        {
          showErrorModal && <ErrorModal callback={() => setShowErrorModal(false)} />
        }
      </AnimatePresence>
        {
          webAd && <WebAd closeFunc={() => setWebAd(false)}/>
        }
      <Parallax ref={parallax} pages={4}>

        <ParallaxLayer offset={0} speed={-0.1}>
          <div className="grid place-items-center h-full relative">
            <h1 className="text-white font-iosevka font-bold text-[60px]">Want your house to look like this?</h1>
            <motion.div
              animate={{ y: ["-100%", "50%", "-100%"] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="absolute bottom-20"
            >
              <AiOutlineDown className="down-arrow text-white font-bold text-[50px]" />
            </motion.div>
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={1.25} speed={0.6} className="pt-16">
          <h1 className="text-white font-iosevka font-bold text-[60px] text-center">From this -----> To THIS!</h1>
          <div className="border-8 border-blue-300 mx-20 mt-16">
            <img src={before} className="w-1/2 inline" />
            <img src={after} className="w-1/2 inline" />
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={2} speed={0.8} className="pt-20">
          <AboutPage />
        </ParallaxLayer>

        <ParallaxLayer
          offset={3}
          speed={3}
          className="z-20 p-20"
        >
          <MyContext.Provider
            value={{ formFirstName, formLastName, formPhone, setFirst, setLast, setPhone, createClient, setFormMessage }}
          >
            <ContactPage />
          </MyContext.Provider>
        </ParallaxLayer>

        <ParallaxLayer offset={1} speed={0.8} style={{ opacity: 0.1 }}>
          <img src={bubblesvg} style={{ display: 'block', width: '20%', marginLeft: '55%' }} />
          <img src={bubblesvg} style={{ display: 'block', width: '10%', marginLeft: '15%' }} />
        </ParallaxLayer>

        <ParallaxLayer offset={1.75} speed={0.5} style={{ opacity: 0.1 }}>
          <img src={bubblesvg} style={{ display: 'block', width: '20%', marginLeft: '70%' }} />
          <img src={bubblesvg} style={{ display: 'block', width: '20%', marginLeft: '40%' }} />
        </ParallaxLayer>

        <ParallaxLayer offset={1} speed={0.2} style={{ opacity: 0.2 }}>
          <img src={bubblesvg} style={{ display: 'block', width: '10%', marginLeft: '10%' }} />
          <img src={bubblesvg} style={{ display: 'block', width: '20%', marginLeft: '75%' }} />
        </ParallaxLayer>

        <ParallaxLayer offset={1.6} speed={-0.1} style={{ opacity: 0.1 }}>
          <img src={bubblesvg} style={{ display: 'block', width: '20%', marginLeft: '20%' }} />
          <img src={bubblesvg} style={{ display: 'block', width: '10%', marginLeft: '80%' }} />
        </ParallaxLayer>

        <ParallaxLayer offset={2} speed={0.8} style={{ opacity: 0.1 }}>
          <img src={bubblesvg} style={{ display: 'block', width: '20%', marginLeft: '30%' }} />
          <img src={bubblesvg} style={{ display: 'block', width: '10%', marginLeft: '15%' }} />
        </ParallaxLayer>

        <ParallaxLayer offset={2.75} speed={0.5} style={{ opacity: 0.1 }}>
          <img src={bubblesvg} style={{ display: 'block', width: '20%', marginLeft: '70%' }} />
          <img src={bubblesvg} style={{ display: 'block', width: '20%', marginLeft: '40%' }} />
        </ParallaxLayer>

        <ParallaxLayer offset={2} speed={0.2} style={{ opacity: 0.2 }}>
          <img src={bubblesvg} style={{ display: 'block', width: '10%', marginLeft: '10%' }} />
        </ParallaxLayer>

        <ParallaxLayer offset={2.6} speed={-0.1} style={{ opacity: 0.3 }}>
          <img src={bubblesvg} style={{ display: 'block', width: '20%', marginLeft: '60%' }} />
          <img src={bubblesvg} style={{ display: 'block', width: '25%', marginLeft: '30%' }} />
          <img src={bubblesvg} style={{ display: 'block', width: '10%', marginLeft: '80%' }} />
        </ParallaxLayer>

      </Parallax>
    </div>
  );
}

export default App;
