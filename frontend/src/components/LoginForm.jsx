import { useState } from 'react';
import api from '../api/axios';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('login/', {
        username,
        password,
      });
      setMessage('Вход выполнен успешно!');
      console.log(response.data);
      // Здесь можно добавить логику сохранения токена, например:
      // localStorage.setItem('token', response.data.token);
    } catch (error) {
      setMessage('Ошибка при входе. Проверьте данные.');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Вход</h2>
      <div>
        <label>Имя пользователя:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Пароль:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Войти</button>
      {message && <p>{message}</p>}
    </form>
  );
}

export default LoginForm;
