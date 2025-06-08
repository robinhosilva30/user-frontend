// src/api/users.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost/api';
const API_ENRICHED_BASE_URL = 'http://localhost:3001/api';

const usersApi = axios.create({
  baseURL: API_BASE_URL,
});

const enrichedDataApi = axios.create({
  baseURL: API_ENRICHED_BASE_URL,
});

export const getUsers = async () => {
  try {
    const response = await usersApi.get('/users');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    throw error;
  }
};

export const getUserById = async (id) => {
  try {
    const response = await usersApi.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar usuário com ID ${id}:`, error);
    throw error;
  }
};

export const createUser = async (userData) => {
  try {
    const response = await usersApi.post('/users', userData);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    await usersApi.delete(`/users/${id}`);
  } catch (error) {
    console.error(`Erro ao deletar usuário com ID ${id}:`, error);
    throw error;
  }
};

export const updateUser = async (id, userData) => {
  try {
    const response = await usersApi.put(`/users/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar usuário com ID ${id}:`, error);
    throw error;
  }
};

export const getEnrichedDataByUUID = async (uuid) => {
  try {
    const response = await enrichedDataApi.get(`/users/enriched/${uuid}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar detalhes do usuário`, error);
    throw error;
  }
};