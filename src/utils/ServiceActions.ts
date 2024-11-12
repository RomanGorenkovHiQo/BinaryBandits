'use server'

import { LangChainClient } from '@/utils/LangChainClient';
import { IMessageHandler } from '@/Interfaces/IMessageHandler';
import { container } from '@/utils/DiContainer';
// import { DuckDuckGoSearch } from "@langchain/community/tools/duckduckgo_search";

export async function GetAnswers(message: string): Promise<string>{
    const langChainClient = container.resolve(LangChainClient);
    // const tool = new DuckDuckGoSearch({ maxResults: 10 });
    // const a = 'what is the current weather in sf?'
    // const result = await tool.invoke(a);
    // console.log(result);
    return langChainClient.GetResponseOnMessage(message)
}

export async function handleMessage(message: string) {
    const messageHandler = container.resolve<IMessageHandler>('IMessageHandler');

    return messageHandler.handleMessage(message);
}