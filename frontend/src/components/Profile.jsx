import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('auth/me/');
        setUser(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке профиля', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) return <div>Загрузка...</div>;
  if (!user) return <div>Не удалось загрузить профиль.</div>;

  return (
    <div>
      <h1>Профиль пользователя</h1>
      <p>Имя пользователя: {user.username}</p>
      <p>Email: {user.email}</p>
      <button onClick={handleLogout}>Выйти</button>
    </div>
  );
};

export default Profile;
