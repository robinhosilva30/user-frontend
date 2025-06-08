import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUsers, deleteUser } from '../../api/users';

const UserListPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      setError('Erro ao carregar usuários. Tente novamente mais tarde.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Tem certeza que deseja deletar o usuário "${name}"?`)) {
      try {
        await deleteUser(id);
        alert(`Usuário "${name}" deletado com sucesso!`);
        fetchUsers();
      } catch (err) {
        setError('Erro ao deletar usuário. Tente novamente.');
        console.error(err);
      }
    }
  };

  if (loading) {
    return (
      <div className="text-center text-lg font-semibold text-gray-700">
        Carregando usuários...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 text-lg font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Lista de Usuários
      </h1>
      <div className="mb-4 text-right">
        <Link to="/users/create">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            + Adicionar usuário
          </button>
        </Link>
      </div>
      {users.length === 0 ? (
        <p className="text-center text-gray-600">Nenhum usuário encontrado.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {users.map((user) => (
            <li
              key={user.id}
              className="py-4 flex items-center justify-between"
            >
              <Link to={`/users/${user.id}`} className="flex-grow">
                <p className="text-lg font-semibold text-gray-900">
                  {user.name}
                </p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </Link>
              <button
                onClick={() => handleDelete(user.id, user.name)}
                className="ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm focus:outline-none focus:shadow-outline"
              >
                Excluir
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserListPage;