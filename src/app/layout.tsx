import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import "./globals.css"
import QueryClientProviderWrapper from "@/providers/QueryClientProviderWrapper"
import { Toaster } from "@/components/ui/sonner"

import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Truefolio — Your Modern Portfolio, Done Right",
  description:
    "Stand out, get hired. Truefolio lets freelancers and creatives build beautiful, client-reviewed portfolios in minutes. Own your brand with truefolio.cv.",
  metadataBase: new URL("https://truefolio.cv"),
  openGraph: {
    title: "Truefolio — Your Modern Portfolio, Done Right",
    description:
      "Create beautiful portfolios, collect client reviews, and share your work with your personal subdomain on truefolio.cv.",
    url: "https://truefolio.cv",
    siteName: "Truefolio",
    images: [
      {
        url: "https://truefolio.cv/og-image.png", // replace with actual image path
        width: 1200,
        height: 630,
        alt: "Truefolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Truefolio — Your Modern Portfolio, Done Right",
    description:
      "Freelancers and creatives: build client-reviewed portfolios that convert. Own your brand with a truefolio.cv site.",
    creator: "@codewithkin", // update if different
    images: ["https://truefolio.cv/og-image.png"], // replace with actual image path
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-title" content="Truefolio" />
      </head>
      <body className={`${montserrat.variable} antialiased`}>
        <QueryClientProviderWrapper>
          <NextSSRPlugin
            /**
             * The `extractRouterConfig` will extract **only** the route configs
             * from the router to prevent additional information from being
             * leaked to the client. The data passed to the client is the same
             * as if you were to fetch `/api/uploadthing` directly.
             */
            routerConfig={extractRouterConfig(ourFileRouter)}
          />
          {children}
          <Toaster richColors expand />
        </QueryClientProviderWrapper>
      </body>
    </html>
  )
}
