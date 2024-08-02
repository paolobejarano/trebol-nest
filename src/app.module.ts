import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MailModule } from './mail/mail.module';
import { FormsModule } from './forms/forms.module';
import { InstitutionModule } from './institution/institution.module';
import { CompanyOwnerModule } from './companyowner/companyowner.module';
import { IndividualOwnerModule } from './individualowner/individualowner.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 3306),
        username: configService.get<string>('DB_USERNAME', 'root'),
        password: configService.get<string>('DB_PASSWORD', '12345678'),
        database: configService.get<string>('DB_DATABASE', 'trebol_app'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    AuthModule,
    UsersModule,
    MailModule,
    FormsModule,
    InstitutionModule,
    CompanyOwnerModule,
    IndividualOwnerModule,
  ],
})
export class AppModule {}