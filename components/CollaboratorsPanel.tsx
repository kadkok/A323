
import React, { useState } from 'react';
import { Project, Permission } from '../types';

interface CollaboratorsPanelProps {
  project: Project;
  onInvite: (email: string, permission: Permission) => void;
  onClose: () => void;
}

const CollaboratorsPanel: React.FC<CollaboratorsPanelProps> = ({ project, onInvite, onClose }) => {
  const [email, setEmail] = useState('');
  const [permission, setPermission] = useState<Permission>('viewer');

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[2500] flex items-center justify-center p-4">
      <div className="bg-[#0f1115] border border-[#d4af37]/30 w-full max-w-lg p-6 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-cinzel text-[#d4af37] text-lg">Colaboradores do Projeto</h3>
          <button onClick={onClose} className="text-white text-2xl hover:text-red-500">&times;</button>
        </div>

        <div className="mb-8 p-4 bg-white/5 border border-white/5">
          <label className="block text-[10px] text-[#b87333] uppercase font-bold mb-2">Convidar via E-mail</label>
          <div className="flex gap-2">
            <input 
              type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="email@exemplo.com"
              className="flex-1 bg-[#1a1d23] border border-white/10 p-2 text-sm text-white"
            />
            <select 
              value={permission} onChange={e => setPermission(e.target.value as Permission)}
              className="bg-[#1a1d23] border border-white/10 text-white text-xs p-2"
            >
              <option value="viewer">Ver</option>
              <option value="editor">Editar</option>
            </select>
            <button 
              onClick={() => { onInvite(email, permission); setEmail(''); }}
              className="bg-[#d4af37] text-black text-xs font-bold px-4"
            >
              ADD
            </button>
          </div>
        </div>

        <div className="space-y-2 max-h-[300px] overflow-y-auto">
          {project.collaborators.map(c => (
            <div key={c.email} className="flex justify-between items-center p-3 border border-white/5 hover:bg-white/5 transition-colors">
              <div>
                <p className="text-sm text-white font-semibold">{c.email}</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">{c.permission}</p>
              </div>
              {c.permission === 'owner' && <span className="text-[#d4af37] text-[10px] font-bold italic">PROPRIETÁRIO</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollaboratorsPanel;
