import { Module, Global } from '@nestjs/common';
import { Firestore } from '@google-cloud/firestore';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  providers: [
    {
      inject: [ConfigService],
      provide: Firestore,
      useFactory: (configService: ConfigService) => {
        const projectId = configService.get<string>('GCP_PROJECT_ID');
        const keyFilename = configService.get<string>('GCP_KEY_FILE');

        if (!projectId || !keyFilename) {
          throw new Error(
            'FirestoreModule: GCP_PROJECT_ID or GCP_KEY_FILE not specified.',
          );
        }

        return new Firestore({
          projectId,
          keyFilename,
        });
      },
    },
  ],
  exports: [Firestore],
})
export class FirestoreModule {}
