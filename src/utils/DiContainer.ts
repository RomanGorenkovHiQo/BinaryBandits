import 'reflect-metadata';
import { container } from 'tsyringe';
import { LangChainClient } from '@/utils/LangChainClient';
import { MessageHandler } from '@/services/MessageHandler';
import { IMessageHandler } from '@/Interfaces/IMessageHandler';
import { InvalidMessageHandlingStrategy } from '@/services/strategies/InvalidMessageHandlingStrategy';
import { InfoMessageHandlingStrategy } from '@/services/strategies/InfoMessageHandlingStrategy';
import { RatingMessageHandlingStrategy } from '@/services/strategies/RatingMessageHandlingStrategy';
import { RecommendationMessageHandlingStrategy } from '@/services/strategies/RecommendationMessageHandlingStrategy';
import { StrategyManager } from '@/services/StrategyManager';
import { IStrategyManager } from '@/Interfaces/IStrategyManager';

container.registerSingleton(LangChainClient);
container.register(InvalidMessageHandlingStrategy, InvalidMessageHandlingStrategy);
container.register(InfoMessageHandlingStrategy, InfoMessageHandlingStrategy);
container.register(RatingMessageHandlingStrategy, RatingMessageHandlingStrategy);
container.register(RecommendationMessageHandlingStrategy, RecommendationMessageHandlingStrategy);
container.register<IMessageHandler>('IMessageHandler',{ useClass: MessageHandler });
container.register<IStrategyManager>('IStrategyManager',{ useClass: StrategyManager });

export { container };