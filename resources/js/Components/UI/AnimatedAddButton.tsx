import { motion, AnimatePresence } from "framer-motion";
import { MdOutlinePlusOne, MdAddShoppingCart } from "react-icons/md";


interface AnimatedAddButtonProps {
  added: boolean;
  onClick:()=>void;
  flyX?: number;
  flyY?: number;
  glowColor?: string;
}
const AnimatedAddButton: React.FC<AnimatedAddButtonProps> = ({ 
  added, 
  onClick, 
  flyX = 40,  
  flyY = -150, 
  glowColor = "rgb(34 197 94)" 
}) => {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="p-2 rounded-lg relative flex items-center justify-center"
    >
      <AnimatePresence mode="wait">
        {added ? (
          <motion.span
            key="added"
            initial={{ scale: 0.5, opacity: 0, x: 0, y: 0 }}
            animate={{ 
              scale: [0.5, 1.5, 1.8], 
              opacity: [0, 1, 0.8,0.4, 0], 
              x: flyX, 
              y: flyY, 
              filter: `drop-shadow(0px 0px 8px ${glowColor})` 
            }}
            transition={{ 
              duration: 0.7, 
              ease: "easeOut" 
            }}
            className="text-green-500 flex absolute pointer-events-none"
          >
            <MdOutlinePlusOne className="bg-green-400/20 p-auto rounded-full border border-green-500 border-0.5" />
          </motion.span>
        ) : (
          <motion.span
            key="cart"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ scale: 0.2, opacity: 0 }}
            transition={{ duration: 0 }}
            className="flex"
          >
            <MdAddShoppingCart className="text-lg" />
          </motion.span>
        )}
          </AnimatePresence>
          
    </motion.button>
  );
};

export default AnimatedAddButton;