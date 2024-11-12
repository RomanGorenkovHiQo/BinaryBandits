export interface IMessageHandler {
    handleMessage(message: string): Promise<string>;
}