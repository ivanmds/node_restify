const users = [
    { id: 1, name: 'Ivan Meireles', email: 'ivanmds2@hotmail.com' },
    { id: 2, name: 'Isa Meireles', email: 'isa@hotmail.com' }
];

export class User {
    static findAll(): Promise<any[]> {
        return Promise.resolve(users);
    }

    static findById(id: Number): Promise<any> {
        let user = users.filter(user => user.id == id);
        return Promise.resolve(user);
    }
}