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

/**
 * The method check which current season are we. It is used for the fetching images from unsplash.
 * @returns name
 */
export function currentSeason() {
  const today = new Date();
  const todayFormat = `${today.getMonth()}/${today.getDate()}/${today.getFullYear()}`
  const d = new Date(todayFormat);

  var seasonArray = [
      {name: 'Spring', date: new Date(d.getFullYear(),2,(d.getFullYear() % 4 === 0) ? 19 : 20).getTime()},
      {name: 'Summer', date: new Date(d.getFullYear(),5,(d.getFullYear() % 4 === 0) ? 20 : 21).getTime()},
      {name: 'Autumn', date: new Date(d.getFullYear(),8,(d.getFullYear() % 4 === 0) ? 22 : 23).getTime()},
      {name: 'Winter', date: new Date(d.getFullYear(),11,(d.getFullYear() % 4 === 0) ? 20 : 21).getTime()}
  ];
  
  const season = seasonArray.filter(({ date }) => date as any <= d).slice(-1)[0] || {name: "Winter"};

  return season.name;
}