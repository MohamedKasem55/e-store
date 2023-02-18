
export class User {
    constructor(
        public username:string,
        public isAdmin:boolean,
        private _token:string,
        private tokenExpirationDate:Date

        ){

    }
    public get token():string{
        if(!this._token||this.tokenExpirationDate< new Date())
        return null;
        else
        return this._token;
    }
}
