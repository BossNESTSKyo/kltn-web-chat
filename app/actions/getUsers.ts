import prisma from "@/app/libs/prismadb";
import getSession from "./getSession";

const getUsers = async () => {
  const session = await getSession();

  if (!session?.user?.email) {
    return [];
  }

  try {
    if (session.user.name === "Admin" && session.user.email === "admin@gmail.com"){
      const users = await prisma.user.findMany({
        orderBy: {
          createdAt: 'desc'
        },
        where: {
          NOT: {
            email: session.user.email
          }
        }
      });

      return users;
    } 
      
    const user = await prisma.user.findMany({
        where: {
          name: "Admin",
          email: "admin@gmail.com"
        }
    });

    return user;
  } catch (error: any) {
    return [];
  }
};

export default getUsers;
