import csv from 'csv-parser';
import fs from 'node:fs';

class CSVReader {
	static loadCSV(path:string): Promise<any[]> {
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

export default CSVReader;
