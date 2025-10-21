"use client";

import React from "react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";

interface FaqItemProps {
  item: {
    id: string | number;
    question: string;
    answer: string;
  };
  index: number;
  activeId: string | number | null;
  setActiveId: React.Dispatch<React.SetStateAction<string | number | null>>;
}

const FaqItem: React.FC<FaqItemProps> = ({
  item,
  index,
  activeId,
  setActiveId,
}) => {
  const isActive = activeId === item.id;

  const toggleActive = () => {
    setActiveId(isActive ? null : item.id);
  };

  return (
    <div className="relative z-2 mb-16">
      {/* Header */}
      <div
        className="group relative flex cursor-pointer items-center justify-between gap-10 px-7"
        onClick={toggleActive}
      >
        {/* Left Content */}
        <div className="flex-1">
          <div className="text-[12px] font-semibold leading-[18px] tracking-[0.03em] mb-1.5 text-p3 max-lg:hidden">
            {index < 10 ? `0${index}` : index}
          </div>
          <div
            className={clsx(
              "text-[24px] font-medium leading-[36px] text-[#EAEDFF] transition-colors duration-500 max-md:flex max-md:min-h-20 max-md:items-center",
              isActive && "max-lg:text-[#2EF2FF]"
            )}
          >
            {item.question}
          </div>
        </div>

        {/* Icon */}
        <div
          className={clsx(
            "efore:absolute before:h-0.5 before:w-3 before:bg-p3 before:content-[''] after:absolute after:h-0.5 after:w-3 after:rotate-90 after:bg-p3 after:transition-all after:duration-500 after:content-[''] relative flex size-12 items-center justify-center rounded-full border-2 border-[#0C1838] shadow-400 transition-all duration-500 group-hover:border-[#1959AD]",
            isActive && "before:bg-[#2EF2FF] after:rotate-0 after:bg-[#2EF2FF]"
          )}
        >
          <div className="g4 size-11/12 rounded-full shadow-300" />
        </div>
      </div>

      {/* Animated Answer */}
      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="body-3 px-7 py-3.5">{item.answer}</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Highlight */}
      <div
        className={clsx(
          "g5 absolute -bottom-7 -top-7 left-0 right-0 -z-1 rounded-3xl opacity-0 transition-opacity duration-500",
          isActive && "opacity-100"
        )}
      >
        <div className="g4 absolute inset-0.5 -z-1 rounded-3xl" />
        <div className="absolute left-8 top-0 h-0.5 w-40 bg-[#2EF2FF]" />
      </div>
    </div>
  );
};

export default FaqItem;
