export interface User {
	idUser: number;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	dni: string;
	age: number;
	credits: number;
}

export interface UpdateUserDTO
	extends Omit<User, 'idUser' | 'age' | 'email' | 'credits'> {}
