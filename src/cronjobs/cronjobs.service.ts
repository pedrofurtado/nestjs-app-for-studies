import { Injectable } from '@nestjs/common';
import { Cron, Timeout } from '@nestjs/schedule';

@Injectable()
export class CronjobsService {
  @Cron('*/5 * * * * *')
  atEvery5Seconds()  {
    console.log(`CRON JOBZIN: at every 5 seconds run this, please ${(new Date()).toISOString()}`)
  }

  @Cron('*/10 * * * * *')
  atEvery10Seconds()  {
    console.log(`CRON JOBZIN: at every 10 seconds run this, please ${(new Date()).toISOString()}`)
  }

  @Timeout(7000)
  runOnceAfter7SecondsThatAppWasStarted() {
    console.log('CRON JOB: run once this 7 seconds after app was started')
  }
}
