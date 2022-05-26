import { Amplify, PubSub } from 'aws-amplify';
import { AWSIoTProvider } from '@aws-amplify/pubsub';
import {
  AWS_REGION,
  COGNITO_IDENTITY_POOL_ID,
  PUBSUB_ENDPOINT,
  USER_POOLS_ID,
  USER_POOLS_WEB_CLIENT_ID,
} from '@env';

export class MQTT {
  init(onError: (error: any) => void) {
    try {
      Amplify.configure({
        aws_project_region: AWS_REGION,
        aws_cognito_identity_pool_id: COGNITO_IDENTITY_POOL_ID,
        aws_cognito_region: AWS_REGION,
        aws_user_pools_id: USER_POOLS_ID,
        aws_user_pools_web_client_id: USER_POOLS_WEB_CLIENT_ID,
      });
      Amplify.addPluggable(
        new AWSIoTProvider({
          aws_pubsub_region: AWS_REGION,
          aws_pubsub_endpoint: PUBSUB_ENDPOINT,
        })
      );
    } catch (error) {
      onError(error);
    }
  }

  async publish(
    action: string,
    data: string | undefined,
    onError: (error: any) => void
  ) {
    try {
      await PubSub.publish('smarthusIn', {
        action,
        data,
      });
    } catch (error) {
      onError(error);
    }
  }

  subscribe(
    topic: string = 'smarthusOut',
    onMessage: (message: any) => void,
    onError: (error: any) => void
  ) {
    try {
      PubSub.subscribe(topic).subscribe({
        next: data => {
          onMessage(data.value.data);
        },
        error: error => onError(error),
        close: () => console.error('CLOSED'),
      });
    } catch (error) {
      onError(error);
    }
  }

  update(onError: (error: any) => void) {
    try {
      this.publish('retrieve', undefined, onError);
    } catch (error) {
      onError(error);
    }
  }
}
