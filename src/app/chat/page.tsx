"use client";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import SQLTable from "@/components/table/SQLTable";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";

const Chat = () => {
  const [userInput, setUserInput] = useState<string>("");
  const [output, setOutput] = useState<any>();
  const placeholders = [
    "What's the first rule of Fight Club?",
    "Who is Tyler Durden?",
    "Where is Andrew Laeddis Hiding?",
    "Write a Javascript method to reverse a string",
    "How to assemble your own PC?",
  ];


    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(userInput)
        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userinput: userInput })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();
            setOutput(responseData.result);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUserInput(event.target.value);
    };

    useEffect(() => {
        console.log("Output changed:", output);
    }, [output]);

    return (
        <div className="h-screen w-full bg-black bg-grid-small-white/[0.2] relative flex flex-col items-center justify-center">
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black[mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
          <PlaceholdersAndVanishInput
                  placeholders={placeholders}
                  onChange={handleChange}
                  onSubmit={handleSubmit}
                />
            <div className="m-4">
              {output ? (
                <SQLTable responseData={output} />
              ) : (
                <p className="bg-red-500 p-3 rounded-md text-white">Couldn&apos;t find anything</p>
              )}
            

          </div>
         
        </div>
      );
};

export default Chat;
