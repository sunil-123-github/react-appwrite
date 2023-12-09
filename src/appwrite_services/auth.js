import conf from "../appwrite_config/config";
import { Client, Account, ID } from "appwrite";

export class AuthService {

    clinet = new Client();
    account;
    
    constructor() {
        this.clinet
        .setEndpoint(conf.aw_URL)
        .setProject(conf.aw_ProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            
            if (userAccount) {
                // Call Another Method      
             return this.LogIn(email, password);
            }
            else {
                return userAccount;
            }

        }
        catch (error) {
            throw error;
        }
    }



    async LogIn({ email, password }) {

        try {
            return await this.account.createEmailSession(email, password);
        }

        catch (error) {
            throw error;
        }

    }

    async getAccount() {
        try {    
            return await this.account.get();
        }
        catch (error) {
           
           throw error;

        }
      return null
    }
  

    async LogOut() {
        try {
            this.account.deleteSessions();
        }
        catch (error) {
            throw error;
        }

    }
}

const authService = new AuthService();

export default authService;
