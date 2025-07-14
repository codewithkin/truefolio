"use client"

import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Loader2, Github, Mail, LogIn, ShieldCheck } from "lucide-react"
import { toast } from "sonner"
import Image from "next/image"

export default function SignInPage() {
    const [email, setEmail] = useState("")

    const magicLinkMutation = useMutation({
        mutationFn: async () => {
            const { data, error } = await authClient.signIn.magicLink({
                email,
                callbackURL: "/payments",
            });
        },
        onSuccess: async () => {
            toast.success("Magic link sent!", {
                description: "Please complete your payments then check your email for the sign in link"
            });
        },
        onError: () => {
            toast.error("Something went wrong.")
        },
    })

    const providerMutation = useMutation({
        mutationFn: async (provider: "google" | "github") => {
            await authClient.signIn.social({
                provider,
                newUserCallbackURL: "/payments",
                callbackURL: "/dashboard"
            })
        },
        onError: () => {
            toast.success("OAuth sign-in failed.")
        },
        onSuccess: async () => {
            toast.success("Magic link sent!", {
                description: "Please complete your payments then check your email for the sign in link"
            });
        }
    })

    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-sky-400 to-purple-500 px-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6">
                <div className="text-center space-y-1 flex flex-col justify-center items-center">
                    <Image
                        className="rounded-full"
                        src="/icons/icon.jpg"
                        width={60}
                        height={60}
                        alt="Truefolio logo"
                    />
                    <h1 className="text-2xl font-bold text-[#1D1D1D]">Welcome back to <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Truefolio</span></h1>
                    <p className="text-sm text-gray-500">Sign in to continue to Truefolio</p>
                </div>

                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        magicLinkMutation.mutate()
                    }}
                    className="space-y-4"
                >
                    <div className="space-y-1">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={magicLinkMutation.isPending}
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                        disabled={magicLinkMutation.isPending}
                    >
                        {magicLinkMutation.isPending ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <>
                                <Mail className="w-4 h-4 mr-2" />
                                Send Magic Link
                            </>
                        )}
                    </Button>
                </form>

                <Separator className="my-4" />

                <div className="flex flex-col gap-3">
                    <Button
                        onClick={() => providerMutation.mutate("google")}
                        disabled={providerMutation.isPending}
                        className="w-full bg-white border text-[#1D1D1D] hover:bg-gray-100"
                    >
                        {providerMutation.isPending ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <>
                                <img
                                    src="/icons/google.png"
                                    alt="Google"
                                    className="w-4 h-4 mr-2 rounded-full"
                                />
                                Continue with Google
                            </>
                        )}
                    </Button>

                    <Button
                        onClick={() => providerMutation.mutate("github")}
                        disabled={providerMutation.isPending}
                        className="w-full bg-[#1D1D1D] text-white hover:bg-[#111]"
                    >
                        {providerMutation.isPending ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <>
                                <Github className="w-4 h-4 mr-2" />
                                Continue with GitHub
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </main>
    )
}
