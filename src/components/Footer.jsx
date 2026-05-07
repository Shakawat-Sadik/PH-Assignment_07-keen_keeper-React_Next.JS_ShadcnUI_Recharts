import React from 'react';
import Image from 'next/image';
import logo from "@/assets/logo-xl.png";

const Footer = () => {
    return (
        <footer className="w-full border-t flex flex-col items-center gap-4 bg-primary dark:bg-background/70 text-primary-foreground dark:text-foreground py-10 md:py-15 lg:py-20">
            <Image
                loading="lazy"
                src={logo}
                alt="Footer Logo"
                width={400}
                height={300}
                className="w-100 h-auto mb-8"
            />
            <p className="text-center leading-6 lg:text-xl opacity-80">Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.</p>
            <h6 className="text-2xl py-4">Social Links</h6>
        </footer>
    );
};

export default Footer;