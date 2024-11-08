import { OpenAI } from '@langchain/openai';
import { EnvNames } from '@/constants/EnvNames';
import { singleton } from 'tsyringe';

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