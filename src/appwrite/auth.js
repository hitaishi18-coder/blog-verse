// Appwrite ke config file ko import kar rahe hain (isme URL, Project ID wagaira stored hain)
import config from "./../config/config";  

// Appwrite SDK se Client, Account aur ID import kar rahe hain
import { Client, Account, ID } from "appwrite";

// AuthService class bana rahe hain jisme signup, login, logout, aur user fetch ka code hoga
export class AuthService {
  client = new Client();  // Appwrite client ka ek naya instance
  account;                // Account object store karne ke liye variable

  constructor() {
    //  Client ko initialize kar rahe hain Appwrite ke endpoint aur project ID ke sath
    this.client
      .setEndpoint(config.appwriteUrl)         // Appwrite server ka endpoint (URL)
      .setProject(config.appwriteProjectId);   // Project ID set kar rahe hain

    //  Account service ko initialize kar rahe hain client ke sath
    this.account = new Account(this.client);
  }

  // Naya user create karne ka function (Signup)
  async createAccount({ email, password, name }) {
    try {
      // Appwrite ke through ek naya user account create kar rahe hain
      const userAccount = await this.account.create(
        ID.unique(),  // Har user ke liye unique ID generate karega
        email,
        password,
        name
      );

      return userAccount;  // Success hone par userAccount return karega
    } catch (error) {
      console.error("Appwrite createAccount error:", error); // Error console me print
      throw error; // aur error ko aage pass kar dete hain
    }
  }

  //  User login karne ka function (Session create karta hai)
  async login({ email, password }) {
    try {
      // Email aur password ke sath login session create kar rahe hain
      const session = await this.account.createEmailPasswordSession(email, password);
      return session;  // Agar login success hua to session return karega
    } catch (error) {
      console.error("Appwrite login error:", error); // Login error print
      throw error;
    }
  }

  //  Current logged-in user ko fetch karne ka function
  async getCurrentUser() {
    try {
      // Agar user logged-in hai to uska data return karega
      return await this.account.get();
    } catch (error) {
      console.error("Appwrite getCurrentUser error:", error);
      return null; // Agar koi error aayi to null return kar do
    }
  }

  // Logout karne ka function (active sessions delete karta hai)
  async logout() {
    try {
      await this.account.deleteSessions(); // Sabhi sessions ko delete kar deta hai
    } catch (error) {
      console.error("Appwrite logout error:", error); // Logout error print karte hain
    }
  }
}

// AuthService ka ek instance bana kar export kar rahe hain taaki kahin bhi use kar sakein
const authService = new AuthService();
export default authService;
