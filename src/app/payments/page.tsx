'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Lock } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";

export default function PaymentsPage() {
    const [user, setUser] = useState<any>(null);
    const [loadingUser, setLoadingUser] = useState(true);
    const [notLoggedIn, setNotLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const session = await (await authClient.getSession()).data;

                if (!session?.user?.id) {
                    // User is not logged in — handle gracefully
                    setNotLoggedIn(true);
                    setLoadingUser(false);
                    return;
                }

                const res = await axios.get(`/api/user?id=${session.user.id}`);
                setUser(res.data);
                setLoadingUser(false);
            } catch (error) {
                setLoadingUser(false);
                setNotLoggedIn(true);
            }
        };

        fetchUser();
    }, []);

    const checkoutMutation = useMutation({
        mutationFn: async () => {
            await authClient.checkout({
                products: ["c7d2c669-909b-4002-bedc-44668ec61bed"],
            });
        },
        onError: () => {
            toast.error("Something went wrong while redirecting to checkout.");
        },
    });

    if (loadingUser) {
        return (
            <main className="min-h-screen w-full flex flex-col gap-2 items-center justify-center">
                <Card className="w-fit min-w-[340px]">
                    <CardContent className="flex flex-col justify-center items-center gap-4 py-6 px-8">
                        <Skeleton className="h-6 w-64 rounded" />
                        <Skeleton className="h-10 w-full rounded" />
                        <Skeleton className="h-4 w-48 mt-2 rounded" />
                    </CardContent>
                </Card>
            </main>
        );
    }

    if (notLoggedIn) {
        return (
            <main className="min-h-screen w-full flex flex-col gap-4 items-center justify-center px-4">
                <Card className="max-w-md w-full text-center p-8">
                    <Lock className="mx-auto mb-4 text-gray-500 w-12 h-12" />
                    <h2 className="text-xl font-semibold mb-2">Not Logged In</h2>
                    <p className="mb-6 text-muted-foreground">
                        You must be logged in to access the payments page.
                    </p>
                    <Button onClick={() => router.push("/login")}>Go to Login</Button>
                </Card>
            </main>
        );
    }

    if (user?.plan !== "unpaid") {
        router.push("/dashboard");
        return null;
    }

    return (
        <main className="min-h-screen w-full flex flex-col gap-2 items-center justify-center px-4">
            <Card className="w-full max-w-md shadow-lg">
                <CardContent className="flex flex-col justify-center items-center gap-4 py-8">
                    <article className="rounded-full bg-blue-600 text-white p-4">
                        <Lock className="text-white w-10 h-10" />
                    </article>
                    <h1 className="text-xl font-semibold text-center">
                        Complete Your Payment
                    </h1>
                    <p className="text-center text-muted-foreground text-sm">
                        You're one step away from unlocking your dashboard and getting full access to your client workspace.
                    </p>

                    <div className="w-full">
                        <ul className="space-y-2 text-left text-sm text-muted-foreground">
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="text-green-500 w-4 h-4" />
                                Transparent, milestone-driven project workflow
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="text-green-500 w-4 h-4" />
                                Upload screenshots & proofs for your clients
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="text-green-500 w-4 h-4" />
                                Real-time client visibility
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="text-green-500 w-4 h-4" />
                                Beautiful, client-facing dashboards
                            </li>
                        </ul>
                    </div>

                    <Button
                        className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-200"
                        disabled={checkoutMutation.isPending}
                        onClick={() => checkoutMutation.mutate()}
                    >
                        {checkoutMutation.isPending ? "Redirecting..." : "Checkout – $21/mo"}
                    </Button>

                    <p className="text-sm text-muted-foreground">
                        <Link
                            href="https://x.com/codewithkin"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline underline-offset-4 hover:text-blue-600 transition-colors"
                        >
                            Have any questions? Let’s talk
                        </Link>
                    </p>

                    <p className="text-xs text-center text-muted-foreground mt-2">
                        You’ll be redirected to a secure checkout. Your payment helps keep this platform running.
                    </p>
                </CardContent>
            </Card>
        </main>
    );
}
