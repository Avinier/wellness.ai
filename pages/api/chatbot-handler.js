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
              accessKeyId: "<AWS-ACCESS-KEY>",
              secretAccessKey: "<AWS-SECRET-KEY>",
            },
          },
        }),
      });

      console.log(req.body.user);

      const model = new ChatOpenAI({
        modelName: "gpt-3.5-turbo",
        temperature: 0,
      });

      if (req.body.flag < 5) {
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
        res.status(200).json(ans["response"]);

        console.log(await memory.loadMemoryVariables({}));
      } else if (req.body.flag === 5) {
        const prompt =
          PromptTemplate.fromTemplate(`So as a mental wellness assistant, asses the following conversation and determine whether the person should go to a therapist
                                    or not (use the K10 Psychological distress scale). And suggest nearbuy therapists if they require

                                    Conversation: 
                                    {chat_history}
    
                `);

        const chain = new ConversationChain({ llm: model, prompt, memory });

        const ans = await chain.call({ input: req.body.question });
        res.status(200).json(ans["response"]);
      } else {
        res.status(200).json("DECISION IS MADE!");
      }
    }
  } catch (err) {
    console.log(err);
    // res.status(500).json({ error: `${err}` });
  }
}
