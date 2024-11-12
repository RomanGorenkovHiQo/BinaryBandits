import { injectable } from 'tsyringe';
import { MessageHandlingStrategy } from '@/services/strategies/MessageHandlingStrategy';

@injectable()
export class InvalidMessageHandlingStrategy extends MessageHandlingStrategy {
    execute(): string {
        return 'Unfortunately I can\'t help on this issue.'
    }
}