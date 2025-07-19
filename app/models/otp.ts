import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class OtpModel extends BaseModel {
  static table = 'otps'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare code: string

  @column()
  declare email: string

  @column.dateTime({ autoCreate: true, columnName: 'createdAt' })
  declare createdAt: DateTime

  @column.dateTime({ columnName: 'expiresAt' })
  declare expiresAt: DateTime

  @column.dateTime({ columnName: 'usedAt' })
  declare usedAt: DateTime
}