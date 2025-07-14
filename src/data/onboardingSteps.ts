import Step1 from "@/components/main/onboarding/Step1"
import Step2Form from "@/components/main/onboarding/Step2"
import Step3Form, { Props } from "@/components/main/onboarding/Step3"
import Step4Form from "@/components/main/onboarding/Step4"
import {
    CircleUser,
    Briefcase,
    MapPin,
    DollarSign
} from "lucide-react"

type OnboardingStep = {
    step: number,
    title: string,
    icon: any,
    description?: string,
    form: ({ onNext }: Props) => Element,
    message?: string
}

export const onboardingSteps: OnboardingStep[] = [
    {
        step: 1,
        title: "Tell us about yourself",
        icon: CircleUser,
        description: "We’ll use this to personalize your profile and let visitors know more about you.",
        form: Step1,
        message: "This helps people get a sense of who you are."
    },
    {
        step: 2,
        title: "What do you do?",
        icon: Briefcase,
        description: "Select the services you offer, your professional role, and years of experience.",
        form: Step2Form,
        message: "Showcase your core expertise to potential clients or employers."
    },
    {
        step: 3,
        title: "Where are you located?",
        icon: MapPin,
        description: "Your location helps with visibility in relevant regions.",
        form: Step3Form,
        message: "This improves discovery for region-specific opportunities."
    },
    {
        step: 4,
        title: "Set your hourly rate",
        icon: DollarSign,
        description: "Let others know your availability and what you typically charge.",
        form: Step4Form,
        message: "You can always change this later."
    },
]
