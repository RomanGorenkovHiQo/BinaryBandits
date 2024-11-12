import { IMessageHandler } from '@/Interfaces/IMessageHandler';
import { injectable, inject } from 'tsyringe';
import type { IStrategyManager } from '@/Interfaces/IStrategyManager';

@injectable()
export class MessageHandler implements IMessageHandler {
    constructor(@inject('IStrategyManager') private strategyManager: IStrategyManager) {
    }

    async handleMessage(message: string): Promise<string> {
        const strategyName = await this.strategyManager.defineStrategyOfMessage(message);
        const strategy = this.strategyManager.getStrategy(strategyName);

        return strategy.execute()
    }
}