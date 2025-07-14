'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { updateUserPlan } from "@/actions/payments/updateUserPlan";

export default function PaymentSuccessPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [notLoggedIn, setNotLoggedIn] = useState(false);

    useEffect(() => {
        const updatePlan = async () => {
            try {
                setLoading(true);
                const session = await (await authClient.getSession()).data;
                if (!session?.user?.id) {
                    setNotLoggedIn(true);
                    setLoading(false);
                    return;
                }
                await updateUserPlan(session.user.id, "pro");
                setLoading(false);
            } catch (err) {
                setError("Failed to update your plan. Please contact support.");
                setLoading(false);
            }
        };

        updatePlan();
    }, []);

    if (loading) {
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

    if (error) {
        return (
            <main className="min-h-screen flex items-center justify-center p-4 bg-red-50">
                <Card className="max-w-md w-full">
                    <CardContent className="text-center text-red-700">
                        <h2 className="text-xl font-bold mb-4">Oops!</h2>
                        <p>{error}</p>
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
                    <h1 className="text-2xl font-bold text-green-700">
                        Congratulations!
                    </h1>
                    <p className="text-green-800">
                        Your payment was successful. Welcome to Truefolio — your journey to build an outstanding portfolio starts now!
                    </p>
                    <Button onClick={() => router.push("/dashboard")} className="w-full">
                        Go to Dashboard
                    </Button>
                </CardContent>
            </Card>
        </main>
    );
}
