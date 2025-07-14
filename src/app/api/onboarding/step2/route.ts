import { prisma } from "@/helpers/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { role, services } = body;

    const session = await auth.api.getSession({
        headers: await headers()
    });

    const userId = session?.user.id;

    try {
        await prisma.user.update({
            where: { id: userId },
            data: {
                role,
                services: {
                    connect: services.map((slug: string) => ({ slug })),
                },
            },
        });

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Failed to update user services" }, { status: 500 });
    }
}
