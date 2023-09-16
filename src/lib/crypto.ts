export function canGenerateRandomNumber(window: Window): boolean {
    // @ts-ignore
    return !!(window.crypto && window.crypto.getRandomValues && window.crypto.subtle);
}
/*
export function getRandomNumber32Bit(window:Window): number {
    const randomValues = new Uint32Array(1);
    window.crypto.getRandomValues(randomValues);
    return randomValues[0];
}
export function getRandomNumber16Bit(window:Window): number {
    const randomValues = new Uint16Array(1);
    window.crypto.getRandomValues(randomValues);
    return randomValues[0];
}
*/
export function randomNumberFromSeedList(seedList: Array<number>, rangeLength: number, bits: number = 16): Number {
    let sum = BigInt(0);
    for (let i = 0; i < seedList.length - 1; i++) {
        const first16Bits = BigInt(seedList[i]) & ((1n << BigInt(bits)) - 1n);
        sum = sum + first16Bits;
    }
    return Number(sum % BigInt(rangeLength));
}

type EncryptedRandomMessage = {
    key: Uint8Array // length: 256 bit how do we serialize this?
    iv: Uint8Array // Uint8Array(12)
    randomBytes: Uint8Array // Uint8Array(32)
    encryptedData: Uint8Array
}

export async function encryptRandomMessage(): Promise<EncryptedRandomMessage> {
    const key = await crypto.subtle.generateKey(
        { name: "AES-GCM", length: 256 },
        true,
        ["encrypt", "decrypt"]
    );

    const randomBytes = new Uint8Array(32);
    crypto.getRandomValues(randomBytes);

    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encryptedData = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv: iv },
        key,
        randomBytes
    );

    const exportedKey = await crypto.subtle.exportKey("raw", key)

    return {
        key: new Uint8Array(exportedKey),
        iv,
        randomBytes,
        encryptedData: new Uint8Array(encryptedData),
    }
}

export async function decrypt(m: EncryptedRandomMessage): Promise<Uint8Array> {
    const importedKey = await crypto.subtle.importKey(
        "raw",
        m.key,
        { name: "AES-GCM", length: 256 },
        false,
        ["encrypt", "decrypt"]
    );

    const decryptedData = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv: m.iv },
        importedKey,
        m.encryptedData
    );

    return new Uint8Array(decryptedData)
}