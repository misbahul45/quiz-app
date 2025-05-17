export interface CourseTopics {
  course_title: string;
  topics: string[];
}

const mockResponse = (userInput: string): CourseTopics => {
  return {
    course_title: `Learn ${userInput}`,
    topics: [
      "Introduction to the basics",
      "Core concepts and foundations",
      "Intermediate techniques",
      "Advanced features and applications",
      "Best practices and optimization",
      "Real-world projects"
    ]
  };
};


export const generateCourseTopics = async (userInput: string): Promise<CourseTopics> => {
  const apiKey = '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'
  const model = 'llama-3.3-70b-versatile';

  const body = {
    model,
    messages: [
      {
        role: 'user',
        content: `You are an assistant that only responds with raw JSON. Do not include explanations or markdown. Create a learning roadmap for "${userInput}" as a JSON object with the keys: "course_title" and "topics" (an array of 5-7 sequential topics).`,
      },
    ],
    temperature: 1,
    max_tokens: 1024,
  };

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content?.trim();

    if (!content) {
      console.error("Empty content. Full response:", JSON.stringify(data, null, 2));
      throw new Error("Empty response from model");
    }

    // Langsung parse JSON jika tidak pakai markdown
    return JSON.parse(content) as CourseTopics;
  } catch (error) {
    console.error('AI processing error:', error);
    return mockResponse(userInput);
  }
};
