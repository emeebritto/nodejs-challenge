export const mergeDuplicate = (list:any[]) => [...new Set(list)];

export const count = (list:any[], fn: ((s:any) => any)) => {
	let counter = 0;
	for (let i=0; i < list.length; i++) {
		if(fn(list[i])) counter++;
	}
	return counter;
}

export const formatListName = (listName:string): string => {
	return listName.trim().replaceAll(/\s/g, ".").toLowerCase();
}