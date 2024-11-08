import 'reflect-metadata';
import { container } from 'tsyringe';
import { LangChainClient } from '@/utils/LangChainClient';

container.registerSingleton(LangChainClient);

export { container };