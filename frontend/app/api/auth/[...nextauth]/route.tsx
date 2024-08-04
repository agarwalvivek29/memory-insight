import NextAuth, { TokenSet } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { prisma } from "@/app/db/dbConnect"
import { Session } from "next-auth";

// Define the extended user type
type ExtendedSessionUser = {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  username?: string | null;
};

// Define the extended session type
type ExtendedSession = Session & {
  user: ExtendedSessionUser;
};

const handler = NextAuth({
  providers: [
      GoogleProvider({
        clientId : process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        
      }),
  ],
  secret: process.env.JWT_SECRET,
  callbacks: {
    jwt: async ({token, user, account, profile}) => {
      console.log("JWT Callback");

      const existingUser = await prisma.user.findFirst({
        where: {
          username: token.email as string
        }
      });

      if(existingUser){
        console.log("User Exists");
        console.log(existingUser);
        token.id = existingUser.id;
      }

      if (!existingUser) {
        const newuser = await prisma.user.create({
          data: {
            username: token.email as string,
            name: token.name as string,
            image: token.picture as string,
            authentication : "google"
          }
        });
        console.log("New User Created");
        console.log(newuser);
        token.id = newuser.id;
      }
      
      token.image = token.picture;
      token.username = token.email;
      return token;
    },
    session: async ({session, token}:{
      session: Session;
      token: TokenSet;
    }):Promise<ExtendedSession> => {

      if (session.user) {
        session.user = {
          ...session.user,
          id: token.id as string,
          username: (token as any).username || token.email || null,
        } as ExtendedSessionUser;
      }  
      return session as ExtendedSession;
    }
  }
});

export { handler as GET, handler as POST };