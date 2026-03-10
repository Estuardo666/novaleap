'use client';

import React from "react";
import { motion, type Variants } from "framer-motion";
import { Button } from "@/components/atoms";

/**
 * HeroSection - Organismic Component
 * 
 * Large, feature-rich component displaying the hero/landing section.
 * Combines multiple atoms and molecules with advanced animations.
 */
const HeroSection: React.FC = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="relative w-full py-20 md:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-50 to-sage-50" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center text-center gap-8"
        >
          {/* Subtitle */}
          <motion.span
            variants={itemVariants}
            className="inline-block bg-mint-100 text-teal-600 px-4 py-2 rounded-full text-sm font-medium"
          >
            Welcome to NovaLeap
          </motion.span>

          {/* Main heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight"
          >
            Transform Your <span className="text-teal-500">Digital</span> Presence
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-600 max-w-2xl"
          >
            Build beautiful, high-performance web applications with our modern
            tech stack and expert-crafted components.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex gap-4">
            <Button variant="primary" size="lg">
              Get Started
            </Button>
            <Button variant="secondary" size="lg">
              Learn More
            </Button>
          </motion.div>

          {/* Feature highlights */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-8"
          >
            {[
              { title: "Fast", desc: "Optimized performance" },
              { title: "Modern", desc: "Latest technologies" },
              { title: "Scalable", desc: "Grows with you" },
            ].map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-lg p-6 shadow-sm border border-gray-100"
              >
                <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-sm text-gray-500">{feature.desc}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
