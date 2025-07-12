'use client'

import { motion } from 'framer-motion'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
    {
        question: "What is truefolio?",
        answer: "truefolio is a portfolio platform designed for freelancers. It lets you showcase your work along with real client feedback, making it easier to land new clients.",
    },
    {
        question: "Why should I pay to join the waitlist?",
        answer: "As an early supporter, you get lifetime access for over 60% off, personalized feedback calls, and priority support — forever.",
    },
    {
        question: "How do feedback calls work?",
        answer: "You’ll be able to schedule a 1-on-1 session where we review your truefolio profile, give honest suggestions, and help you stand out.",
    },
    {
        question: "Is there a refund policy?",
        answer: "Yes — if you’re unhappy with truefolio within the first 14 days of launch, we’ll refund your early access payment. No questions asked.",
    },
    {
        question: "When will the product launch?",
        answer: "We’re building in public and aiming for a full launch within the next few weeks. You’ll get exclusive updates via email.",
    },
]

export default function FaqSection() {
    return (
        <section id="faq" className="py-20 px-4 md:px-8 bg-[#0F0F0F] text-white">
            <div className="max-w-4xl mx-auto text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl md:text-4xl font-bold mb-6"
                >
                    Frequently Asked Questions
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-gray-400 max-w-2xl mx-auto mb-12"
                >
                    Everything you need to know before securing your early access to truefolio.
                </motion.p>
            </div>

            <div className="max-w-3xl mx-auto">
                <Accordion type="single" collapsible className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <AccordionItem key={idx} value={`faq-${idx}`} className="border border-white/10 rounded-xl px-4">
                            <AccordionTrigger className="text-left text-lg font-medium text-white hover:text-blue-400 transition">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-sm text-gray-400 mt-2">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    )
}
