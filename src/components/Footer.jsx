import React from "react";
import Image from "next/image";
import logo from "@/assets/logo-xl.png";
import fb from "@/assets/facebook.png";
import instagram from "@/assets/instagram.png";
import twitter from "@/assets/twitter.png";

const Footer = () => {
  return (
    <footer className="w-full border-t flex flex-col items-center gap-4 bg-primary dark:bg-background/70 text-primary-foreground dark:text-foreground py-10 md:py-15 lg:py-20">
      <Image loading="lazy" src={logo} alt="Footer Logo" width={400} height={300} className="w-auto h-auto mb-8" />
      <p className="text-center leading-6 lg:text-xl opacity-80">
        Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
      </p>
      <h6 className="text-2xl py-4">Social Links</h6>
      <div className="flex justify-center gap-4">
        <Image loading="eager" src={instagram} alt={"InstaLogoIcon"} width={40} height={40}></Image>
        <Image loading="eager" src={fb} alt={"FacebookLogoIcon"} width={40} height={40}></Image>
        <Image loading="eager" src={twitter} alt={"TwitterLogoIcon"} width={40} height={40}></Image>
      </div>
      <div className="container pt-10 flex flex-col gap-3 md:flex-row items-center justify-center md:justify-between font-light">
        <span>&copy; 2026 KeenKeeper. All rights reserved.</span>

        <div className="flex items-center gap-4 md:gap-8">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Cookies</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
