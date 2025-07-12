"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { motion } from "framer-motion";

const features = [
    ["Personalized subdomain", "✅", "❌", "❌", "❌"],
    ["Client feedback & ratings", "✅", "Limited", "Limited", "❌"],
    ["Showcase recent projects easily", "✅", "✅", "✅", "✅"],
    ["One-on-one feedback calls", "✅ (early bird)", "❌", "❌", "❌"],
    ["Feature requests & voting", "✅", "❌", "❌", "❌"],
    ["Lifetime discount on pricing", "✅", "❌", "❌", "❌"],
    ["Mobile-friendly & modern UI", "✅", "✅", "✅", "✅"],
];

export default function ComparisonTable() {
    return (
        <motion.section
            id="comparison"
            className="max-w-5xl mx-auto px-4 py-12 bg-gray-400/10 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <h2 className="text-3xl font-bold text-center mb-8">Why Choose Truefolio?</h2>
            <Table className="border border-gray-700">
                <TableHeader className="bg-[#1D1D1D]">
                    <TableRow>
                        <TableHead className="text-left text-gray-300">Feature</TableHead>
                        <TableHead className="text-center text-gray-300">Truefolio</TableHead>
                        <TableHead className="text-center text-gray-300">Behance</TableHead>
                        <TableHead className="text-center text-gray-300">Dribbble</TableHead>
                        <TableHead className="text-center text-gray-300">Notion</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {features.map(([feature, truefolio, behance, dribbble, notion], i) => (
                        <TableRow
                            key={feature}
                            className={i % 2 === 0 ? "bg-gray-900 text-gray-300" : "bg-gray-800 text-gray-300"}
                        >
                            <TableCell className="font-semibold">{feature}</TableCell>
                            <TableCell className="text-center">{truefolio}</TableCell>
                            <TableCell className="text-center">{behance}</TableCell>
                            <TableCell className="text-center">{dribbble}</TableCell>
                            <TableCell className="text-center">{notion}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </motion.section>
    );
}