import { HiMenu } from 'react-icons/hi';
import { motion } from 'framer-motion';

//https://coolors.co/0b132b-1c2541-3a506b-5bc0be-ffffff

export default function Navbar({ callback }) {
    return (
        <div className="fixed top-0 left-0 flex items-center w-screen h-12 bg-[#3A506B] z-20">
            <ul className="w-full flex flex-row-reverse gap-8 mr-2">
                <li>
                    <motion.button
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        className='grid place-items-center'
                        onClick={callback}
                    >
                        <HiMenu className='text-white text-[36px]' />
                    </motion.button>
                </li>
                <li>
                    <div className='grid place-items-center h-full font-iosevka font-bold text-white text-xl'>
                        <span>(608) 615-9052</span>
                    </div>
                </li>
            </ul>
        </div>
    )
}