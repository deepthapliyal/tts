// @ts-nocheck 
import { NextRequest, NextResponse } from "next/server";
const gTTS = require('gtts');
const fs = require("fs");
export async function POST(req: NextRequest, res: NextResponse) {
    const data = await req.json();
    const filePath = process.cwd() + '/tmp/Voice.mp3';


    try {
        var gtts = new gTTS(data.text, data.lang);
        const result = await new Promise((resolve, reject) => {
            gtts.save(filePath, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });


        const audio = await new Promise((resolve, reject) => {
            fs.readFile(filePath, (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
        const buffer = Buffer.from(audio);
        return NextResponse.json(buffer);

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })

    }
}