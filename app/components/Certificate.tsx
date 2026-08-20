"use client"

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useCallback, useState } from "react";
import { ChevronLeft, ChevronRight, X, Search } from "lucide-react";

// Custom scrollbar hide utility
const scrollbarHide = `
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

type Certificate = {
    title: string;
    description: string;
    imageSrc: string;
};

const certificate: Certificate[] = [
    {
        title: "Sertifikat PKL PT Telkom Indonesia",
        description: "Diberikan atas penyelesaian Praktik Kerja Lapangan (PKL), mencakup penerapan keterampilan teknis secara langsung dan pemahaman alur kerja profesional di PT Telkom Indonesia.",
        imageSrc: "certificate/Sertif-PKLTelkom.jpeg",
    },
    {
        title: "Sertifikat Kompetensi Pemrogram Junior (Junior Coder)",
        description: "Sertifikasi kelulusan uji kompetensi dasar dalam menulis, menganalisis kode, dan merancang solusi perangkat lunak yang sesuai dengan standar industri.",
        imageSrc: "certificate/Sertif-Kompetensi.jpeg",
    },
];

export default function Certificate() {
    const reduceMotion = false;
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    
    // State untuk menyimpan gambar mana yang sedang dibuka (full screen)
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const scroll = useCallback((direction: "left" | "right") => {
        if (scrollContainerRef.current) {
            const scrollAmount = scrollContainerRef.current.clientWidth * 0.85;
            scrollContainerRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    }, []);

    const container = {
        hidden: {},
        show: {
            transition: { staggerChildren: 0.08, delayChildren: 0.05 },
        },
    } as const;
    
    const fadeUp = {
        hidden: { opacity: 0, y: reduceMotion ? 0 : 16 },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
        },
    } as const;

    return (
        <section id="certificate" className="relative w-full border-t border-black/5">
            <style>{scrollbarHide}</style>
            
            {/* Modal / Lightbox untuk Full Image */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm sm:p-8 cursor-zoom-out"
                    >
                        <button 
                            onClick={() => setSelectedImage(null)}
                            className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 sm:right-8 sm:top-8"
                        >
                            <X className="h-6 w-6 sm:h-8 sm:w-8" />
                        </button>
                        
                        <motion.div 
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.95 }}
                            className="relative h-full w-full max-h-[85vh] max-w-[90vw]"
                            onClick={(e) => e.stopPropagation()} // Mencegah modal tertutup jika gambar yang diklik
                        >
                            <Image
                                src={selectedImage}
                                alt="Sertifikat Full"
                                fill
                                unoptimized
                                className="object-contain"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="mx-auto w-full max-w-5xl px-6 py-24 sm:px-10 sm:py-28">
                <motion.div
                    initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="mx-auto max-w-3xl text-center"
                >
                    <h2 className="text-balance text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
                        Certificates
                    </h2>

                    <p className="mt-4 text-pretty text-sm leading-7 tracking-tight text-zinc-600 sm:text-base">
                        A curated selection of certificates—focused on clean UI, performance, and thoughtful details.
                    </p>
                </motion.div>

                <div className="mt-12 relative sm:mt-14">
                    {/* Navigation Buttons */}
                    <button
                        onClick={() => scroll("left")}
                        className="absolute left-0 top-1/2 z-10 -translate-y-1/2 -translate-x-1/2 rounded-full bg-white/90 p-3 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:scale-110 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--accent-1)/0.6)] sm:-translate-x-4 sm:p-4"
                        aria-label="Scroll left"
                    >
                        <ChevronLeft className="h-5 w-5 text-zinc-700 sm:h-6 sm:w-6"/>
                    </button>
                    <button
                        onClick={() => scroll("right")}
                        className="absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-1/2 rounded-full bg-white/90 p-3 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:scale-110 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--accent-1)/0.6)] sm:translate-x-4 sm:p-4"
                        aria-label="Scroll right"
                    >
                        <ChevronRight className="h-5 w-5 text-zinc-700 sm:h-6 sm:w-6" />
                    </button>

                    {/* Scroll Container */}
                    <motion.div
                        ref={scrollContainerRef}
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.2 }}
                        className="flex gap-6 overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory scrollbar-hide sm:gap-7"
                    >
                        {certificate.map((p) => (
                            <motion.article
                                key={p.title}
                                variants={fadeUp}
                                className="group relative flex-shrink-0 overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_18px_55px_-45px_rgba(0,0,0,0.22)] transition will-change-transform hover:-translate-y-0.5 hover:scale-[1.01] hover:border-black/15 hover:shadow-[0_18px_65px_-40px_rgba(0,0,0,0.28)] w-[85vw] snap-center sm:w-[45vw] md:w-[42vw] lg:w-[400px] xl:w-[450px]"
                            >
                                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100">
                                    <div className="absolute -top-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-gradient-to-r from-[rgb(var(--accent-1)/0.18)] to-[rgb(var(--accent-2)/0.18)] blur-3xl" />
                                </div>
        
                                <div className="relative">
                                    {/* 
                                        Perubahan disini: 
                                        1. Menambah tinggi tetap (h-64) agar card tidak berantakan
                                        2. Memasang fungsi onClick untuk membuka gambar
                                        3. Mengubah bg-black menjadi bg-zinc-50 agar lebih rapi
                                    */}
                                                                        <div 
                                        className="relative h-64 w-full cursor-pointer overflow-hidden border-b border-black/10 bg-zinc-50 group/image"
                                        onClick={() => setSelectedImage(p.imageSrc)}
                                    >
                                        <Image
                                            src={p.imageSrc}
                                            alt={`${p.title} preview`}
                                            fill
                                            unoptimized
                                            className="object-contain p-4 transition duration-500 sm:group-hover/image:scale-[1.02]"
                                            sizes="(max-width: 768px) 85vw, (max-width: 1024px) 45vw, 400px"
                                        />

                                        {/* Overlay indikator klik */}
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 sm:group-hover/image:bg-black/20">

                                            {/* 
                                                Indikator UX:
                                                - Mobile (<640px): Selalu terlihat di pojok kanan bawah (icon saja).
                                                - Desktop (>640px): Berada di tengah, tersembunyi, muncul saat di-hover (icon + teks).
                                            */}
                                            <div className="absolute bottom-3 right-3 flex items-center gap-2 rounded-full bg-white/90 p-2.5 shadow-md backdrop-blur-sm transition-all duration-300 sm:static sm:px-4 sm:py-2 sm:opacity-0 sm:shadow-lg sm:group-hover/image:opacity-100">
                                                <Search className="h-4 w-4 text-zinc-900" />
                                                <span className="hidden text-sm font-medium text-zinc-900 sm:block">
                                                    Lihat Penuh
                                                </span>
                                            </div>
                                            
                                        </div>
                                    </div>
                                            
                                    <div className="p-6">
                                        <h3 className="text-pretty text-lg font-semibold tracking-tight text-zinc-950">
                                            {p.title}
                                        </h3>
        
                                        <p className="mt-2 text-pretty text-sm leading-7 tracking-tight text-zinc-600">
                                            {p.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}