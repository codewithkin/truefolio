"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { postJSON } from "@/lib/api";
import { useOnboardingStore } from "@/stores/onboardingStore";

interface Props {
    onNext: () => void;
}

const validationSchema = Yup.object({
    role: Yup.string().required("Role is required"),
    hourlyRate: Yup.number()
        .typeError("Must be a number")
        .positive("Must be greater than 0")
        .required("Hourly rate is required"),
});

export default function Step4Form({ onNext }: Props) {
    const step = useOnboardingStore((state: any) => state.step);
    const setStep = useOnboardingStore((state: any) => state.setStep);

    const mutation = useMutation({
        mutationFn: (data: { role: string; hourlyRate: number }) =>
            postJSON("/api/onboarding/step4", data),
    });

    return (
        <Formik
            initialValues={{ role: "", hourlyRate: "" }}
            validationSchema={validationSchema}
            onSubmit={(values) =>
                mutation.mutate({
                    role: values.role,
                    hourlyRate: Number(values.hourlyRate),
                })
            }
        >
            {({ isSubmitting }) => (
                <Form className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium">Your Role</label>
                        <Field name="role" as={Input} placeholder="e.g. Full-stack Developer" />
                        <ErrorMessage
                            name="role"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Hourly Rate (USD)</label>
                        <Field
                            name="hourlyRate"
                            as={Input}
                            type="number"
                            min="1"
                            placeholder="e.g. 50"
                        />
                        <ErrorMessage
                            name="hourlyRate"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                        />
                    </div>

                    <Button type="submit" disabled={isSubmitting || mutation.isPending}>
                        {mutation.isPending ? "Saving..." : "Finish"}
                    </Button>
                </Form>
            )}
        </Formik>
    );
}
