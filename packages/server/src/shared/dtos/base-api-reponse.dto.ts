import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BaseApiResponse<T> {
  public data: T; // Swagger Decorator is added in the extended class below, since that will override this one.

  @ApiProperty({ type: Object })
  public meta: any;
}

export function SwaggerBaseApiResponse<T>(type: T): typeof BaseApiResponse {
  class ExtendedBaseApiResponse<T> extends BaseApiResponse<T> {
    @ApiProperty({ type })
    public data: T;
  }
  // NOTE : Overwrite the returned class name, otherwise whichever type calls this function in the last,
  // will overwrite all previous definitions. i.e., Swagger will have all response types as the same one.
  const isAnArray = Array.isArray(type) ? ' [ ] ' : '';
  Object.defineProperty(ExtendedBaseApiResponse, 'name', {
    value: `SwaggerBaseApiResponseFor ${type} ${isAnArray}`,
  });

  return ExtendedBaseApiResponse;
}

export class BaseApiErrorObject {
  @ApiProperty({ example: 500, description: '错误码' })
  public code: number;

  @ApiProperty({ example: false, description: '是否成功' })
  public success: boolean;

  @ApiProperty({ example: '错误信息', description: '错误信息' })
  public message: string;
}

export class BaseApiErrorResponse {
  @ApiProperty({ type: BaseApiErrorObject })
  public error: BaseApiErrorObject;
}
