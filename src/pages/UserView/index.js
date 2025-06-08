// src/pages/UserView/index.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserById, getEnrichedDataByUUID } from '../../api/users';

const UserViewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [enrichedUser, setEnrichedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError(null);

        const userData = await getUserById(id);
        if (userData) {
            setUser(userData);

            if (userData.uuid) {
                try {
                    const enrichedData = await getEnrichedDataByUUID(userData.uuid);
                    setEnrichedUser(enrichedData);
                } catch (enrichedErr) {
                    console.warn(`Dados enriquecidos não encontrados ou erro ao buscar para UUID ${userData.uuid}:`, enrichedErr);
                    setEnrichedUser(null);
                }
            }

        }
      } catch (err) {
        if (err.response && err.response.status === 404) {
            setError(err.response.data.message || 'Usuário não encontrado.');
        } else {
            setError('Erro ao carregar os detalhes do usuário.');
        }
        console.error('Erro na busca principal do usuário:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center text-lg font-semibold text-gray-700">
        Carregando detalhes do usuário...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 text-lg font-semibold">
        <p>
            {error}
        </p>
        <button
          onClick={() => navigate('/users')}
          className="mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Voltar para a lista
        </button>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center text-gray-600">
        Usuário não encontrado.
        <button
          onClick={() => navigate('/users')}
          className="mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Voltar para a lista
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-lg max-w-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Detalhes do Usuário
      </h1>

      {/* Dados Básicos do Usuário */}
      <div className="bg-gray-50 p-4 rounded-md mb-6">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Dados Básicos</h2>
        <div className="space-y-2">
          <p className="text-lg">
            <strong className="font-semibold text-gray-700">Nome:</strong>{' '}
            {user.name}
          </p>
          <p className="text-lg">
            <strong className="font-semibold text-gray-700">Email:</strong>{' '}
            {user.email}
          </p>
        </div>
      </div>

      {enrichedUser ? (
        <div className="bg-blue-50 p-4 rounded-md mb-6 border-l-4 border-blue-500">
          <h2 className="text-xl font-bold text-blue-700 mb-4">Dados sociais</h2>
          <div className="space-y-2">
            {enrichedUser.linkedin && (
                <p className="text-lg">
                    <strong className="font-semibold text-blue-700">LinkedIn:</strong>{' '}
                    <a href={enrichedUser.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {enrichedUser.linkedin}
                    </a>
                </p>
            )}
            {enrichedUser.github && (
                <p className="text-lg">
                    <strong className="font-semibold text-blue-700">GitHub:</strong>{' '}
                    <a href={enrichedUser.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {enrichedUser.github}
                    </a>
                </p>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-yellow-50 p-4 rounded-md mb-6 border-l-4 border-yellow-500 text-yellow-800">
          <p className="font-semibold">Dados em processamento ou indisponíveis.</p>
        </div>
      )}

      <div className="mt-8 text-center">
        <button
          onClick={() => navigate('/users')}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Voltar para a lista
        </button>
      </div>
    </div>
  );
};

export default UserViewPage;