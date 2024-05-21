import { NextRequest, NextResponse } from 'next/server';
import { ChatGroq } from '@langchain/groq';
import { PromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';
import axios from 'axios';

// function escapeDoubleQuotes(sqlString: string) {
//     return sqlString.replace(/"/g, '\\"');
// }

export async function POST(req: NextRequest) {
    try {
        const { userinput } = await req.json();
        const model = new ChatGroq({
            temperature: 0.9,
            apiKey: process.env.GROQ_API_KEY,
            modelName: 'mixtral-8x7b-32768'
        });
        console.log(userinput);

        const prompt = `
        You specialize in PostgreSQL queries. Your responses should be pure SQL queries.
            
        Table should be enclosed like this: \"Employee\"
        
        -- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "checkIn" TIMESTAMP(3) NOT NULL,
    "checkOut" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_email_key" ON "Employee"("email");

        
        YOU SHOULD NOT CREATE ANY TABLE NOR GIVE ANY DELETE COMMAND NOR INSERT COMMAND.
        {userinput} . Convert it to a SINGLE LINE raw SQL query, no comments, no text, just pure SQL, refer to above schema to answer question.
        
        please give the output as plain text without surrounding the command with these \`\`\`sql
        All table names should be contained in double quotes. The text should be in the form of a single-line formatted JSON string.
        `;

        const sqlPrompt = PromptTemplate.fromTemplate(prompt);
        const parser = new StringOutputParser();
        const chain = sqlPrompt.pipe(model).pipe(parser);
        const response = await chain.invoke({ userinput });
        // const final = escapeDoubleQuotes(response);

        const data = {
            sqlQuery: response
        };

        console.log(data);

        const tableData = await axios.post(`${process.env.DOMAIN}/api/prix`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return NextResponse.json(tableData.data);

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
