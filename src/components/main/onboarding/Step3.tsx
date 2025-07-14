"use client";

import { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { postJSON } from "@/lib/api";
import { useOnboardingStore } from "@/stores/onboardingStore";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
    SelectScrollUpButton,
    SelectScrollDownButton,
} from "@/components/ui/select";

import { getNames } from "country-list";

export interface Props {
    onNext?: () => void;
}

const countries = getNames();

const validationSchema = Yup.object({
    location: Yup.string()
        .required("Location is required")
        .min(2, "Location must be at least 2 characters"),
});

export default function Step3Form({ onNext }: Props) {
    const step = useOnboardingStore((state: any) => state.step);
    const setStep = useOnboardingStore((state: any) => state.setStep);

    const mutation = useMutation({
        mutationFn: (data: { location: string }) => postJSON("/api/onboarding/step3", data),
        onSuccess: () => {
            setStep(step + 1);
            if (onNext) onNext();
        },
    });

    return (
        <Formik
            initialValues={{ location: "" }}
            validationSchema={validationSchema}
            onSubmit={(values) => mutation.mutate(values)}
            enableReinitialize
        >
            {({ isSubmitting, values, setFieldValue }) => (
                <Form className="space-y-6 w-full">
                    <div className="w-full">
                        <label htmlFor="location" className="block text-sm font-medium mb-1">
                            Your Location
                        </label>
                        <Select
                            name="location"
                            value={values.location}
                            onValueChange={(val: string) => setFieldValue("location", val)}
                            disabled={mutation.isPending}
                        >
                            <SelectTrigger className="w-full" aria-label="Country">
                                <SelectValue className="w-full" placeholder="Select your country..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectScrollUpButton />
                                <SelectGroup>
                                    <SelectLabel>Countries</SelectLabel>
                                    {countries.map((country: string) => (
                                        <SelectItem key={country} value={country}>
                                            {country}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                                <SelectScrollDownButton />
                            </SelectContent>
                        </Select>
                        <ErrorMessage
                            name="location"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={isSubmitting || mutation.isPending || !values.location}
                    >
                        {mutation.isPending ? "Saving..." : "Next"}
                    </Button>
                </Form>
            )}
        </Formik>
    );
}
