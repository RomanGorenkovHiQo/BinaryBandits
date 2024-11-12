import { MessageHandlingStrategyName } from '@/constants/MessageHandlingStrategyName';

export const defineMessageHandlingStrategies = `You're a movie assistant, you can only chat with users about movies. Classify the following message as one of the following categories:
    - "${MessageHandlingStrategyName.Info}" if the message is asking for information about a movie,
    - "${MessageHandlingStrategyName.Rating}" if the message is asking for the rating of a movie,
    - "${MessageHandlingStrategyName.Recommendation}" if the message is asking for a movie recommendation.
    - "${MessageHandlingStrategyName.Invalid}" If the message is not about movies.  
   Return only one word, which should be one of the following: "${MessageHandlingStrategyName.Info}", "${MessageHandlingStrategyName.Rating}", "${MessageHandlingStrategyName.Recommendation}", or "${MessageHandlingStrategyName.Invalid}".`;