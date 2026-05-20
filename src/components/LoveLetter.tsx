"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Download } from "lucide-react";
import data from "@/content/data.json";

// --- PDF Generation ---
// Creates a beautifully styled HTML document in a new window and triggers print.
// This gives the highest fidelity PDF output with zero extra dependencies.
function generateLetterPDF() {
  const letter = data.loveLetter;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Our 1st Anniversary Letter</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    @page {
      size: A4;
      margin: 2cm 2.5cm;
    }

    body {
      font-family: 'Caveat', cursive;
      background: #F5E6D3;
      color: #8B7355;
      line-height: 1.9;
      font-size: 17px;
      padding: 50px 60px;
      min-height: 100vh;
    }

    .page-border {
      border: 2px solid #E8B4B8;
      border-radius: 12px;
      padding: 50px 45px;
      background: linear-gradient(135deg, #FFF8F0 0%, #FDF5EC 50%, #FFF0E8 100%);
      position: relative;
      overflow: hidden;
    }

    /* Corner flourishes */
    .page-border::before {
      content: "❀";
      position: absolute;
      top: 14px;
      left: 18px;
      font-size: 22px;
      color: #E8B4B8;
      opacity: 0.5;
    }
    .page-border::after {
      content: "❀";
      position: absolute;
      bottom: 14px;
      right: 18px;
      font-size: 22px;
      color: #E8B4B8;
      opacity: 0.5;
      transform: rotate(180deg);
    }

    .wax-seal {
      text-align: center;
      margin-bottom: 25px;
    }
    .wax-seal span {
      display: inline-block;
      width: 50px;
      height: 50px;
      background: #C85A6B;
      border-radius: 50%;
      line-height: 50px;
      color: white;
      font-size: 24px;
      box-shadow: 0 2px 8px rgba(200,90,107,0.3);
    }

    .title {
      font-family: 'Playfair Display', serif;
      text-align: center;
      font-size: 26px;
      color: #C85A6B;
      margin-bottom: 8px;
      font-weight: 600;
    }

    .subtitle {
      text-align: center;
      font-size: 15px;
      color: #D4A5A8;
      margin-bottom: 30px;
      font-style: italic;
      font-family: 'Playfair Display', serif;
    }

    .divider {
      text-align: center;
      margin: 28px 0;
      color: #E8B4B8;
      font-size: 14px;
      letter-spacing: 6px;
    }

    .greeting {
      font-size: 28px;
      font-weight: 700;
      color: #C85A6B;
      margin-bottom: 18px;
    }

    .section {
      margin-bottom: 22px;
      text-indent: 0;
    }

    .climax {
      font-weight: 700;
      color: #C85A6B;
      font-size: 18px;
      line-height: 1.7;
      margin-top: 10px;
    }

    .signature {
      margin-top: 35px;
      text-align: right;
      font-size: 22px;
      font-weight: 700;
      color: #C85A6B;
      line-height: 1.6;
    }

    .footer {
      text-align: center;
      margin-top: 35px;
      font-family: 'Playfair Display', serif;
      font-size: 12px;
      color: #D4A5A8;
      font-style: italic;
      letter-spacing: 2px;
    }
  </style>
</head>
<body>
  <div class="page-border">
    <div class="wax-seal"><span>♥</span></div>
    <div class="title">Happy 1st Anniversary!</div>
    <div class="subtitle">A letter from my heart to yours</div>
    <div class="divider">· · · ♥ · · ·</div>

    <div class="greeting">${letter.greeting}</div>

    <div class="section">${letter.opening}</div>

    <div class="divider">· · · ♥ · · ·</div>

    <div class="section">${letter.middle}</div>

    <div class="divider">· · · ♥ · · ·</div>

    <div class="section climax">${letter.climax}</div>

    <div class="signature">${letter.signature.replace("\n", "<br/>")}</div>

    <div class="footer">❀ One Year Of Us — May 20, 2025 – May 20, 2026 ❀</div>
  </div>
</body>
</html>`;

  const printWindow = window.open("", "_blank");
  if (!printWindow) return;
  printWindow.document.write(html);
  printWindow.document.close();
  // Let fonts load before triggering print
  setTimeout(() => {
    printWindow.print();
  }, 800);
}

// --- Component ---
export const LoveLetter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isBroken, setIsBroken] = useState(false);
  const [showDownloadTooltip, setShowDownloadTooltip] = useState(false);

  const letter = data.loveLetter;

  const handleOpenLetter = useCallback(() => {
    setIsBroken(true);
    setTimeout(() => {
      setIsOpen(true);
    }, 600);
  }, []);

  const handleDownload = useCallback(() => {
    generateLetterPDF();
  }, []);

  // Stagger delays for the letter sections
  const sectionDelay = (idx: number) => 1.2 + idx * 1.4;

  return (
    <section className="relative w-full min-h-screen py-20 md:py-28 flex flex-col items-center overflow-hidden px-4">
      {/* Soft ambient background blurs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-[#ffb7c5]/8 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#ffdab9]/10 rounded-full filter blur-[80px] pointer-events-none" />

      {/* Header */}
      <div className="relative text-center max-w-xl mx-auto mb-14 z-10">
        <h2 className="text-3xl md:text-5xl font-serif text-[#2d3436] tracking-tight mb-4">
          A Quiet <span className="italic text-[#C85A6B]">Confession</span>
        </h2>
        <p className="text-[#8B7355] font-sans text-sm">
          Break the wax seal to read what&apos;s inside.
        </p>
      </div>

      <div className="relative w-full max-w-3xl flex flex-col items-center z-10">
        {/* ENVELOPE INTERFACE */}
        <motion.div
          animate={
            isOpen
              ? { y: -80, opacity: 0, scale: 0.9, pointerEvents: "none" as const }
              : { y: 0, opacity: 1, scale: 1 }
          }
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-md h-64 rounded-xl bg-gradient-to-b from-[#FFF8F0] to-[#FDF5EC] border border-[#E8B4B8]/60 shadow-[0_4px_30px_rgba(200,90,107,0.08)] flex flex-col items-center justify-center p-6"
        >
          {/* Paper texture */}
          <div className="absolute inset-0 opacity-15 pointer-events-none paper-texture rounded-xl" />

          {/* Decorative envelope flap triangle */}
          <div className="absolute top-0 left-0 w-full h-24 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[160px] border-r-[160px] border-t-[80px] border-l-transparent border-r-transparent border-t-[#E8B4B8]/15" />
          </div>

          {/* Corner decorations */}
          <span className="absolute top-3 left-4 text-[#E8B4B8]/40 text-lg select-none">❀</span>
          <span className="absolute bottom-3 right-4 text-[#E8B4B8]/40 text-lg select-none rotate-180">❀</span>

          {/* Wax Seal Button */}
          <button
            onClick={handleOpenLetter}
            disabled={isBroken}
            aria-label="Break the wax seal to open the letter"
            className="relative w-[72px] h-[72px] flex items-center justify-center cursor-pointer active:scale-95 transition-transform z-20"
          >
            <motion.div
              animate={isBroken ? {} : { scale: [1, 1.06, 1] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              className="w-16 h-16 rounded-full bg-[#C85A6B] shadow-[0_2px_12px_rgba(200,90,107,0.35)] border-2 border-[#a94858] flex items-center justify-center relative overflow-hidden"
            >
              {/* Left seal half */}
              <div
                className={`absolute inset-0 bg-[#C85A6B] flex items-center justify-center transition-transform duration-500 ease-in-out seal-crack ${
                  isBroken ? "-translate-x-5 rotate-8 opacity-60" : ""
                }`}
              >
                <Heart className="w-6 h-6 text-white/90 fill-white/90 translate-x-1" />
              </div>
              {/* Right seal half */}
              <div
                className={`absolute inset-0 bg-[#a94858] flex items-center justify-center transition-transform duration-500 ease-in-out seal-crack-right ${
                  isBroken ? "translate-x-5 -rotate-8 opacity-60" : ""
                }`}
              >
                <Heart className="w-6 h-6 text-white/90 fill-white/90 -translate-x-1" />
              </div>
            </motion.div>
          </button>

          <p className="mt-4 text-[#D4A5A8] text-xs font-sans tracking-wider select-none">
            tap the seal
          </p>
        </motion.div>

        {/* ━━━ REVEALED LETTER ━━━ */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -80 }}
              animate={{ opacity: 1, height: "auto", y: -100 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: "top center" }}
              className="w-full max-w-2xl bg-gradient-to-b from-[#FFF8F0] to-[#FDF5EC] rounded-xl px-8 py-10 md:px-14 md:py-14 shadow-[0_8px_50px_rgba(200,90,107,0.08)] relative overflow-hidden border border-[#E8B4B8]/40"
            >
              {/* Paper texture */}
              <div className="absolute inset-0 opacity-20 pointer-events-none paper-texture rounded-xl" />

              {/* Corner flourishes */}
              <span className="absolute top-4 left-5 text-[#E8B4B8]/30 text-xl select-none pointer-events-none">❀</span>
              <span className="absolute top-4 right-5 text-[#E8B4B8]/30 text-xl select-none pointer-events-none scale-x-[-1]">❀</span>
              <span className="absolute bottom-4 left-5 text-[#E8B4B8]/30 text-xl select-none pointer-events-none rotate-180 scale-x-[-1]">❀</span>
              <span className="absolute bottom-4 right-5 text-[#E8B4B8]/30 text-xl select-none pointer-events-none rotate-180">❀</span>

              {/* Anniversary Header */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="text-center mb-8 relative z-10"
              >
                <p className="text-[#C85A6B] font-serif text-2xl md:text-3xl font-semibold tracking-wide">
                  Happy 1st Anniversary!
                </p>
                <div className="flex items-center justify-center gap-3 mt-3 text-[#E8B4B8] text-sm tracking-[0.3em] select-none">
                  <span>· · ·</span>
                  <Heart className="w-3.5 h-3.5 fill-[#E8B4B8] text-[#E8B4B8]" />
                  <span>· · ·</span>
                </div>
              </motion.div>

              {/* Letter Body */}
              <div className="relative z-10 select-text">
                {/* Greeting */}
                <motion.h3
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: sectionDelay(0), duration: 0.8 }}
                  className="font-handwriting text-3xl md:text-4xl text-[#C85A6B] font-bold mb-6"
                >
                  {letter.greeting}
                </motion.h3>

                {/* Opening paragraph */}
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: sectionDelay(1), duration: 1 }}
                  className="font-handwriting text-lg md:text-xl text-[#8B7355] leading-[1.9] mb-8"
                >
                  {letter.opening}
                </motion.p>

                {/* Divider */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: sectionDelay(2), duration: 0.6 }}
                  className="flex items-center justify-center gap-3 my-8 text-[#E8B4B8] text-sm tracking-[0.3em] select-none"
                >
                  <span>· · ·</span>
                  <Heart className="w-3 h-3 fill-[#E8B4B8] text-[#E8B4B8]" />
                  <span>· · ·</span>
                </motion.div>

                {/* Middle paragraph */}
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: sectionDelay(2), duration: 1 }}
                  className="font-handwriting text-lg md:text-xl text-[#8B7355] leading-[1.9] mb-8"
                >
                  {letter.middle}
                </motion.p>

                {/* Divider */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: sectionDelay(3), duration: 0.6 }}
                  className="flex items-center justify-center gap-3 my-8 text-[#E8B4B8] text-sm tracking-[0.3em] select-none"
                >
                  <span>· · ·</span>
                  <Heart className="w-3 h-3 fill-[#C85A6B] text-[#C85A6B]" />
                  <span>· · ·</span>
                </motion.div>

                {/* Emotional Climax — ALL CAPS, prominent */}
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: sectionDelay(3), duration: 1.2 }}
                  className="font-handwriting text-lg md:text-xl text-[#C85A6B] leading-[1.8] font-bold mb-8"
                >
                  {letter.climax}
                </motion.p>

                {/* Signature */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: sectionDelay(4), duration: 1 }}
                  className="mt-10 text-right relative z-10"
                >
                  {letter.signature.split("\n").map((line, i) => (
                    <p
                      key={i}
                      className={`font-handwriting ${
                        i === 0
                          ? "text-xl md:text-2xl text-[#C85A6B] font-bold"
                          : "text-lg md:text-xl text-[#D4A5A8] mt-1 tracking-wide"
                      }`}
                    >
                      {line}
                    </p>
                  ))}
                </motion.div>
              </div>

              {/* Download Button — subtle, bottom-right floating */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: sectionDelay(5), duration: 1 }}
                className="relative z-10 mt-10 flex justify-center"
              >
                <button
                  onClick={handleDownload}
                  onMouseEnter={() => setShowDownloadTooltip(true)}
                  onMouseLeave={() => setShowDownloadTooltip(false)}
                  className="group relative flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-[#E8B4B8]/60 bg-white/60 backdrop-blur-sm text-[#D4A5A8] hover:text-[#C85A6B] hover:border-[#C85A6B]/40 hover:bg-[#C85A6B]/5 hover:scale-105 transition-all duration-300 cursor-pointer shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  <span className="text-xs font-sans tracking-wider font-medium">
                    Save this letter
                  </span>

                  {/* Tooltip */}
                  <AnimatePresence>
                    {showDownloadTooltip && (
                      <motion.span
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        className="absolute -top-9 left-1/2 -translate-x-1/2 bg-[#C85A6B] text-white text-[10px] font-serif italic px-3 py-1 rounded-sm whitespace-nowrap shadow-sm"
                      >
                        Download as PDF
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>

              {/* Footer watermark */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: sectionDelay(5) + 0.5, duration: 1 }}
                className="relative z-10 text-center mt-8 text-[10px] font-serif italic text-[#D4A5A8]/60 tracking-widest select-none"
              >
                ❀ One Year Of Us ❀
              </motion.p>

              {/* Floating Sakura Petals drifting from the letter */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
                {[...Array(7)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{
                      y: 300 + i * 40,
                      x: 50 + i * 70,
                      opacity: 0,
                      rotate: 0,
                    }}
                    animate={{
                      y: -60,
                      x: 30 + i * 80 + (i % 2 === 0 ? 40 : -30),
                      opacity: [0, 0.5, 0],
                      rotate: 360,
                    }}
                    transition={{
                      duration: 6 + i * 1.2,
                      repeat: Infinity,
                      delay: 2 + i * 1.5,
                      ease: "linear",
                    }}
                    className="absolute bottom-0 w-2.5 h-2.5 bg-[#E8B4B8]"
                    style={{ borderRadius: "100% 0 100% 0" }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default LoveLetter;
