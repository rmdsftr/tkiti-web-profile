"use client";

import Image from "next/image";
import Link from "next/link";

import inter from "@/fonts/inter";

import { Instagram, Linkedin, Mail  } from "lucide-react";

import logoLab from "@/assets/logo.png"; 
import logoUnand from "@/assets/logo-unand.png"; 

export default function Footer() {
  return (
    <footer className={`${inter.variable} w-full bg-[#D2F1EB] pt-16 pb-8 text-gray-800 overflow-hidden`}>
      <div className="container mx-auto px-6 lg:px-12">
        
        {/* Main Content 4 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12 items-start">
          
          {/* Maps */}
          <div className="w-full h-48 rounded-xl overflow-hidden shadow-lg border-2 border-white/50">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.309178649375!2d100.45847837568793!3d-0.9153454353347039!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2fd4b7963e1ea631%3A0x452d09b61f76d6ec!2sFaculty%20of%20Information%20Technology!5e0!3m2!1sen!2sid!4v1764095826673!5m2!1sen!2sid" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-black tracking-tighter">Contact</h3>
            <div className="space-y-3">
              <a 
                href="mailto:labdas.si.fti@gmail.com" 
                className="flex items-center gap-2 group hover:opacity-80 transition-opacity"
              >
                    <Mail className="text-black" />labdas.si.fti@gmail.com
              </a>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-black tracking-tighter">Social Media</h3>
            <div className="space-y-3">
              <a 
                href="https://instagram.com/labdas.si.fti" 
                className="flex items-center gap-2 group hover:opacity-80 transition-opacity"
              >
                    <Instagram className="text-black" />@labdas.si.fti
              </a>

              <a 
                href="https://www.linkedin.com/company/kk-tkiti-sistem-informasi-fti-unand/" 
                className="flex items-center gap-2 group hover:opacity-80 transition-opacity"
              >
                    <Linkedin className="text-black" />KK TKITI Sistem Informasi FTI UNAND
              </a>
            </div>
          </div>

          {/* Logos */}
          <div className="flex items-center gap-6 justify-start lg:justify-end pt-4 lg:pt-0">
            {/* Logo Lab */}
            <div className="relative w-20 h-20">
               <Image 
                 src={logoLab} 
                 alt="Logo Lab TKITI" 
                 fill 
                 className="object-contain"
                 priority
               />
            </div>
            
            {/* Logo Unand */}
            <div className="relative w-20 h-20">
               <Image 
                 src={logoUnand} 
                 alt="Logo Universitas Andalas" 
                 fill 
                 className="object-contain"
                 priority
               />
            </div>
          </div>

        </div>

        {/* Copyright */}
          <p className="text-center text-[#11AEAF] text-xs tracking-wide">
            © 2025 TKITI All rights reserved.
          </p>

      </div>
    </footer>
  );
}