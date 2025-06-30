'use client'
import { IUser } from "@/interfaces/users";
import { getUsers } from "@/services/users";
import { useEffect, useState } from "react";
import './style.css'


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


  // Card Info User
  const [cardVisible, setCardVisible] = useState(false)

  const handleClickMore = () => {
    setCardVisible(!cardVisible)
  }


  // Implementando Busca
  const [search, setSearch] = useState('')

  const userFilter = users.filter((user) =>
    user.firstName.toLowerCase().includes(search.toLowerCase())
  );

  // Se os usuarios não forem encontrados
  if (userFilter.length === 0) {
    console.log("Usuário não encontrado");
  } else {
    console.log("Usuários encontrados:", userFilter);
  }




  return (
    <div className="flex flex-col justify-center items-center gap-10">

      <div className="bg-white w-full text-black flex justify-between p-2">
        <h1 className="text-2xl">Usuários</h1>

        <div className="input-group">

          <div className="input-icon">
            <img
              className="w-6 h-6"
              src="./img/search.png" alt="" />
          </div>

          <input
            value={search}
            // Implementação de evento quando for alterado o valor
            onChange={(ev) => setSearch(ev.target.value)}
            id="search"
            placeholder="Search user"
            type="text" />
        </div>

      </div>


      <div className="grid grid-cols-2 gap-10">

        {userFilter.length === 0 ? (
          <p>User not found</p>
        ) :
          userFilter?.map((user) => (
            <div
              className="bg-white h-45 w-100 flex flex-col  text-black rounded-lg justify-center items-center"
              key={user.id}>

              <div
                id="container"
                className="flex justify-start gap-2">

                <div className="container-img">
                  <img
                    src={user.image} alt="" />
                </div>

                <div className="flex flex-col gap-2">

                  <div className="flex gap-2 text-2xl">
                    <h1>{user.firstName}</h1>
                    <h1>{user.lastName}</h1>
                  </div>

                  <h1>{user.phone}</h1>
                  <h1 className="text-sm">{user.email}</h1>

                  <button
                    onClick={handleClickMore}
                    id="buttonCard"
                    className="bg-gray-300 rounded-2xl text-white w-[50%] text-sm">
                    {cardVisible ? 'Fechar' : 'Exibir Perfil'}

                  </button>

                  {cardVisible && (
                    <div
                      id="cardInfo">
                      <img
                        className="h-5 w-5"
                        src="./img/location.png" alt="" />
                      <p>oi</p>
                    </div>
                  )}



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
