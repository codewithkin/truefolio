"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { postJSON } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useOnboardingStore } from "@/stores/onboardingStore";
import { useState } from "react";
import { UploadButton } from "@/utils/uploadthing";
import { toast } from "sonner";

interface Values {
    name: string;
    about: string;
}

const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    about: Yup.string().required("About is required"),
});

export default function Step1Form() {
    const router = useRouter();

    // Track the value of profile picture and header picture
    const [profilePicture, setProfilePicture] = useState<string | null>(null);
    const [headerPicture, setHeaderPicture] = useState<string | null>(null);

    const step = useOnboardingStore((state: any) => state.step);
    const setStep = useOnboardingStore((state: any) => state.setStep);

    const mutation = useMutation({
        mutationFn: (data: Values) => postJSON("/api/onboarding/step1", data),
        onSuccess: () => setStep(step + 1),
    });

    return (
        <Formik<Values>
            initialValues={{ name: "", about: "" }}
            validationSchema={validationSchema}
            onSubmit={(values) => mutation.mutate(values)}
        >
            {({ isSubmitting }) => (
                <Form className="space-y-6">
                    <div>
                    <UploadButton
                        endpoint="imageUploader"
                        onClientUploadComplete={(res: any) => {
                        // Do something with the response
                        console.log("Files: ", res);
                        toast.success("Upload Completed");
                        }}
                        onUploadError={(error: Error) => {
                        // Do something with the error.
                        toast.error(`ERROR! ${error.message}`);
                        }}
                    />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Name</label>
                        <Field name="name" as={Input} />
                        <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">About</label>
                        <Field name="about" as={Textarea} />
                        <ErrorMessage name="about" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <Button type="submit" disabled={isSubmitting || mutation.isPending}>
                        {mutation.isPending ? "Saving..." : "Next"}
                    </Button>
                </Form>
            )}
        </Formik>
    );
}
