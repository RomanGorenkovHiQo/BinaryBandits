import { OpenAI } from '@langchain/openai';
import { EnvNames } from '@/constants/EnvNames';
import { singleton } from 'tsyringe';
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { JsonOutputParser } from '@langchain/core/output_parsers';

type Response = {
    type: "info" | "invalid" | "rating" | "recommendation";
};

@singleton()
export class LangChainClient {
    private openaiClient!: OpenAI;

    constructor() {
        this.openaiClient = this.CreateNewClient()
    }

    public async GetResponseOnMessage(message: string): Promise<string> {
        const response = await this.openaiClient.invoke(message);

        return response;
    }

    public async defineStrategyOfMessage(userMessage: string) {
        const parser = new JsonOutputParser<Response>();
        const promptTemplate = ChatPromptTemplate.fromMessages([
            ["system", `You're a movie assistant, you can only chat with users about movies. Classify the following message as one of the following categories:
    - "info" if the message is asking for information about a movie,
    - "rating" if the message is asking for the rating of a movie,
    - "recommendation" if the message is asking for a movie recommendation.
   -"invalid" If the message is not about movies.  
   Return the response in JSON format. Here are all the possible options key - "type", value - "info", "rating", "recommendation", "invalid". Make sure to wrap the answer in \`\`\`json and \`\`\` tags`],
            ["user", userMessage],
        ]);

        const promptTemplateWithValidation = await promptTemplate.invoke({ topic: userMessage });
        const responseInJSON = await this.openaiClient.invoke(promptTemplateWithValidation);
        const resultResponse = await parser.parse(responseInJSON)

        if (resultResponse.type === 'invalid') {
            return "Unfortunately I can't help on this issue."
        } else {
            return resultResponse.type;
        }
    }

    private CreateNewClient(): OpenAI {
        const apiKey = process.env[EnvNames.OPENAI_API_KEY];

        if (!apiKey) throw new Error("Invalid OPENAI_API_KEY");

        return new OpenAI({
            azureOpenAIApiKey: process.env[EnvNames.OPENAI_API_KEY],
            azureOpenAIApiInstanceName: process.env[EnvNames.OPENAI_API_INSTANCE_NAME],
            azureOpenAIApiDeploymentName: process.env[EnvNames.AZURE_OPENAI_API_DEPLOYMENT_NAME],
            azureOpenAIApiVersion: process.env[EnvNames.AZURE_OPENAI_API_VERSION],
            model: process.env[EnvNames.OPENAI_API_MODEL]
        })
    }
}