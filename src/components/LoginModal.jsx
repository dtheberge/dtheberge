import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Lock } from 'lucide-react';

export default function LoginModal({ onSuccess }) {
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await login(username, password);
        if (success) {
            if (onSuccess) onSuccess();
        } else {
            setError(true);
        }
    };

    return (
        <div className="glass-panel" style={{ maxWidth: '400px', margin: '0 auto', padding: '2rem', textAlign: 'center' }}>
            <Lock size={48} style={{ margin: '0 auto 1rem', color: 'var(--text-secondary)' }} />
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Journal Locked</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Please enter your credentials to access.</p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #e5e7eb' }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #e5e7eb' }}
                />

                {error && <span style={{ color: 'red', fontSize: '0.9rem' }}>Invalid credentials</span>}

                <button type="submit" className="btn-primary">Unlock</button>
            </form>
        </div>
    );
}
