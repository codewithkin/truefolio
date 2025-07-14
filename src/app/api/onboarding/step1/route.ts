import { prisma } from "@/helpers/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { name, about } = body;

    const session = await auth.api.getSession({
        headers: await headers()
    })

    const userId = session?.user.id;

    try {
        await prisma.user.update({
            where: { id: userId },
            data: { name, about },
        });

        return NextResponse.json({ success: true });
    } catch (err) {
        return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
    }
}
