import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Inject,
  ParseUUIDPipe,
} from '@nestjs/common';

import { ORDER_SERVICE } from '../config/injection-tokens';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(ORDER_SERVICE) private readonly ordersService: ClientProxy,
  ) {}

  @Post()
  create(@Body() createOrderDto: unknown) {
    return this.ordersService.send('createOrder', createOrderDto).pipe(
      catchError((error) => {
        console.log(error);
        throw new RpcException(error);
      }),
    );
  }

  @Get()
  findAll() {
    return this.ordersService.send('findAllOrders', {}).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersService.send('findOneOrder', { id }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }
}
