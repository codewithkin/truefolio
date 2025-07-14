import {
    Dialog,
    DialogDescription,
    DialogTitle,
    DialogContent,
    DialogHeader,
    DialogTrigger
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import React from "react"
import { CheckCircle2 } from "lucide-react"
import Link from "next/link"

function SecureYourSpotModal({ whiteBg }: { whiteBg?: boolean }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="lg" className={`${!whiteBg ? "bg-white text-[#1D1D1D] hover:bg-slate-200" : "bg-gradient-to-r from-blue-400 to-blue-700 hover:from-blue-600 transition duration-300 hover:to-sky-800 text-white border-2 border-blue-200"}`}>
                    Secure your spot
                </Button>
            </DialogTrigger>
            <DialogContent className="overflow-y-scroll h-full">
                <DialogHeader className="text-center">
                    <DialogTitle className="text-xl font-semibold text-center">
                        Secure your spot on <span className="text-blue-600">Truefolio</span>
                    </DialogTitle>
                    <DialogDescription className="text-sm mt-2 flex flex-col justify-center items-center">
                        <Badge variant="outline" className="text-blue-600 border-blue-600 bg-blue-50">
                            🎉 30% off for life if you join early!
                        </Badge>
                        <span className="text-center">
                            We’re opening early access to a limited number of freelancers. Get your custom subdomain, showcase your work, and stand out from the crowd
                        </span>
                    </DialogDescription>
                </DialogHeader>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Standard Plan */}
                    <div className="border rounded-xl p-4 flex flex-col gap-2">
                        <h3 className="text-lg font-medium">Standard Access</h3>
                        <p className="text-sm text-muted-foreground">Full access once we launch publicly.</p>
                        <ul className="text-sm mt-2 flex flex-col gap-1">
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="text-green-500" size={17} />
                                Modern portfolio
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="text-green-500" size={17} />
                                PDF exports
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="text-green-500" size={17} />
                                Custom subdomain
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="text-green-500" size={17} />
                                5 minute setup
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="text-green-500" size={17} />
                                Testimonial collector
                            </li>
                        </ul>
                        <div className="mt-auto pt-4">
                            <p className="font-semibold text-lg">$30/month</p>
                            <Button size="lg" disabled={true} variant="outline" className="mt-2 w-full">Coming Soon</Button>
                        </div>
                    </div>

                    {/* Early Bird Plan */}
                    <div className="border border-blue-600 bg-blue-50 rounded-xl p-4 flex flex-col gap-2">
                        <h3 className="text-lg font-medium text-blue-700">Early Bird Access</h3>
                        <p className="text-sm text-blue-700">Save over 30% and help shape the product.</p>
                        <ul className="text-sm mt-2 flex flex-col gap-1">
                            <li className="flex gap-2 items-center">
                                <CheckCircle2 className="text-blue-500" size={17} />
                                Everything in Standard
                            </li>
                            <li className="flex gap-2 items-center">
                                <CheckCircle2 className="text-blue-500" size={17} />
                                Feedback sessions
                            </li>
                            <li className="flex gap-2 items-center">
                                <CheckCircle2 className="text-blue-500" size={17} />
                                Priority support
                            </li>
                            <li className="flex gap-2 items-center">
                                <CheckCircle2 className="text-blue-500" size={17} />
                                Feature requests
                            </li>
                            <li className="flex gap-2 items-center">
                                <CheckCircle2 className="text-blue-500" size={17} />
                                30% off for life
                            </li>
                        </ul>
                        <div className="mt-auto pt-4">
                            <p className="font-medium text-sm text-gray-500 line-through">$30/month</p>
                            <p className="font-bold text-2xl text-blue-700">$21/month</p>
                            <Button size="lg" asChild className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white">
                                <Link target="_blank" href="https://www.creem.io/payment/prod_6ns3XjRshLgdv0EM4xJLjx">
                                    Join Early Bird
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default SecureYourSpotModal
