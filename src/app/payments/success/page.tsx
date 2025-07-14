'use client'

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export default function PaymentSuccessPage() {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push("/dashboard");
        }, 5000);
        return () => clearTimeout(timer);
    }, [router]);

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
