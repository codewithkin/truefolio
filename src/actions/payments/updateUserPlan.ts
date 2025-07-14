import { prisma } from "@/helpers/prisma";

export async function updateUserPlan(userId: string, planId: string) {
    await prisma.user.update({
        where: { id: userId },
        data: { plan: planId }
    })
}