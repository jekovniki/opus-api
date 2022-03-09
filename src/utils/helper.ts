/**
 * Helper function for transforming two arrays into key: value object
 * @param keyArray 
 * @param valueArray 
 * @returns {key: value}
 */
export function convertToObject(keyArray:Array<string>, valueArray:Array<any>) {
    if (keyArray.length != valueArray.length || keyArray.length === 0 || valueArray.length === 0) {
        return null;
    }

    return Object.assign(keyArray.map((key, index) => ({
        [key]: valueArray[index]})
        )
    );
}