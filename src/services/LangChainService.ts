import { inject, injectable } from 'tsyringe';
import { LangChainClient } from '@/utils/LangChainClient';

@injectable()
export class LangChainService {
    constructor(
        @inject(LangChainClient) private langChainClient: LangChainClient
    ) {
    }
}