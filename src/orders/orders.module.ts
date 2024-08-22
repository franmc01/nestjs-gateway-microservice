import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ORDER_SERVICE } from '../config/injection-tokens';
import { envs } from '../config/envs';

@Module({
  controllers: [OrdersController],
  imports: [
    ClientsModule.register([
      {
        name: ORDER_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.orders_microservice_host,
          port: envs.orders_microservice_port,
        },
      },
    ]),
  ],
})
export class OrdersModule {}
