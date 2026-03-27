"use client";

import React, { useState, useEffect, ReactNode } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface BaseModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}


export default function BaseModal({isOpen, onClose, title, children}:BaseModalProps){
    return(
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

                    <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-background/80 backdrop-blur-sm"
                    >

                        {/* fenêtre modale */}
                        <motion.div
                        initial={{ opacity: 0 , scale: 0.95, y: 20 }}
                        animate={{ opacity: 1 , scale: 1, y: 0 }}
                        exit={{ opacity: 0 , scale: 0.95, y: 20}}
                        className="relative w-full max-w-lg overflow-hidden bg-background border border-broder rounded-2xl shadow-2xl z-10"
                        >
                            
                            {/* en-tête */}
                            <div className="flex items-center justify-between p-6 border border-border">
                                <h2 className="text-xl font-semibold text-foreground">{title}</h2>
                                <button
                                onClick={onClose}
                                className="p-2 hover:bg-foreground/5 rounded-full transition-colors"
                                ><X size={20} /></button>
                            </div>

                            {/* contenu */}
                            <div className="p-6">{children}</div>
                        </motion.div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}