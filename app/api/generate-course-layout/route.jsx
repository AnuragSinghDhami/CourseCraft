import { db } from '@/config/db';
import { coursesTable } from '@/config/schema';
import { auth, currentUser } from '@clerk/nextjs/server';
import {
    GoogleGenAI,
} from '@google/genai';
import axios from 'axios';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';


const PROMPT = `Genrate Learning Course depends on following details. In which Make sure to add Course Name, 
Description,Course Banner Image Prompt Depends on Course Topics in 3d illustration.
   Chapter Name, , Topic under each chapters ,
    Duration for each chapters etc, in JSON format only

Schema:

{
  "course": {
    "name": "string",
    "description": "string",
    "category": "string",
    "level": "string",
    "includeVideo": "boolean",
    "noOfChapters": "number",
    "bannerImagePrompt": "string"
    "chapters": [
      {
        "chapterName": "string",
        "duration": "string",
        "topics": [
          "string"
        ],
        
      }
    ]
  }
}

, User Input: 

`
export const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});
export async function POST(req) {
    const { courseId, ...formData } = await req.json();
    const user = await currentUser();
    const { has } = await auth()
    const hasPremiumAccess = has({ plan: 'starter' })
    const config = {
        responseMimeType: 'text/plain',

    };
    const model = 'gemini-2.5-flash'; // FIX: Corrected model name
    const contents = [
        {
            role: 'user',
            parts: [
                {
                    text: PROMPT + JSON.stringify(formData),
                },
            ],
        },
    ];

    if (!hasPremiumAccess) {
        const result = await db.select().from(coursesTable)
            .where(eq(coursesTable.userEmail, user?.primaryEmailAddress.emailAddress));

        if (result?.length >= 5) {
            return NextResponse.json({ 'resp': 'limit exceed' })
        }
    }

    const response = await ai.models.generateContent({
        model,
        config,
        contents,
    });
    
    const rawResp = response?.candidates[0]?.content?.parts[0]?.text;

    let jsonResp;
    try {
        const rawJson = rawResp.replace('```json', '').replace('```', '');
        jsonResp = JSON.parse(rawJson);
    } catch (error) {
        console.error("CRITICAL: Failed to parse JSON from AI response.", error);
        return NextResponse.json({ error: "Failed to process the AI response due to invalid format." }, { status: 500 });
    }

    const imagePrompt = jsonResp.course?.bannerImagePrompt;

    //generate Image
    const bannerImageUrl = await GenerateImage(imagePrompt);
    
    // Save to Database
    const result = await db.insert(coursesTable).values({
        name: jsonResp.course.name,
        description: jsonResp.course.description,
        level: jsonResp.course.level,
        category: jsonResp.course.category,
        noOfChapter: jsonResp.course.noOfChapters, // FIX: Matched the schema (singular)
        courseJson: jsonResp,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        cid: courseId,
        bannerImageUrl: bannerImageUrl || '',
    });

    return NextResponse.json({ courseId: courseId });
}

const GenerateImage = async (imagePrompt) => {
    const BASE_URL = 'https://aigurulab.tech';
    try {
        const result = await axios.post(BASE_URL + '/api/generate-image',
            {
                width: 1024,
                height: 1024,
                input: imagePrompt,
                model: 'flux',
                aspectRatio: "16:9"
            },
            {
                headers: {
                    'x-api-key': process?.env?.AI_GURU_LAB_API,
                    'Content-Type': 'application/json',
                },
            })
        console.log("Image successfully generated.");
        return result.data.image;
    } catch (error) {
        console.error("ERROR: Image generation failed.", error.message);
        return null; 
    }
}