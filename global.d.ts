// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { smarthusDataType } from './src/types';

declare global {
  function mqttError(message: string): void;
  function mqttInit(): void;
  function mqttMessage(message: smarthusDataType): void;
  function mqttPublish(
    topic: string,
    data: { id: string; [key: string]: any }
  ): Promise<void>;
  function mqttUpdate(): Promise<void>;
  function mqttSubscribe(): void;
}

export {};
