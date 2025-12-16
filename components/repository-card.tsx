"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { StaticImageData } from "next/image";
import { X } from "lucide-react";

interface Contributor {
  name: string;
}

interface DocumentationLink {
  label: string;
  url: string;
}

interface RepositoryCardProps {
  id: string;
  title: string;
  description: string;
  image: string | StaticImageData;
  badge?: {
    label: string;
    color?: string;
  };
  contributors: Contributor[];
  documentationLinks: DocumentationLink[];
}

const badgeColorMap: { [key: string]: string } = {
  prestasi: "bg-[#fcba03] text-white",
  publikasi: "bg-[#6836ff] text-white",
  proyek: "bg-[#11AEAF] text-white",
};

export default function RepositoryCard({
  id,
  title,
  description,
  image,
  badge,
  contributors,
  documentationLinks,
}: RepositoryCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const badgeColor = badgeColorMap[badge?.color || "proyek"];

  return (
    <>
      <motion.div
        className="relative bg-white border border-[rgba(17,174,175,0.1)] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        onClick={() => setIsModalOpen(true)}
      >
      {/* Badge */}
      {badge && (
        <div className={`absolute top-3 md:top-4 right-3 md:right-4 px-3 md:px-4 py-1 md:py-1.5 rounded-full text-[10px] md:text-xs font-semibold uppercase tracking-wide z-10 ${badgeColor}`}>
          {badge.label}
        </div>
      )}

      {/* Content Container */}
      <div className="flex flex-col lg:flex-row gap-4 md:gap-6 p-4 md:p-5">
        {/* Image Section */}
        <div className="w-full lg:w-auto lg:shrink-0">
          <Image
            src={image}
            alt={title}
            width={400}
            height={280}
            className="w-full lg:w-60 h-44 lg:h-40 object-cover rounded-md"
          />
        </div>

        {/* Text Section */}
        <div className="flex-1 flex flex-col gap-3 md:gap-4">
          {/* Title */}
          <h3 className="text-lg md:text-xl font-bold text-gray-900 line-clamp-2">
            {title}
          </h3>

          {/* Description */}
          <p className="text-sm md:text-sm text-gray-600 leading-relaxed">
            {description}
          </p>

          {/* Documentation Links */}
          <div className="flex flex-col gap-2 md:gap-3 mt-1">
            <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold text-[#11AEAF] uppercase tracking-wide">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
              <span>Dokumentasi</span>
            </div>
            <div className="flex flex-col gap-1.5 md:gap-2">
              {documentationLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs md:text-sm text-gray-600 hover:text-[#11AEAF] transition-colors duration-200"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                  <span className="line-clamp-1">{link.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Contributors */}
          <div className="flex flex-col gap-2 md:gap-3 mt-auto">
            <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold text-[#11AEAF] uppercase tracking-wide">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <span>Kontributor</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {contributors.map((contributor, idx) => (
                <span
                  key={idx}
                  className="inline-block px-3 py-1.5 bg-[#D1E8E8] text-[#0F766E] rounded-full text-xs md:text-sm font-medium"
                >
                  {contributor.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsModalOpen(false)}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:w-full md:max-w-2xl md:-translate-x-1/2 md:-translate-y-1/2 bg-white rounded-xl shadow-2xl z-50 max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-gray-400"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image with Padding */}
              <div className="px-6 md:px-8 lg:px-10 pt-8 md:pt-10 lg:pt-12 pb-4 md:pb-6">
                <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden">
                  <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Close Button */}
              <motion.button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-8 md:top-10 lg:top-12 right-6 md:right-8 lg:right-10 p-2 rounded-full border border-white/40 bg-white/70 backdrop-blur-md hover:bg-white/90 transition-all duration-200 z-10 shadow-lg"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Close modal"
              >
                <X size={20} className="text-gray-700" />
              </motion.button>

              <div className="px-6 md:px-8 lg:px-10 pb-8 md:pb-10 lg:pb-12 relative">

                {/* Badge */}
                {badge && (
                  <div className={`inline-block px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wide mb-4 ${badgeColor}`}>
                    {badge.label}
                  </div>
                )}

                {/* Title */}
                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4">
                  {title}
                </h2>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed mb-6">
                  {description}
                </p>

                {/* Documentation Links */}
                {documentationLinks.length > 0 && (
                  <div className="mb-6">
                    <h3 className="flex items-center gap-2 text-sm font-bold text-[#11AEAF] uppercase tracking-wide mb-3">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                      </svg>
                      Dokumentasi
                    </h3>
                    <div className="space-y-2">
                      {documentationLinks.map((link, idx) => (
                        <a
                          key={idx}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#11AEAF] transition-colors"
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                          </svg>
                          <span>{link.label}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contributors */}
                {contributors.length > 0 && (
                  <div>
                    <h3 className="flex items-center gap-2 text-sm font-bold text-[#11AEAF] uppercase tracking-wide mb-3">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                      Kontributor
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {contributors.map((contributor, idx) => (
                        <span
                          key={idx}
                          className="inline-block px-3 py-2 bg-[#D1E8E8] text-[#0F766E] rounded-full text-sm font-medium"
                        >
                          {contributor.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
