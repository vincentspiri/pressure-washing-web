import { motion } from "framer-motion"
import { IoMdCloseCircle } from 'react-icons/io';

export default function SuccessModal({ callback }) {
    return (
        <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 10 }}
            exit={{ y: "-100%" }}
            className="absolute z-40 w-full flex justify-center"
        >
            <motion.div
                className="w-1/3 p-5 rounded-3xl border-4 border-green-600 bg-green-500"
            >
                <span className="text-white font-iosevka font-semibold text-xl flex items-center justify-center gap-4">
                    Successfully uploaded information!<IoMdCloseCircle onClick={callback} className="inline cursor-pointer" />
                </span>
            </motion.div>
        </motion.div>
    )
}