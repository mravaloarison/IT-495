"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export interface GeminiMessage {
	role: "user" | "assistant";
	content: string;
}

type Message = {
	id: string;
	content: string;
	role: "user" | "assistant";
	timestamp: Date;
};

export default function ChatBox() {
	const [messages, setMessages] = useState<Message[]>([
		{
			id: "0",
			content:
				"I'm your fashion assistant. I can help you choose outfits for any occasion, offer style advice, and answer questions about fashion trends and clothing combinations. How can I help with your fashion needs today?",
			role: "assistant",
			timestamp: new Date(),
		},
	]);
	const [input, setInput] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const messagesEndRef = useRef<HTMLDivElement>(null);

	const sendMessageToGemini = async (
		messageHistory: GeminiMessage[]
	): Promise<string> => {
		const response = await fetch("/api/chat", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				messages: [
					{
						role: "system",
						content:
							"You are a helpful fashion assistant. Provide fashion advice, outfit recommendations, and style guidance based on the user's questions. Focus only on fashion-related topics and be specific with your recommendations. If asked about non-fashion topics, gently redirect the conversation back to fashion. Speak in a friendly, stylish, and confident tone.",
					},
					...messageHistory,
				],
			}),
		});

		if (!response.ok) {
			const errorText = await response
				.text()
				.catch(() => "Unknown error");
			console.error("API response error:", response.status, errorText);
			throw new Error(`Error ${response.status}: ${errorText}`);
		}

		const data = await response.json();

		if (!data.text && !data.error) {
			throw new Error("Invalid response format from API");
		}

		if (data.error) {
			throw new Error(data.error);
		}

		return data.text;
	};

	const handleSendMessage = async () => {
		if (!input.trim()) return;

		const userMessage: Message = {
			id: Date.now().toString(),
			content: input.trim(),
			role: "user",
			timestamp: new Date(),
		};

		setMessages((prev) => [...prev, userMessage]);
		const currentInput = input.trim();
		setInput("");
		setIsLoading(true);

		try {
			const messageHistory: GeminiMessage[] = [
				...messages.map((msg) => ({
					role: msg.role,
					content: msg.content,
				})),
				{ role: "user", content: currentInput },
			];

			console.log("Sending messages to API:", messageHistory);

			const response = await Promise.race([
				sendMessageToGemini(messageHistory),
				new Promise<never>((_, reject) =>
					setTimeout(
						() => reject(new Error("Request timed out")),
						15000
					)
				),
			]);

			const aiMessage: Message = {
				id: (Date.now() + 1).toString(),
				content: response as string,
				role: "assistant",
				timestamp: new Date(),
			};

			setMessages((prev) => [...prev, aiMessage]);
		} catch (error) {
			console.error("Error getting AI response:", error);

			const errorMessage: Message = {
				id: (Date.now() + 1).toString(),
				content: `Sorry, I couldn't process your request: ${
					error instanceof Error ? error.message : "Unknown error"
				}. Please try again.`,
				role: "assistant",
				timestamp: new Date(),
			};

			setMessages((prev) => [...prev, errorMessage]);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	return (
		<div className="flex flex-col h-1/3-screen w-full py-4">
			<h1 className="text-2xl font-bold mb-4">Chat with FitFinder.AI</h1>

			<div className="flex-1 overflow-y-auto mb-4 space-y-4 p-4 rounded-lg border">
				{messages.length === 0 ? (
					<div className="text-center text-gray-500 py-8">
						Send a message to start the conversation with Gemini
					</div>
				) : (
					messages.map((message) => (
						<div
							key={message.id}
							className={`flex items-start gap-3 ${
								message.role === "user"
									? "justify-end"
									: "justify-start"
							}`}
						>
							{message.role === "assistant" && (
								<Avatar className="h-8 w-8 border flex items-center justify-center text-indigo-500">
									<Bot />
								</Avatar>
							)}

							<Card
								className={`p-3 max-w-[80%] ${
									message.role === "user"
										? "bg-primary text-primary-foreground"
										: "bg-muted"
								}`}
							>
								<p className="whitespace-pre-wrap">
									{message.content}
								</p>
								<div
									className={`text-xs mt-1 ${
										message.role === "user"
											? "text-primary-foreground/70"
											: "text-muted-foreground"
									}`}
								>
									{message.timestamp.toLocaleTimeString()}
								</div>
							</Card>

							{message.role === "user" && (
								<Avatar className="h-8 w-8 bg-secondary flex items-center justify-center">
									<User />
								</Avatar>
							)}
						</div>
					))
				)}

				{/* Loading indicator */}
				{isLoading && (
					<div className="flex items-start gap-3">
						<Avatar className="h-8 w-8 border flex items-center justify-center text-gray-300">
							<Bot />
						</Avatar>
						<div className="space-y-2">
							<Skeleton className="h-4 w-40" />
							<Skeleton className="h-4 w-32" />
						</div>
					</div>
				)}

				<div ref={messagesEndRef} />
			</div>

			<div className="relative h-full w-full">
				<Textarea
					value={input}
					onChange={(e) => setInput(e.target.value)}
					placeholder="Ask FitFinder.AI something..."
					className="resize-none pr-16 md:pr-12"
					onKeyDown={(e) => {
						if (e.key === "Enter" && !e.shiftKey) {
							e.preventDefault();
							handleSendMessage();
						}
					}}
				/>
				<div className="absolute right-2 bottom-2">
					<Button
						onClick={handleSendMessage}
						disabled={isLoading || !input.trim()}
						size="icon"
					>
						<Send className="h-4 w-4" />
					</Button>
				</div>
			</div>
		</div>
	);
}
