export class OTP {
  constructor(
    public readonly id: string,
    public readonly code: string,
    public readonly email: string,
    public readonly expiresAt: Date,
    public readonly createdAt: Date = new Date()
  ) {}

  isExpired(): boolean {
    return new Date() > this.expiresAt
  }
}