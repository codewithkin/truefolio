"use client"
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { CheckCircle, Loader2 } from 'lucide-react'
import { sendEmail } from './actions'

export default function EarlyAccessPage() {
    const [email, setEmail] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            await sendEmail(email)
            setSubmitted(true)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-xl mx-auto py-20 px-4 text-center">
            <h1 className="text-3xl font-bold mb-4">You're in! 🎉</h1>
            <p className="text-muted-foreground mb-8">
                Thanks for securing early access to <span className="text-blue-600 font-semibold">Truefolio</span>.
                Let’s get you fully onboarded.
            </p>

            {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Label htmlFor="email">Your email address</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Button size="lg" type="submit" className="w-full" disabled={loading}>
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Sending...
                            </span>
                        ) : (
                            'Complete Signup'
                        )}
                    </Button>
                </form>
            ) : (
                <div className="flex flex-col items-center gap-2">
                    <CheckCircle className="text-green-500 w-8 h-8" />
                    <p className="text-green-600">You're all set! Check your inbox ✉️</p>
                </div>
            )}

            <div className="mt-10 text-sm text-muted-foreground">
                Have a feature request? <br />
                <Link href="https://x.com/codewithkin" className="text-blue-500 underline" target="_blank">Send me a DM on X</Link> or <Link href="https://calendly.com/codewithkin/truefolio-feedback-call" className="text-blue-500 underline" target="_blank">Schedule a call</Link>
            </div>
        </div>
    )
}
