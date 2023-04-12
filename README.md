<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).



# 学习
[399买的react全栈课程](https://appwhrkrsz84443.pc.xiaoe-tech.com/p/t_pc/course_pc_detail/big_column/p_6402a238e4b07b0558395e96?product_id=p_6402a238e4b07b0558395e96)        
[wolai学习笔记文档](https://www.wolai.com/josephxia/vXVPVYLNLHG6GACochkc8Q)   
[nestjs中文官网](https://docs.nestjs.cn/)
## cli 
nest g    
Generate a Nest element.    
Schematics available on @nestjs/schematics collection:
```
┌───────────────┬─────────────┬──────────────────────────────────────────────┐
│ name          │ alias       │ description                                  │
│ application   │ application │ Generate a new application workspace         │
│ class         │ cl          │ Generate a new class                         │
│ configuration │ config      │ Generate a CLI configuration file            │
│ controller    │ co          │ Generate a controller declaration            │
│ decorator     │ d           │ Generate a custom decorator                  │
│ filter        │ f           │ Generate a filter declaration                │
│ gateway       │ ga          │ Generate a gateway declaration               │
│ guard         │ gu          │ Generate a guard declaration                 │
│ interceptor   │ itc         │ Generate an interceptor declaration          │
│ interface     │ itf         │ Generate an interface                        │
│ middleware    │ mi          │ Generate a middleware declaration            │
│ module        │ mo          │ Generate a module declaration                │
│ pipe          │ pi          │ Generate a pipe declaration                  │
│ provider      │ pr          │ Generate a provider declaration              │
│ resolver      │ r           │ Generate a GraphQL resolver declaration      │
│ service       │ s           │ Generate a service declaration               │
│ library       │ lib         │ Generate a new library within a monorepo     │
│ sub-app       │ app         │ Generate a new application within a monorepo │
│ resource      │ res         │ Generate a new CRUD resource                 │
└───────────────┴─────────────┴──────────────────────────────────────────────┘
```
## validator 
###　常见的验证装饰器	
- @IsDefined(value: any)	检查值是否已定义（!== 未定义，!== null）。这是唯一忽略 skipMissingProperties 选项的装饰器。　　
- @IsOptional()	检查给定值是否为空（=== null，=== undefined），如果是，则忽略属性上的所有验证器。　
- @Equals(comparison: any)	检查值是否等于（“===”）比较。　　　
- @NotEquals(comparison: any)	检查值是否不相等（“！==”）比较。　　　
- @IsEmpty()	检查给定值是否为空（=== ''、=== null、=== undefined）。　　
- @IsNotEmpty()	检查给定值是否不为空（!== '', !== null, !== undefined）。　　　　　　
- @IsIn(values: any[])	检查值是否在允许值数组中。　　　
- @IsNotIn(values: any[])	检查值是否不在不允许值的数组中。　　
###　类型验证装饰器	
- @IsBoolean()	检查值是否为布尔值。
- @IsDate()	检查值是否为日期。
- @IsString()	检查值是否为字符串。
- @IsNumber(options: IsNumberOptions)	检查值是否为数字。
- @IsInt()	检查值是否为整数。
- @IsArray()	检查值是否为数组
- @IsEnum(entity: object)	检查该值是否是有效的枚举
###　数字验证装饰器	
- @IsDivisibleBy(num: number)	检查该值是否是可以被另一个整除的数字。
- @IsPositive()	检查该值是否为大于零的正数。
- @IsNegative()	检查该值是否为小于零的负数。
- @Min(min: number)	检查给定数字是否大于或等于给定数字。
- @Max(max: number)	检查给定数字是否小于或等于给定数字。
###　日期验证装饰器	
- @MinDate(date: Date | (() => Date))	检查该值是否是指定日期之后的日期。
- @MaxDate(date: Date | (() => Date))	检查该值是否是指定日期之前的日期。
###　字符串类型验证装饰器	
- @IsBooleanString()	检查字符串是否为布尔值(e.g. is "true" or "false" or "1", "0").
- @IsDateString()	的别名@IsISO8601()。
- @IsNumberString(options?: IsNumericOptions)	检查字符串是否为数字。
###　字符串验证装饰器	
- @Contains(seed: string)	检查字符串是否包含种子。
- @NotContains(seed: string)	检查字符串是否不包含种子。
- @IsAlpha()	检查字符串是否仅包含字母 (a-zA-Z)。
- @IsAlphanumeric()	检查字符串是否仅包含字母和数字。
- @IsDecimal(options?: IsDecimalOptions)	检查字符串是否为有效的十进制值。默认 IsDecimalOptions 是force_decimal=False, decimal_digits: '1,',locale: 'en-US'
- @IsAscii()	检查字符串是否仅包含 ASCII 字符。
- @IsBase32()	检查字符串是否为 base32 编码。
- @IsBase58()	检查字符串是否为 base58 编码。
- @IsBase64(options?: IsBase64Options)	检查字符串是否为 base64 编码。
- @IsIBAN()	检查字符串是否为 IBAN（国际银行帐号）。
- @IsBIC()	检查字符串是 BIC（银行识别代码）还是 SWIFT 代码。
- @IsByteLength(min: number, max?: number)	检查字符串的长度（以字节为单位）是否在一个范围内。
- @IsCreditCard()	检查字符串是否为信用卡。
- @IsCurrency(options?: IsCurrencyOptions)	检查字符串是否是有效的货币金额。
- @IsISO4217CurrencyCode()	检查字符串是否为 ISO 4217 货币代码。
- @IsEthereumAddress()	使用基本正则表达式检查字符串是否为以太坊地址。不验证地址校验和。
- @IsBtcAddress()	检查字符串是否是有效的 BTC 地址。
- @IsDataURI()	检查字符串是否为数据 uri 格式。
- @IsEmail(options?: IsEmailOptions)	检查字符串是否为电子邮件。
- @IsFQDN(options?: IsFQDNOptions)	检查字符串是否是完全限定的域名（例如 domain.com）。
- @IsFullWidth()	检查字符串是否包含任何全角字符。
- @IsHalfWidth()	检查字符串是否包含任何半角字符。
- @IsVariableWidth()	检查字符串是否包含全角字符和半角字符的混合。
- @IsHexColor()	检查字符串是否为十六进制颜色。
- @IsHSL()	检查字符串是否是基于CSS Colors Level 4 specification的 HSL 颜色。
- @IsRgbColor(options?: IsRgbOptions)	检查字符串是 rgb 还是 rgba 颜色。
- @IsIdentityCard(locale?: string)	检查字符串是否是有效的身份证代码。
- @IsPassportNumber(countryCode?: string)	检查字符串是否是相对于特定国家/地区代码的有效护照号码。
-  @IsPostalCode(locale?: string)	检查字符串是否为邮政编码。
-  @IsHexadecimal()	检查字符串是否为十六进制数。
-  @IsOctal()	检查字符串是否为八进制数。
-  @IsMACAddress(options?: IsMACAddressOptions)	检查字符串是否为 MAC 地址。
-  @IsIP(version?: "4"|"6")	检查字符串是否为 IP（版本 4 或 6）。
-  @IsPort()	检查字符串是否是有效的端口号。
-  @IsISBN(version?: "10"|"13")	检查字符串是否为 ISBN（版本 10 或 13）。
-  @IsEAN()	检查字符串是否为 EAN（欧洲商品编号）。
-  @IsISIN()	检查字符串是否为 ISIN（股票/证券标识符）。
-  @IsISO8601(options?: IsISO8601Options)	检查字符串是否为有效的 ISO 8601 日期格式。使用选项 strict = true 对有效日期进行额外检查。
-  @IsJSON()	检查字符串是否为有效的 JSON。
-  @IsJWT()	检查字符串是否为有效的 JWT。
-  @IsObject()	检查对象是否为有效对象（null、函数、数组将返回 false）。
-  @IsNotEmptyObject()	检查对象是否不为空。
-  @IsLowercase()	检查字符串是否为小写。
-  @IsLatLong()	检查字符串是否为格式为 lat, long 的有效经纬度坐标。
-  @IsLatitude()	检查字符串或数字是否是有效的纬度坐标。
-  @IsLongitude()	检查字符串或数字是否是有效的经度坐标。
-  @IsMobilePhone(locale: string)	检查字符串是否为手机号码。
-  @IsISO31661Alpha2()	检查字符串是否是有效的 ISO 3166-1 alpha-2 官方分配的国家代码。
-  @IsISO31661Alpha3()	检查字符串是否是有效的 ISO 3166-1 alpha-3 官方分配的国家代码。
-  @IsLocale()	检查字符串是否是语言环境。
-  @IsPhoneNumber(region: string)	使用 libphonenumber-js 检查字符串是否是有效的电话号码。
-  @IsMongoId()	检查字符串是否是 MongoDB ObjectId 的有效十六进制编码表示。
-  @IsMultibyte()	检查字符串是否包含一个或多个多字节字符。
-  @IsNumberString(options?: IsNumericOptions)	检查字符串是否为数字。
-  @IsSurrogatePair()	检查字符串是否包含任何代理项对字符。
-  @IsTaxId()	检查字符串是否是有效的税号。默认语言环境是en-US.
-  @IsUrl(options?: IsURLOptions)	检查字符串是否为 URL。
-  @IsMagnetURI()	检查字符串是否为磁铁 uri 格式。
-  @IsUUID(version?: UUIDVersion)	检查字符串是否为 UUID（版本 3、4、5 或全部）。
-  @IsFirebasePushId()	检查字符串是否为Firebase 推送 ID
-  @IsUppercase()	检查字符串是否为大写。
-  @Length(min: number, max?: number)	检查字符串的长度是否在一个范围内。
-  @MinLength(min: number)	检查字符串的长度是否不小于给定的数字。
-  @MaxLength(max: number)	检查字符串的长度是否不超过给定的数字。
-  @Matches(pattern: RegExp, modifiers?: string)	检查字符串是否与模式匹配。matches('foo', /foo/i) 或 matches('foo', 'foo', 'i')。
-  @IsMilitaryTime()	检查字符串是否是 HH:MM 格式的军事时间的有效表示。
-  @IsTimeZone()	检查字符串是否代表有效的 IANA 时区。
-  @IsHash(algorithm: string)	检查字符串是否为散列 支持以下类型：md4, md5, sha1, sha256, sha384, sha512, ripemd128, ripemd160, tiger128, tiger160, tiger192, crc32, crc32b.
-  @IsMimeType()	检查字符串是否匹配有效的MIME 类型格式
-  @IsSemVer()	检查字符串是否是语义版本控制规范 (SemVer)。
-  @IsISSN(options?: IsISSNOptions)	检查字符串是否为 ISSN。
-  @IsISRC()	检查字符串是否为ISRC。
-  @IsRFC3339()	检查字符串是否为有效的RFC 3339日期。
-  @IsStrongPassword(options?: IsStrongPasswordOptions)	检查字符串是否为强密码。
###　数组验证装饰器	
-  @ArrayContains(values: any[])	检查数组是否包含给定值数组中的所有值。
-  @ArrayNotContains(values: any[])	检查数组是否不包含任何给定值。
-  @ArrayNotEmpty()	检查给定数组是否不为空。
-  @ArrayMinSize(min: number)	检查数组的长度是否大于或等于指定的数字。
-  @ArrayMaxSize(max: number)	检查数组的长度是否小于或等于指定的数字。
-  @ArrayUnique(identifier?: (o) => any)	检查所有数组的值是否唯一。对象的比较是基于引用的。可选函数可以指定哪个返回值将用于比较。
###　对象验证装饰器	
-  @IsInstance(value: any)	检查属性是否是传递值的实例。
###　其他装饰器	
-  @Allow()	当没有为它指定其他约束时，防止剥离该属性。


