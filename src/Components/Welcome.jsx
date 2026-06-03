

export default function Welcome({ userName, role }) {
  return (
    <div>
      <h1>Welcome to the React App {userName}</h1>
      <p className="text-gray-600 mt-2">Rol: {role}</p>
    </div>
  )
}
