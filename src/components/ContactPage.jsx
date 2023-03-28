import { useContext } from "react";
import MyContext from "../MyContext";

export default function ContactPage() {
    const { formFirstName, formLastName, formPhone, setFirst, setLast, setPhone, createClient, setFormMessage } = useContext(MyContext);

    return (
        <div className="w-full h-full">
            <div className="w-full bg-gradient-to-br from-gray-50 to-gray-300 rounded-md mb-10 mt-10">
                <h1 className="text-center text-[40px] font-bold font-iosevka">Contact Us</h1>
            </div>
            <div className="w-full h-4/5 bg-gradient-to-br from-gray-50 to-gray-300 rounded-md grid place-items-center">
                <div className="w-1/4 h-full grid place-items-center">
                    <input
                        type="text"
                        placeholder="Enter first name"
                        className="text-xl rounded-lg p-2 w-4/5"
                        onChange={(e) => setFirst(e)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Enter last name"
                        className="text-xl rounded-lg p-2 w-4/5"
                        onChange={(e) => setLast(e)}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Enter phone number"
                        className="text-xl rounded-lg p-2 w-4/5"
                        onChange={(e) => setPhone(e)}
                        required
                    />
                    <textarea
                        className="rounded-xl p-2 w-4/5"
                        cols="30"
                        rows="8"
                        placeholder="Enter your message"
                        onChange={(e) => setFormMessage(e.target.value)}
                    />
                    <button
                        className="bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-xl text-white 
                            font-iosevka font-semibold text-xl"
                        onClick={() => {
                            if (formFirstName && formLastName && formPhone) {
                                createClient(formFirstName, formLastName, formPhone)
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