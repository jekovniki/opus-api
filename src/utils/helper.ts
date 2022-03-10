/**
 * Helper function for transforming two arrays into key: value object
 * @param keyArray 
 * @param valueArray 
 * @returns {key: value}
 */
export function convertToObject(keyArray:Array<string>, valueArray:Array<any>) {

    return valueArray.map((row) => {
        return row.reduce((result: any, field: any, index: number) => {
          result[keyArray[index]] = field;
          return result
        }, {});
   });
}