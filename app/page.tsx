import AnimateOnScroll from "@/components/AnimateOnScroll";
import Navbar from "@/components/Navbar";

import Hero from "@/sections/Hero";
import Sejarah from "@/sections/Sejarah";
import Kegiatan from "@/sections/Kegiatan";
import TechTools from "@/sections/TechTools";
import Struktur from "@/sections/Struktur";
import Gallery from "@/sections/Gallery";

import Footer from "@/components/Footer";

export default function Home() {
    return (
        <main>
            <Navbar />

            <Hero />

            <AnimateOnScroll>
                <Sejarah />
            </AnimateOnScroll>

            <Kegiatan />

            <AnimateOnScroll>
                <TechTools />
            </AnimateOnScroll>

            <AnimateOnScroll>
                <Struktur />
            </AnimateOnScroll>

            <AnimateOnScroll>
                <Gallery />
            </AnimateOnScroll>

            <Footer />
        </main>
    );
}
