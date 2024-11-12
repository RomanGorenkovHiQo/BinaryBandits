import { OpenAI } from '@langchain/openai';
import { EnvName } from '@/constants/EnvName';
import { singleton } from 'tsyringe';

@singleton()
export class LangChainClient {
    private openaiClient!: OpenAI;

    constructor() {
        this.openaiClient = this.CreateNewClient()
    }

    public getAiClient(): OpenAI {
        return this.openaiClient;
    }

    public async GetResponseOnMessage(message: string): Promise<string> {
        const response = await this.openaiClient.invoke(message);

        return response;
    }

    private CreateNewClient(): OpenAI {
        const apiKey = process.env[EnvName.OPENAI_API_KEY];

        if (!apiKey) throw new Error("Invalid OPENAI_API_KEY");

        return new OpenAI({
            azureOpenAIApiKey: process.env[EnvName.OPENAI_API_KEY],
            azureOpenAIApiInstanceName: process.env[EnvName.OPENAI_API_INSTANCE_NAME],
            azureOpenAIApiDeploymentName: process.env[EnvName.AZURE_OPENAI_API_DEPLOYMENT_NAME],
            azureOpenAIApiVersion: process.env[EnvName.AZURE_OPENAI_API_VERSION],
            model: process.env[EnvName.OPENAI_API_MODEL]
        })
    }
}