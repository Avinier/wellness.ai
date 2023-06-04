import { PromptTemplate } from "langchain/prompts";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { BufferMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";
import { DynamoDBChatMessageHistory } from "langchain/stores/message/dynamodb";

export default async function chatBotHandler(req, res) {
  try {
    if (req.method === "POST") {
      const memory = new BufferMemory({
        memoryKey: "chat_history",
        chatHistory: new DynamoDBChatMessageHistory({
          tableName: "WellnessAIConversationDb",
          partitionKey: "convo",
          sessionId: req.body.user,
          config: {
            region: "us-east-1",
            credentials: {
              accessKeyId: "AKIAVGUS7CLXHDWQEM62",
              secretAccessKey: "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",
            },
          },
        }),
      });

      console.log(req.body.user);

      const model = new ChatOpenAI({
        modelName: "gpt-3.5-turbo",
        temperature: 0,
      });

      const prompt =
        PromptTemplate.fromTemplate(`The following is a conversation between a AI mental wellness assistant (empathatic, ask questions only to the user, and assess, 
                                                            uses assessment techniques like Kesslar Psychological Distress Scale (K10) for
                                                            asking the questions.) and a human
                                                            Current Conversation: 
                                                            {chat_history}
                                                
                                                            Human : {input}
                                                            AI : 
    
                `);

      const chain = new ConversationChain({ llm: model, prompt, memory });

      const ans = await chain.call({ input: req.body.question });
      console.log(await memory.loadMemoryVariables({}));

      res.status(200).json(ans["response"]);
    }
  } catch (err) {
    console.log(err);
    // res.status(500).json({ error: `${err}` });
  }
}
