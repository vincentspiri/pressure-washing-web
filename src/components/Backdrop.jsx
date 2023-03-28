import { motion } from "framer-motion";
import { useScroll } from "framer-motion";

export default function Backdrop({ children, onClick }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-screen h-screen bg-[#000000a6] absolute top-0 left-0 cursor-pointer z-10"
            onClick={onClick}
        >
            {children}
        </motion.div>
    )
}