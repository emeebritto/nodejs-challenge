export interface ContactFromDB {
	vid:number;
	firstname: { value:string };
	lastname: { value:string };
	email: { value:string };
	gender: { value:string };
}

export interface ContactProps {
	vid?:number;
	firstname:string;
	lastname:string;
	email:string;
	gender:string;
}

export interface Domain {
	domain:string;
	quantity:number;
}