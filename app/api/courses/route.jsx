import { db } from "@/config/db";
import { coursesTable, usersTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { desc, eq, ne, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req) {

    const { searchParams } = new URL(req.url);
    const courseId = searchParams?.get('courseId')
    const user = await currentUser();

    if (courseId == 0) {
        const result = await db.select().from(coursesTable)
            .where(sql`${coursesTable.courseContent}::jsonb != '{}'::jsonb`)
            .orderBy(desc(coursesTable.id))
            ;

        console.log(result);

        return NextResponse.json(result);
    }
    if (courseId) {
        const result = await db.select().from(coursesTable)
            .where(eq(coursesTable.cid, courseId));

        // FIX: Check if a course was found before trying to access result[0]
        if (result.length === 0) {
            return NextResponse.json({ error: 'Course not found' }, { status: 404 });
        }

        console.log(result);
        return NextResponse.json(result[0]); // This is now safe
    }
    else {
        const result = await db.select().from(coursesTable)
            .where(eq(coursesTable.userEmail, user.primaryEmailAddress?.emailAddress))
            .orderBy(desc(coursesTable.id));


        console.log(result);

        return NextResponse.json(result);
    }
}