import {type AuthOptions} from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import LinkedinProvider from "next-auth/providers/linkedin"
import GithubProvider from "next-auth/providers/github"
export const authOptions : AuthOptions={
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID as string,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        LinkedinProvider({
            clientId:process.env.LINKEDIN_CLIENT_ID as string,
            clientSecret:process.env.LINKEDIN_CLIENT_SECRET as string,
            authorization: {
                params: {
                  scope: 'r_liteprofile r_emailaddress w_member_social',
                },
              },
        }),
        GithubProvider({
            clientId:process.env.GITHUB_CLIENT_ID as string,
            clientSecret:process.env.GITHUB_CLIENT_SECRET as string,
        }),    ],
    session :{
        strategy :"jwt",
        maxAge : 1 *24 *60 * 60 , // 1 day
    },
    jwt :{
        //jwt
    },
    callbacks:{
        // sign in
    },
    secret:process.env.NEXTAUTH_SECRET,
    // pages :{
    //     signIn: "/Login"
    // }
    
};
