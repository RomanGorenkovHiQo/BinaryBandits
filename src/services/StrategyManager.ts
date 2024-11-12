import { IStrategyManager } from '@/Interfaces/IStrategyManager';
import { MessageHandlingStrategy } from '@/services/strategies/MessageHandlingStrategy';
import { MessageHandlingStrategyName } from '@/constants/MessageHandlingStrategyName';
import { ChatRole } from '@/constants/ChatRole';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { container, inject, injectable } from 'tsyringe';
import { LangChainClient } from '@/utils/LangChainClient';
import { defineMessageHandlingStrategies } from '@/constants/Promts';
import { InvalidMessageHandlingStrategy } from '@/services/strategies/InvalidMessageHandlingStrategy';
import { InfoMessageHandlingStrategy } from '@/services/strategies/InfoMessageHandlingStrategy';
import { RatingMessageHandlingStrategy } from '@/services/strategies/RatingMessageHandlingStrategy';
import { RecommendationMessageHandlingStrategy } from '@/services/strategies/RecommendationMessageHandlingStrategy';

@injectable()
export class StrategyManager implements IStrategyManager {
    private strategyMap: Record<MessageHandlingStrategyName, () => MessageHandlingStrategy> = {
        [MessageHandlingStrategyName.Invalid]: () => container.resolve(InvalidMessageHandlingStrategy),
        [MessageHandlingStrategyName.Info]: () => container.resolve(InfoMessageHandlingStrategy),
        [MessageHandlingStrategyName.Rating]: () => container.resolve(RatingMessageHandlingStrategy),
        [MessageHandlingStrategyName.Recommendation]: () => container.resolve(RecommendationMessageHandlingStrategy),
    };

    constructor(@inject(LangChainClient) private langChainClient: LangChainClient) {
    }

    public getStrategy(strategyName: MessageHandlingStrategyName): MessageHandlingStrategy {
        return this.strategyMap[strategyName]();
    }

    public async defineStrategyOfMessage(message: string): Promise<MessageHandlingStrategyName> {
        const aiClient = this.langChainClient.getAiClient();
        const promptTemplate = ChatPromptTemplate.fromMessages([
            [ChatRole.System, defineMessageHandlingStrategies],
            [ChatRole.User, message],
        ]);

        const promptTemplateWithValidation = await promptTemplate.invoke({ topic: message });
        const strategyName = await aiClient.invoke(promptTemplateWithValidation) as MessageHandlingStrategyName;

        return strategyName;
    }
}