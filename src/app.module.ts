import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { Product } from './products/products.entities';
import { ProductsModule } from './products/products.module';
import { UserModule } from './user/user.module';
import { User } from './user/user.entities';
import { CartModule } from './cart/cart.module';
import { Cart } from './cart/cart.entities';
import { OrderModule } from './order/order.module';
import { Order } from './order/order.entities';
import { PaymentModule } from './payment/payment.module';
import { StripeModule } from './stripe/stripe.module';
import { Payment } from './payment/payment.entities';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(<string>process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [Product, User, Cart, Order, Payment],
      autoLoadEntities: true,
      synchronize: true, // shouldn't be used in production - may lose data
    }),
    StripeModule.forRoot(process.env.STRIPE_KEY, { apiVersion: '2022-08-01' }),
    UserModule,
    ProductsModule,
    CartModule,
    OrderModule,
    PaymentModule,
    StripeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
