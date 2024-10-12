import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, File, Edit, Copy, ClipboardCopy, Trash2 } from 'lucide-react';

function App() {
  const [clickState, setClickState] = useState('initial');
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = useCallback(() => {
    setClickState('clicked');
    setTimeout(() => setClickState('right-click-intro'), 2000);
  }, []);

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    const button = buttonRef.current;
    if (button) {
      const rect = button.getBoundingClientRect();
      setContextMenuPosition({ x: rect.right, y: rect.top });
    }
    setClickState('context-menu-opened');
  }, []);

  const containerVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center p-4 overflow-hidden">
      <AnimatePresence mode="wait">
        {clickState === 'initial' && (
          <motion.div
            key="initial"
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
          >
            <p className="text-white mb-8 max-w-md">
              To "Click" something on a computer, move the pointer on screen by either dragging a finger across a trackpad (usually found on laptops),
              or dragging a mouse across a flat surface. Then press down on the left side of the trackpad or mouse.
            </p>
            <button
              className="px-6 py-3 bg-white text-black font-bold rounded-lg transition-transform hover:scale-105"
              onClick={handleClick}
            >
              Click this Button
            </button>
          </motion.div>
        )}
        {clickState === 'clicked' && (
          <motion.p
            key="clicked"
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="text-green-400 mb-8 text-xl font-bold"
          >
            Congratulations! You've successfully clicked the button!
          </motion.p>
        )}
        {(clickState === 'right-click-intro' || clickState === 'context-menu-opened') && (
          <motion.div
            key="right-click"
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
          >
            <p className="text-white mb-8 max-w-md">
              Great job! Now, let's try a "Right Click" or "Secondary Click". On a mouse, this is usually the right button. 
              On a trackpad, you can often use two fingers to tap, or look for a designated right-click area. 
              Try right-clicking on the button below to open a context menu!
            </p>
            <button
              ref={buttonRef}
              className="px-6 py-3 bg-white text-black font-bold rounded-lg transition-transform relative"
              onContextMenu={handleContextMenu}
            >
              Secondary or Right-Click this button
              <Menu className="absolute -top-6 right-0 text-white animate-bounce" />
            </button>
          </motion.div>
        )}
        {clickState === 'context-menu-opened' && (
          <motion.p
            key="context-menu-opened"
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="text-green-400 mb-8 text-xl font-bold"
          >
            Excellent! You've opened the context menu. This menu often provides additional options or actions.
          </motion.p>
        )}
      </AnimatePresence>
      {clickState === 'context-menu-opened' && (
        <motion.div 
          className="bg-white text-black p-2 rounded shadow-lg absolute"
          style={{ top: `${contextMenuPosition.y}px`, left: `${contextMenuPosition.x}px` }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center p-2 hover:bg-gray-200 cursor-pointer">
            <File className="mr-2" size={16} />
            <span>New File</span>
          </div>
          <div className="flex items-center p-2 hover:bg-gray-200 cursor-pointer">
            <Edit className="mr-2" size={16} />
            <span>Rename</span>
          </div>
          <div className="flex items-center p-2 hover:bg-gray-200 cursor-pointer">
            <Copy className="mr-2" size={16} />
            <span>Copy</span>
          </div>
          <div className="flex items-center p-2 hover:bg-gray-200 cursor-pointer">
            <ClipboardCopy className="mr-2" size={16} />
            <span>Paste</span>
          </div>
          <div className="flex items-center p-2 hover:bg-gray-200 cursor-pointer">
            <Trash2 className="mr-2" size={16} />
            <span>Delete</span>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default App;