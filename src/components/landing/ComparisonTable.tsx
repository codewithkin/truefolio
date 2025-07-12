"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { motion } from "framer-motion"
import { CheckCircle, XCircle } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

const platforms = [
    { name: "Truefolio", logo: "/icons/icon.jpg" },
    { name: "Behance", logo: "/icons/behance.png" },
    { name: "Dribbble", logo: "/icons/dribbble.png" },
    { name: "Notion", logo: "/icons/notion.png" },
    { name: "Upwork", logo: "/icons/upwork.webp" },
]

const features = [
    {
        label: "Custom .cv subdomain",
        values: ["✅", "❌", "❌", "❌", "❌"],
    },
    {
        label: "Client testimonials",
        values: ["✅", "Limited", "Limited", "❌", "✅"],
    },
    {
        label: "Recent project showcase",
        values: ["✅", "✅", "✅", "✅", "✅"],
    },
    {
        label: "One-on-one feedback calls",
        values: ["✅ (early bird)", "❌", "❌", "❌", "❌"],
    },
    {
        label: "Priority support",
        values: ["✅", "❌", "❌", "❌", "✅"],
    },
    {
        label: "Feature requests",
        values: ["✅", "❌", "❌", "❌", "❌"],
    },
]

const renderCell = (value: string, isTruefolio = false) => {
    const isCheck = value.toLowerCase().includes("✅")
    const isLimited = value.toLowerCase().includes("limited")
    const icon = isCheck ? (
        <CheckCircle className="w-4 h-4 text-green-600" />
    ) : isLimited ? (
        <XCircle className="w-4 h-4 text-yellow-500" />
    ) : (
        <XCircle className="w-4 h-4 text-red-500" />
    )

    return (
        <div className="flex items-center justify-center gap-2">
            {icon}
            <span className={cn("text-sm", isTruefolio && "font-semibold")}>{value.replace("✅", "").trim()}</span>
        </div>
    )
}

export default function ComparisonTable() {
    return (
        <motion.section
            id="comparison"
            className="max-w-6xl mx-auto px-4 md:px-6 py-20"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
        >
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold">How does Truefolio compare?</h2>
                <p className="text-gray-500 mt-2 text-sm md:text-base max-w-2xl mx-auto">
                    See how Truefolio stacks up against other platforms when it comes to showcasing your work as a freelancer.
                </p>
            </div>

            <div className="overflow-x-auto border border-gray-200 rounded-xl bg-white">
                <Table className="min-w-[900px]">
                    <TableHeader className="p-4">
                        <TableRow className="p-4">
                            <TableHead className="text-left text-lg font-semibold text-gray-800">Features</TableHead>
                            {platforms.map((platform) => (
                                <TableHead
                                    key={platform.name}
                                    className="text-center text-sm font-medium text-gray-800 p-4"
                                >
                                    <div className="flex flex-col items-center gap-1">
                                        <Image
                                            src={platform.logo}
                                            alt={platform.name}
                                            width={48}
                                            height={48}
                                            className="rounded-full"
                                        />
                                        <span
                                            className={cn(
                                                "text-lg",
                                                platform.name === "Truefolio" &&
                                                "bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text font-bold"
                                            )}
                                        >
                                            {platform.name}
                                        </span>
                                    </div>
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {features.map((feature) => (
                            <TableRow key={feature.label} className="p-4">
                                <TableCell className="text-sm text-gray-700 font-medium p-4">{feature.label}</TableCell>
                                {feature.values.map((val, idx) => (
                                    <TableCell
                                        key={idx}
                                        className={cn(
                                            "text-center p-4",
                                            platforms[idx].name === "Truefolio" && "bg-green-100"
                                        )}
                                    >
                                        {renderCell(val, platforms[idx].name === "Truefolio")}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </motion.section>
    )
}
