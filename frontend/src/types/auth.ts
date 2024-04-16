export interface Login {
	email: string;
	password: string;
}

export interface Register extends Login {
	firstName: string;
	lastName: string;
	birthDate: Date;
}

export interface RegisterFormData {
	firstName?: string;
	lastName?: string;
	email?: string;
	password?: string;
	repeatPassword?: string;
	birthDate?: string;
	accepted?: string;
}

export interface RegisterDTO extends Login {
	firstName: string;
	lastName: string;
	age: number;
}
