import { injectable } from 'tsyringe';
import { MessageHandlingStrategy } from '@/services/strategies/MessageHandlingStrategy';
import { MessageHandlingStrategyName } from '@/constants/MessageHandlingStrategyName';

@injectable()
export class InfoMessageHandlingStrategy extends MessageHandlingStrategy {
    execute(): string {
        return MessageHandlingStrategyName.Info;
    }
}