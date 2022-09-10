/**
 * todo
 * @param salt 
 * @param text 
 * @returns 
 */
export const encrypt = (salt: string, text: string) => {
    const textToChars = (text: any) => text.split("").map((c: any) => c.charCodeAt(0));
    const byteHex = (n: any) => ("0" + Number(n).toString(16)).substr(-2);
    const applySaltToChar = (code: any) => textToChars(salt).reduce((a: any, b: any) => a ^ b, code);
  
    return text
      .split("")
      .map(textToChars)
      .map(applySaltToChar)
      .map(byteHex)
      .join("");
  };
  
/**
 * todo
 * @param salt 
 * @param encoded 
 * @returns 
 */
export const decrypt = (salt: string, encoded: string) => {
    const textToChars = (text: any) => text.split("").map((c: any) => c.charCodeAt(0));
    const applySaltToChar = (code: any) => textToChars(salt).reduce((a: any, b: any) => a ^ b, code);
    //@ts-ignore
    return encoded
      .match(/.{1,2}/g)
      .map((hex) => parseInt(hex, 16))
      .map(applySaltToChar)
      .map((charCode) => String.fromCharCode(charCode))
      .join("");
};