import vine from '@vinejs/vine'

export const generateOtpValidator = vine.compile(
  vine.object({
    email: vine.string().email().maxLength(40)
  })
)

export const validateOtpValidator = vine.compile(
  vine.object({
    email: vine.string().email().maxLength(40),
    code: vine.string().alphaNumeric().maxLength(6)
  })
)