import csv from 'csv-parser';
import fs from 'node:fs';

class CSV {
	constructor() {}

	loadCSV(path:string): Promise<any[]> {
		return new Promise((resolve, reject) => {
			const results:any[] = [];
			try {
				fs.createReadStream(path)
				  .pipe(csv())
				  .on('data', (data) => results.push(data))
				  .on('end', () => {
				    resolve(results);
				  });
			} catch (err) {
				reject(err);
			}
		});
	}
}

const csvReader = new CSV();
export default csvReader;
