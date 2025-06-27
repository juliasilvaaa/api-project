'use client'
import { IUser } from "@/interfaces/users";
import { getUsers } from "@/services/users";
import { useEffect, useState } from "react";


export default function Home() {

  const [users, setUsers] = useState<IUser[]>([])

  const [skip, setSkip] = useState<number>(0)

  const [loading, setLoading] = useState<boolean>(false)

  const limit = 4

  const loadUsers = () => {
    setLoading(true)

    let skipValue = 0

    if (users.length > 0) {
      skipValue = skip + limit
    }
    getUsers(limit, skipValue).then((response) => {

      if (response) setUsers([...users, ...response])

      setSkip(skipValue)

      // Independente de ter carregado ou não, no FINAL da execução ele vai parar de carregar
    }).finally(() => setLoading(false))
  }

  const handleLoadMoreClick = () => {
    loadUsers()
    console.log(skip)
  }

  useEffect(() => {
    loadUsers()
  }, [])


  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <h1 className="text-2xl">Usuários</h1>

      <div className="grid grid-cols-2 gap-10">
        {users?.map((user) => (
          <div
            className="bg-white h-45 w-100 flex flex-col  text-black rounded-lg p-4"
            key={user.id}>

            <div
              id="container-img"
              className="flex justify-start gap-2">

              <img
                className=""
                src={user.image} alt="" />
              <div className="flex flex-col gap-2">

                <div className="flex gap-2 text-2xl">
                  <h1>{user.firstName}</h1>
                  <h1>{user.lastName}</h1>
                </div>

                <h1>{user.phone}</h1>
                <h1 className="text-sm">{user.email}</h1>

                <button className="bg-gray-300 rounded-2xl text-white w-[50%] text-sm">
                  Exibir Perfil
                </button>
              </div>

            </div>


          </div>
        ))}


      </div>

      <button
        onClick={handleLoadMoreClick}
        className="bg-red-400 rounded-2xl h-auto w-fit p-4 mx-auto ">
        {loading ? 'Carregando...' : 'Carregar Mais'}
      </button>




    </div>
  );
}
