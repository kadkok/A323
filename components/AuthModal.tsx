
import React, { useState } from 'react';

interface AuthModalProps {
  onLogin: (user: any) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (!isLogin && !name)) {
      setError('Preencha todos os campos.');
      return;
    }
    
    // Simulate user persistence
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (isLogin) {
      const user = users.find((u: any) => u.email === email && u.password === password);
      if (user) {
        onLogin(user);
      } else {
        setError('Credenciais inválidas.');
      }
    } else {
      if (users.some((u: any) => u.email === email)) {
        setError('Email já cadastrado.');
        return;
      }
      const newUser = { id: Math.random().toString(36).substr(2, 9), email, password, name };
      localStorage.setItem('users', JSON.stringify([...users, newUser]));
      onLogin(newUser);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[3000] flex items-center justify-center p-4">
      <div className="bg-[#0f1115] border border-[#d4af37]/30 w-full max-w-md p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="font-cinzel text-[#d4af37] text-2xl tracking-widest mb-2">
            {isLogin ? 'INGRESSAR' : 'CADASTRAR'}
          </h2>
          <div className="h-px w-12 bg-[#d4af37] mx-auto opacity-50"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-[10px] text-[#b87333] uppercase font-bold tracking-widest mb-1">Nome</label>
              <input 
                type="text" value={name} onChange={e => setName(e.target.value)}
                className="w-full bg-[#1a1d23] border border-white/10 p-3 text-white outline-none focus:border-[#d4af37]"
              />
            </div>
          )}
          <div>
            <label className="block text-[10px] text-[#b87333] uppercase font-bold tracking-widest mb-1">E-mail</label>
            <input 
              type="email" value={email} onChange={e => setEmail(e.target.value)}
              className="w-full bg-[#1a1d23] border border-white/10 p-3 text-white outline-none focus:border-[#d4af37]"
            />
          </div>
          <div>
            <label className="block text-[10px] text-[#b87333] uppercase font-bold tracking-widest mb-1">Senha</label>
            <input 
              type="password" value={password} onChange={e => setPassword(e.target.value)}
              className="w-full bg-[#1a1d23] border border-white/10 p-3 text-white outline-none focus:border-[#d4af37]"
            />
          </div>
          
          {error && <p className="text-red-500 text-[11px] font-bold uppercase tracking-tighter">{error}</p>}

          <button className="w-full bg-[#d4af37] text-black font-bold py-3 mt-4 hover:brightness-110 transition-all uppercase tracking-widest">
            {isLogin ? 'Entrar' : 'Criar Conta'}
          </button>
        </form>

        <button 
          onClick={() => setIsLogin(!isLogin)}
          className="w-full text-center mt-6 text-[10px] text-gray-500 uppercase tracking-widest hover:text-[#d4af37] transition-colors"
        >
          {isLogin ? 'Não possui conta? Cadastre-se' : 'Já possui conta? Ingressar'}
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
