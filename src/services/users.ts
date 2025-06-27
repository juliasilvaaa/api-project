import { IUser } from "@/interfaces/users";

const apiUrl = "https://dummyjson.com/users";


export const getUsers = async (limit: number = 0, skip: number = 0): Promise<IUser[] | undefined> => {

  try {
    const url = `${apiUrl}?limit=${limit}&skip=${skip}`;
    const res = await fetch(url);
    const json = await res.json();

    const users: IUser[] = json.users;

    return users ?? [];
  } catch (err) {
    console.error("Erro ao buscar informações", err);
  }
};
