export function maskEmail(email) {
  if (email) {
    // Split the email into local part and domain part
    const [localPart, domain] = email?.split("@");
    // Mask the local part
    const maskedLocalPart =
      localPart.substring(0, 3) + "*".repeat(localPart.length - 3);
    // Return the masked email
    return maskedLocalPart + "@" + domain;
  } else {
    return email;
  }
}
