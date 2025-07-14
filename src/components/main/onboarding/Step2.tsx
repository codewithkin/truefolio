"use client"

import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { postJSON } from "@/lib/api"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useOnboardingStore } from "@/stores/onboardingStore"

const suggestions = [
    "Web Design",
    "UI/UX",
    "Full-stack Development",
    "Copywriting",
    "Brand Identity",
    "Motion Design",
    "Product Strategy",
]

const validationSchema = Yup.object({
    service: Yup.string()
        .min(2, "Too short")
        .max(30, "Too long")
})

export default function Step4Form() {
    const [input, setInput] = useState("")
    const [services, setServices] = useState<string[]>([])
    const { step, setStep } = useOnboardingStore() as any;

    const mutation = useMutation({
        mutationFn: (data: { services: string[] }) =>
            postJSON("/api/onboarding/step4", data),
        onSuccess: () => {
            setStep(step + 1) // move to final screen or dashboard
        },
    })

    const addService = (service: string) => {
        if (!services.includes(service) && service.trim() !== "") {
            setServices((prev) => [...prev, service.trim()])
            setInput("")
        }
    }

    const removeService = (service: string) => {
        setServices((prev) => prev.filter((s) => s !== service))
    }

    return (
        <div className="space-y-6 w-full max-w-lg">
            <Formik
                initialValues={{ service: "" }}
                validationSchema={validationSchema}
                onSubmit={() => {
                    if (services.length > 0) {
                        mutation.mutate({ services })
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                What services do you offer?
                            </label>
                            <div className="flex gap-2">
                                <Input
                                    name="service"
                                    placeholder="e.g. Frontend Development"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault()
                                            addService(input)
                                        }
                                    }}
                                />
                                <Button
                                    type="button"
                                    onClick={() => addService(input)}
                                    disabled={!input}
                                >
                                    +
                                </Button>
                            </div>
                            <ErrorMessage
                                name="service"
                                component="div"
                                className="text-red-500 text-sm mt-1"
                            />
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {services.map((service, idx) => (
                                <Badge
                                    key={idx}
                                    className="flex items-center gap-1 px-3 py-1 text-sm"
                                >
                                    {service}
                                    <button
                                        type="button"
                                        onClick={() => removeService(service)}
                                    >
                                        <X size={12} />
                                    </button>
                                </Badge>
                            ))}
                        </div>

                        <div>
                            <p className="text-xs text-muted-foreground mb-2">
                                Suggestions:
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {suggestions.map((sugg) => (
                                    <button
                                        type="button"
                                        key={sugg}
                                        onClick={() => addService(sugg)}
                                        className={cn(
                                            "px-3 py-1 border rounded-full text-sm",
                                            services.includes(sugg)
                                                ? "bg-muted text-muted-foreground"
                                                : "hover:bg-accent"
                                        )}
                                    >
                                        {sugg}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={isSubmitting || mutation.isPending}
                        >
                            {mutation.isPending ? "Saving..." : "Save"}
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
