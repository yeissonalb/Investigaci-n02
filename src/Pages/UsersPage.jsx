import UsersList from '../Components/UsersList'
import AddUserButton from '../Components/AddUserButton'
import { useQuery } from '@tanstack/react-query'
import { fetchLibraries } from '../Services/LibrariesService'

const UsersPage = () => {
  const {
    data: libraries,
    isLoading: librariesLoading,
    isError: librariesError,
  } = useQuery({
    queryKey: ['libraries'],
    queryFn: fetchLibraries,
  })

  return (
    <div className="p-4">
      <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <h2 className="text-lg font-semibold text-green-800">API protegida (JWT)</h2>
        {librariesLoading && <p className="text-sm text-green-700">Cargando bibliotecas...</p>}
        {librariesError && (
          <p className="text-sm text-red-600">Error al acceder al endpoint protegido</p>
        )}
        {libraries && (
          <p className="text-sm text-green-700">
            Bibliotecas obtenidas con Bearer token: {libraries.length}
          </p>
        )}
      </div>

      <AddUserButton />
      <UsersList />
    </div>
  )
}

export default UsersPage
