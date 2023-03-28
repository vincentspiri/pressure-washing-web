import { motion } from "framer-motion";
import { useState } from "react";
import Backdrop from "./Backdrop";

const menuItems = ["Home", "Preview", "About", "Contact"];

export default function NavModal({ handleClose, clickEvent }) {
    const [selected, setSelected] = useState(0);

    return (
        <Backdrop
            onClick={handleClose}
        >
            <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                className="w-1/3 h-screen bg-gradient-to-br from-cyan-300 to-cyan-400 grid place-items-center 
                            cursor-default absolute right-0 z-10 [clip-path: polygon(0 0, 100% 0, 100% 100%, 16% 100%)]"
                onClick={e => e.stopPropagation()}
            >
                <ul className="flex flex-col gap-16">
                    {
                        menuItems.map((e, i) => {
                            return (
                                <li className="text-center">
                                    <motion.button
                                        whileHover={{ scale: 1.2 }}
                                        className="text-[40px] font-bold font-iosevka"
                                        onClick={() => { clickEvent(selected); handleClose() }}
                                    >
                                        <motion.span
                                            onHoverStart={() => setSelected(i)}
                                        >{e}</motion.span>
                                        {
                                            selected === i &&
                                            <motion.div
                                                className="absolute w-full h-1 bg-black top-full left-0 rounded-2xl opacity-80"
                                            />
                                        }
                                    </motion.button>
                                </li>
                            )
                        })
                    }
                </ul>
            </motion.div>
        </Backdrop>
    )
}