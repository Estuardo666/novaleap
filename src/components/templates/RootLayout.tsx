import React from "react";
import { Navbar } from "@/components/organisms";

interface LayoutProps {
  children: React.ReactNode;
}

/**
 * RootLayout - Template Component
 * 
 * The main layout wrapper for all pages.
 * Includes navigation, common sections, and global layout logic.
 * This is a template-level component - the highest level of Atomic Design.
 */
export const RootLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 w-full">{children}</main>
      <footer className="border-t border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center text-gray-600 text-sm">
            <p>&copy; {new Date().getFullYear()} NovaLeap. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

/**
 * PageTemplate - Template Component
 * 
 * A generic page layout that provides consistent structure for content pages.
 */
interface PageTemplateProps extends LayoutProps {
  title?: string;
  description?: string;
}

export const PageTemplate: React.FC<PageTemplateProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <div className="w-full">
      {title && (
        <div className="border-b border-gray-200 bg-gradient-to-r from-teal-50 to-sage-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-bold text-gray-900">{title}</h1>
            {description && (
              <p className="mt-2 text-lg text-gray-600">{description}</p>
            )}
          </div>
        </div>
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {children}
      </div>
    </div>
  );
};
