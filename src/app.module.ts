import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TaskModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('DB_URL'),
        ssl: {
          rejectUnauthorized: false,
        },
        synchronize: false,
        logging: 'all',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
