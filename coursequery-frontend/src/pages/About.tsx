import React, { useState } from "react";
import Nav from "@/components/ui/nav";


export default function LoginPage() {
    return (
        <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]">
            <Nav />
            <div className="w-full mx-auto px-8 xl:max-w-[1320]">
                <div className="flex flex-wrap items-center justify-center -mx-4">
                    {/*  TEST! Carousel added to the left */}
                    <div className="w-full lg:w-2/4 py-20 lg:order-2 flex flex-col items-center justify-center">
                        <div className="w-full lg:w-2/4 px-0 py-30 justify-center text-center">
                            <h1 className="font-semibold text-4xl md:text-5xl leading-tight md:leading-tight mb-10">
                                What is Coursequery? <br />
                            </h1>
                            <p>
                                Coursequery is a resource for students that allows them to get an accurate representation of their courses 
                                and professors. We want to provide students a full picture on the courses they intend to take and more
                                confidence in knowing what they're signing up for. 
                            </p>
                            <h1 className="font-semibold text-4xl md:text-5xl leading-tight md:leading-tight mb-10 mt-10">
                                What inspired us? <br />
                            </h1>
                            <p>
                                As students we were inspired to create Coursequery as we've all faced similar problems. There have been
                                many times where we have all been underprepared for a course or did not get the experience that we
                                were looking for.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
