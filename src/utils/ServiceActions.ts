'use server'

import { LangChainClient } from '@/utils/LangChainClient';
import { IMessageHandler } from '@/Interfaces/IMessageHandler';
import { container } from '@/utils/DiContainer';
import { DuckDuckGoSearch } from "@langchain/community/tools/duckduckgo_search";

export async function GetAnswers(message: string): Promise<string>{
    const langChainClient = container.resolve(LangChainClient);
    const tool = new DuckDuckGoSearch({ maxResults: 10 });
    const a = 'what is the current weather in sf?'
    const result = await tool.invoke(a);
    console.log(result);
    return langChainClient.GetResponseOnMessage(message)
}

export async function handleMessage(message: string) {
    const messageHandler = container.resolve<IMessageHandler>('IMessageHandler');

    return messageHandler.handleMessage(message);
}

export async function GetAnswers1(message: string): Promise<string> {
    const langChainClient = container.resolve(LangChainClient);
    const tool = new DuckDuckGoSearch({ maxResults: 10 });

    try {
        const a = 'what is the current weather in sf?';

        // Имитация заголовков от браузера
        const response = await fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(a)}&format=json`, {
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36',
                'Accept': 'application/json',
            },
        });

        const result = await response.json();
        console.log(result);

        return langChainClient.GetResponseOnMessage(message);
    } catch (error) {
        console.error('Error fetching data:', error);
        return 'Произошла ошибка, попробуйте позже';
    }
}