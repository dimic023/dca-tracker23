import crypto from "crypto";

function generateHash() {
  // Generate a random number of 16 bytes (128 bits)
  const randomNumber = crypto.randomBytes(16);

  // Convert the random number to a hexadecimal string
  const randomHash = randomNumber.toString("hex");

  return randomHash;
}

export default generateHash;
