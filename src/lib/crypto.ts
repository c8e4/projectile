export function canGenerateRandomNumber(window: Window): boolean {
    return !!(window.crypto && window.crypto.getRandomValues)
}
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

export function randomNumberFromSeedList(seedList:Array<number>, rangeLength:number, bits:number = 16): Number{
    let sum = BigInt(0);
    for(let i =0; i < seedList.length - 1; i++){
        const first16Bits = BigInt(seedList[i]) & ((1n << BigInt(bits)) - 1n);
        sum = sum + first16Bits;
    }
    return Number(sum % BigInt(rangeLength));
}
