import { Module, Global } from '@nestjs/common';
import { Firestore } from '@google-cloud/firestore';

@Global()
@Module({
  providers: [
    {
      provide: Firestore,
      useFactory: () => {
        return new Firestore({
          projectId: process.env.GCP_PROJECT_ID,
          keyFilename: process.env.GCP_KEY_FILE,
        });
      },
    },
  ],
  exports: [Firestore],
})
export class FirestoreModule {}
