"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CircleUser } from "lucide-react";
import Step1Form from "@/components/main/onboarding/Step1";
import Step2Form from "@/components/main/onboarding/Step2";
import Step3Form from "@/components/main/onboarding/Step3";
import Step4Form from "@/components/main/onboarding/Step4";
import { useOnboardingStore } from "@/stores/onboardingStore";

const steps = [
    {
        title: "Tell us about yourself",
        description:
            "This helps us personalize your profile and introduce you properly.",
        icon: CircleUser,
        component: Step1Form,
    },
    {
        title: "Upload your profile image",
        description: "Show your face! Add a picture that represents you.",
        icon: CircleUser,
        component: Step2Form,
    },
    {
        title: "Where are you located?",
        description: "Location helps connect you with relevant opportunities.",
        icon: CircleUser,
        component: Step3Form,
    },
    {
        title: "What do you do?",
        description:
            "Add your role and hourly rate to attract the right clients.",
        icon: CircleUser,
        component: Step4Form,
    },
];

function OnboardingPage() {
    const router = useRouter();

    // Get the current step
    const step = useOnboardingStore((state: any) => state.step);
    const setStep = useOnboardingStore((state: any) => state.setStep);

    const currentStep = steps[step];
    const StepComponent = currentStep.component;

    const handleNext = () => {
        if (step < steps.length - 1) {
            setStep(step + 1);
        } else {
            router.push("/dashboard");
        }
    };

    return (
        <main className="min-h-screen w-full flex flex-col justify-center items-center gap-6 p-4">
            <article className="flex flex-col gap-2 items-center justify-center text-center max-w-md">
                <currentStep.icon className="h-10 w-10 text-primary" />
                <h1 className="text-2xl font-semibold">{currentStep.title}</h1>
                <p className="text-sm text-muted-foreground">{currentStep.description}</p>
            </article>

            <section className="w-full max-w-md">
                <StepComponent onNext={handleNext} />
            </section>

            <div className="text-sm text-muted-foreground">
                Step {step + 1} of {steps.length}
            </div>
        </main>
    );
}

export default OnboardingPage;