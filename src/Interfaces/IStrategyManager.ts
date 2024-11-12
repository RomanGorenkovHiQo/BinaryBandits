import { MessageHandlingStrategyName } from '@/constants/MessageHandlingStrategyName';
import { MessageHandlingStrategy } from '@/services/strategies/MessageHandlingStrategy';

export interface IStrategyManager {
    getStrategy(strategyName: MessageHandlingStrategyName): MessageHandlingStrategy;
    defineStrategyOfMessage(message: string): Promise<MessageHandlingStrategyName>;
}