import crypto from "crypto"

const ENCRYPTION_KEY: string = process.env.NEXT_PUBLIC_SECRET_KEY || "" // Must be 256 bits (32 characters)
const IV_LENGTH: number = 16 // For AES, this is always 16

export function keyGen() {
  return crypto.randomBytes(32).toString("hex")
}

export function encrypt(
  plainText: string,
  keyHex: string = ENCRYPTION_KEY
): string {
  const iv = crypto.randomBytes(IV_LENGTH) // Directly use Buffer returned by randomBytes
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(keyHex, "hex"),
    iv
  )
  const encrypted = Buffer.concat([
    cipher.update(plainText.toString(), "utf8"),
    cipher.final(),
  ])

  // Return iv and encrypted data as hex, combined in one line
  return iv.toString("hex") + ":" + encrypted.toString("hex")
}

export function decrypt(text: string, keyHex: string = ENCRYPTION_KEY) {
  try {
    const [ivHex, encryptedHex] = text.split(":")
    if (!ivHex || !encryptedHex) {
      throw new Error("Invalid or corrupted cipher format")
    }

    const encryptedText = Buffer.from(encryptedHex, "hex")
    const decipher = crypto.createDecipheriv(
      "aes-256-cbc",
      Buffer.from(keyHex, "hex"),
      Buffer.from(ivHex, "hex")
    )
    let decrypted = Buffer.concat([
      decipher.update(encryptedText),
      decipher.final(),
    ])

    return decrypted.toString()
  } catch (error: any) {
    return null
  }
}
