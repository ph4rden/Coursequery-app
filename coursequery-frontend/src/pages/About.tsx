import React, { useState } from "react";
import Nav from "@/components/ui/nav";


export default function LoginPage() {
    return (
        <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]">
            <Nav />
            <div className="w-full mx-auto px-8 xl:max-w-[1320]">
                <div className="flex flex-wrap items-center -mx-4">
                    {/*  TEST! Carousel added to the left */}
                    <div className="w-full lg:w-2/4 px-40 py-20 lg:order-2 relative">
                    </div>
                </div>
            </div>
        </div>
    );
}
