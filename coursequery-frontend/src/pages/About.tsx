import React, { useState } from "react";
import Nav from "@/components/ui/nav";
import { Card, CardDescription, TeamMemberCard } from "@/components/ui/card";
import { CardContent } from "@mui/material";
import ReactCardFlip from "react-card-flip";


export default function LoginPage() {
    return (
        <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]">
            <Nav />
            <div className="w-full mx-auto px-8 xl:max-w-[1320]">
                <div className="flex flex-wrap items-center justify-center -mx-4">
                    {/*  TEST! Carousel added to the left */}
                    <div className="w-full lg:w-3/4 py-20 lg:order-2 flex flex-col">
                            <div className="flex justify-between text-center">
                                <div className="w-1/2 pr-8">
                                    <h1 className="font-semibold text-4xl md:text-5xl leading-tight md:leading-tight mb-6">
                                        What is Coursequery?
                                    </h1>
                                    <p>
                                        Coursequery is a resource for students that allows them to get an accurate representation of their courses 
                                        and professors. We want to provide students a full picture on the courses they intend to take and more
                                        confidence in knowing what they're signing up for. 
                                    </p>
                                </div>
                                <div className="w-1/2 pl-8">
                                    <h1 className="font-semibold text-4xl md:text-5xl leading-tight md:leading-tight mb-6">
                                        What inspired us?
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
                    <div>
                        <h1 className="font-semibold text-4xl md:5xl text-center mt-0 mb-5">
                            Meet our team
                        </h1>
                        <div className="flex -mx-4 h-auto" style={{ height: '390px' }}>
                            <TeamMemberCard>
                                Brian Phan
                            </TeamMemberCard>
                            <TeamMemberCard>
                                Shaun Bakken
                            </TeamMemberCard>
                            <TeamMemberCard>
                                Ali Abdul-Hameed
                            </TeamMemberCard>
                            <TeamMemberCard>
                                Joshua Idahosa
                            </TeamMemberCard>
                            <TeamMemberCard>
                                Joshua Lian
                            </TeamMemberCard>
                        </div>
                    </div>
            </div>
        </div>
    );
}
