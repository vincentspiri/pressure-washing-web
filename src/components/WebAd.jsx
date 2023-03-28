import { motion } from "framer-motion"

export default function WebAd({closeFunc}) {
    return (
        <motion.div 
            exit={{y: "100%"}}
            className="hidden lg:block w-1/6 h-20 absolute bottom-2 right-2 z-40 rounded-xl bg-[#00000099] 
                        border-2 border-neutral-600 text-center cursor-pointer"
            onClick={closeFunc}
        >
            <h2 className="font-iosevka font-semibold mt-1 text-lg text-white">Want a website like this?</h2>
            <p className="font-iosevka font-light text-sm text-white">
                For all your web design inquiries, contact (608)615-9052.
            </p>
        </motion.div>
    )
}