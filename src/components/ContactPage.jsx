import { addDoc, collection } from "firebase/firestore";
import axios from "axios";
import { db } from "../App";
import { useState } from "react";

export default function ContactPage({ setShowSuccessModal, setShowErrorModal }) {

    const [formFirstName, setFormFirstName] = useState(null);
    const [formLastName, setFormLastName] = useState(null);
    const [formPhone, setFormPhone] = useState(null);
    const [formMessage, setFormMessage] = useState(null);

    async function createClient1(first, last, phone) {
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
        <div className="w-full h-full">
            <div className="w-full bg-gradient-to-br from-gray-50 to-gray-300 rounded-md mb-10 mt-10">
                <h1 className="text-center text-[40px] font-bold font-iosevka">Contact Us</h1>
            </div>
            <div className="w-full h-4/5 bg-gradient-to-br from-gray-50 to-gray-300 rounded-md grid place-items-center">
                <div className="lg:w-1/4 h-full gap-y-4 flex flex-col justify-center">
                    <input
                        type="text"
                        placeholder="Enter first name"
                        className="text-xl rounded-lg p-2 w-4/5 mx-auto"
                        onChange={(e) => setFormFirstName(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Enter last name"
                        className="text-xl rounded-lg p-2 w-4/5 mx-auto"
                        onChange={(e) => setFormLastName(e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Enter phone number"
                        className="text-xl rounded-lg p-2 w-4/5 mx-auto"
                        onChange={(e) => setFormPhone(e.target.value)}
                        required
                    />
                    <textarea
                        className="rounded-xl p-2 w-4/5 h-20 text-xl mx-auto"
                        placeholder="Enter your message"
                        onChange={(e) => setFormMessage(e.target.value)}
                    />
                    <button
                        className="bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-xl text-white 
                            font-iosevka font-semibold text-xl w-4/5 mx-auto"
                        onClick={() => {
                            if (formFirstName && formLastName && formPhone) {
                                createClient1(formFirstName, formLastName, formPhone);
                            }
                        }
                        }
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}