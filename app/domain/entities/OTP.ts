export class OTP {
  constructor(
    public readonly id: number,
    public readonly code: string,
    public readonly email: string,
    public readonly expiresAt: Date,
    public readonly createdAt: Date = new Date(),
    public readonly usedAt?: Date
  ) {}

  isExpired(): boolean {
    return new Date() > this.expiresAt
  }

  isUsed(): boolean {
    return this.usedAt !== undefined
  }
}