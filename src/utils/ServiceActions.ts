'use server'

import { container } from 'tsyringe';
import { LangChainClient } from '@/utils/LangChainClient';

export async function GetAnswers(message: string): Promise<string>{
    const langChainClient = container.resolve(LangChainClient);

    return langChainClient.GetResponseOnMessage(message)
}

export async function defineStrategyOfMessage(message: string) {
    const langChainClient = container.resolve(LangChainClient);

    return langChainClient.defineStrategyOfMessage(message)
}