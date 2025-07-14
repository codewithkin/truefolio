import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@/generated/prisma";
import { magicLink } from "better-auth/plugins";
import { sendMagicLink } from "@/helpers/email/sendVerificationLink";

import { polar, checkout, portal, usage, webhooks } from "@polar-sh/better-auth";
import { Polar } from "@polar-sh/sdk";
import { updateUserPlan } from "@/actions/payments/updateUserPlan";

const polarClient = new Polar({
    accessToken: process.env.POLAR_ACCESS_TOKEN,
    server: process.env.NODE_ENV === "production" ? "production" : "sandbox" // We're in test mode for now
});

const prisma = new PrismaClient();
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    plugins: [
        magicLink({
            sendMagicLink: async ({ email, url, token }, request) => {
                await sendMagicLink({ email, token, url }, request)
            }
        }),
        polar({
            client: polarClient,
            createCustomerOnSignUp: true,
            use: [
                checkout({
                    products: [
                        {
                            productId: "c7d2c669-909b-4002-bedc-44668ec61bed",
                            slug: "Truefolio"
                        },
                    ],
                    successUrl: "/payments/success?checkout_id={CHECKOUT_ID}",
                    authenticatedUsersOnly: true
                }),
                portal(),
                usage(),
                //                 webhooks({
                //                     secret: process.env.POLAR_WEBHOOK_SECRET,
                //                     onCustomerStateChanged: (payload) => // Triggered when anything regarding a customer changes
                //                         onOrderPaid: (payload) => // Triggered when an order was paid (purchase, subscription renewal, etc.)
                //                     ...  // Over 25 granular webhook handlers
                // onPayload: (payload) => // Catch-all for all events
                //                 })
            ],
        })
    ],
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
        github: {
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }
    }
});