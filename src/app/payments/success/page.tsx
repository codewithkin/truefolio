'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";

async function upgradeUserPlan(userId: string, plan: string) {
    const res = await fetch("/api/user/upgrade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, plan }),
    });

    if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update user plan");
    }
    return res.json();
}

export default function PaymentSuccessPage() {
    const router = useRouter();
    const [notLoggedIn, setNotLoggedIn] = useState(false);

    const mutation = useMutation({
        mutationFn: ({ userId, plan }: { userId: string; plan: string }) =>
            upgradeUserPlan(userId, plan),
        onError: (error: any) => {
            console.error("Failed to update plan:", error);
            // You could set error state here if you want to show an error UI instead
        },
    });

    useEffect(() => {
        const updatePlan = async () => {
            const session = await (await authClient.getSession()).data;
            if (!session?.user?.id) {
                setNotLoggedIn(true);
                return;
            }
            mutation.mutate({ userId: session.user.id, plan: "pro" });
        };

        updatePlan();
    }, []);

    if (mutation.isPending) {
        return (
            <main className="min-h-screen flex items-center justify-center p-4 bg-green-50">
                <Card className="max-w-md w-full">
                    <CardContent className="flex flex-col items-center gap-6 text-center">
                        <CheckCircle2
                            className="w-16 h-16 text-green-600 animate-spin"
                            aria-hidden="true"
                        />
                        <h2 className="text-lg font-semibold text-green-700">
                            Finalizing your subscription...
                        </h2>
                    </CardContent>
                </Card>
            </main>
        );
    }

    if (notLoggedIn) {
        return (
            <main className="min-h-screen flex items-center justify-center p-4 bg-red-50">
                <Card className="max-w-md w-full">
                    <CardContent className="text-center text-red-700">
                        <h2 className="text-xl font-bold mb-4">Not Logged In</h2>
                        <p>You must be logged in to view this page.</p>
                        <Button className="mt-6" onClick={() => router.push("/login")}>
                            Go to Login
                        </Button>
                    </CardContent>
                </Card>
            </main>
        );
    }

    if (mutation.isError) {
        return (
            <main className="min-h-screen flex items-center justify-center p-4 bg-red-50">
                <Card className="max-w-md w-full">
                    <CardContent className="text-center text-red-700">
                        <h2 className="text-xl font-bold mb-4">Oops!</h2>
                        <p>{(mutation.error as Error).message || "An error occurred."}</p>
                        <Button className="mt-6" onClick={() => router.push("/")}>
                            Go Back Home
                        </Button>
                    </CardContent>
                </Card>
            </main>
        );
    }

    return (
        <main className="min-h-screen flex items-center justify-center p-4 bg-green-50">
            <Card className="max-w-md w-full">
                <CardContent className="flex flex-col items-center gap-6 text-center">
                    <CheckCircle2
                        className="w-16 h-16 text-green-600 animate-pulse"
                        aria-hidden="true"
                    />
                    <h1 className="text-2xl font-bold text-green-700">Congratulations!</h1>
                    <p className="text-green-800">
                        Your payment was successful. Welcome to Truefolio — your journey to
                        build an outstanding portfolio starts now!
                    </p>
                    <Button onClick={() => router.push("/dashboard")} className="w-full">
                        Go to Dashboard
                    </Button>
                </CardContent>
            </Card>
        </main>
    );
}
