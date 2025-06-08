import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../api/users';

const UserCreatePage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [globalError, setGlobalError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    setGlobalError(null);
    setFieldErrors({});

    try {
      await createUser({ name, email });
      alert(`Usuário "${name}" criado com sucesso!`);
      navigate('/users');
    } catch (err) {
        if (err.response && err.response.data) {
            const { data: {data}, status } = err.response;

            if (status === 400 && (data.name || data.email)) {
                setFieldErrors(data);
                setGlobalError('Por favor, corrija os erros no formulário.');
            } else {
                setGlobalError(data.message || 'Ocorreu um erro inesperado ao criar o usuário.');
            }
        } else {
            setGlobalError('Erro de conexão ou servidor indisponível.');
        }
        console.error('Erro ao criar usuário:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white shadow-md rounded-lg max-w-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Adicionar usuário
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Nome:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              fieldErrors.name ? 'border-red-500' : ''
            }`}
          />
          {fieldErrors.name && (
            <p className="text-red-500 text-xs italic mt-1">
              {fieldErrors.name[0]}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              fieldErrors.email ? 'border-red-500' : ''
            }`}
          />
          {fieldErrors.email && (
            <p className="text-red-500 text-xs italic mt-1">
              {fieldErrors.email[0]}
            </p>
          )}
        </div>
        
        {globalError && (
          <p className="text-red-500 text-sm text-center font-semibold">{globalError}</p>
        )}

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={loading}
          >
            {loading ? 'Salvando...' : 'Salvar'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/users')}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={loading}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserCreatePage;