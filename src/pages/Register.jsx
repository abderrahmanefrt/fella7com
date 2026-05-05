import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sprout, Briefcase, Tractor, ShoppingCart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import PrivacyPolicyModal from '../components/PrivacyPolicyModal';
import './Auth.css';

export default function Register() {
  const [role, setRole] = useState('agriculteur');
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
    company: '',
    wilaya: ''
  });

  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [privacyError, setPrivacyError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setPrivacyError('');

    if (!acceptedPrivacy) {
      setPrivacyError("Vous devez accepter la charte de confidentialité pour continuer.");
      return;
    }

    // Simulate real registration and instant login
    const newUser = {
      id: 'usr_' + Math.floor(Math.random() * 10000),
      name: formData.name,
      email: formData.email,
      role: role,
      plan: 'freemium',
      itemsCount: 0,
      avatar: formData.avatar || 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
      wilaya: formData.wilaya,
      company: formData.company
    };

    login(newUser);
    navigate('/');
  };

  return (
    <div className="auth-page animate-fade-in">
      <div className="auth-container glass-panel" style={{ maxWidth: '600px' }}>
        <div className="auth-header text-center">
          <Sprout size={48} className="text-primary" style={{ margin: '0 auto var(--spacing-md)' }} />
          <h1>Join fella7com</h1>
          <p className="text-muted">Create your account to start trading</p>
        </div>

        <div className="role-selector">
          <button
            className={`role-btn ${role === 'agriculteur' ? 'active' : ''}`}
            onClick={() => setRole('agriculteur')}
          >
            <Tractor size={24} />
            <span>Farmer / Producer</span>
          </button>

          <button
            className={`role-btn ${role === 'buyer' ? 'active' : ''}`}
            onClick={() => setRole('buyer')}
          >
            <ShoppingCart size={24} />
            <span>Buyer</span>
          </button>

          <button
            className={`role-btn ${role === 'business' ? 'active' : ''}`}
            onClick={() => setRole('business')}
          >
            <Briefcase size={24} />
            <span>Agri-Business</span>
          </button>
        </div>

        <form className="auth-form" onSubmit={handleRegister}>
          <div className="form-group">
            <label>Full Name</label>
            <input name="name" type="text" placeholder="e.g., Ahmed Yassine" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input name="email" type="email" placeholder="e.g., ahmed@example.com" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Profile Picture (URL)</label>
            <input name="avatar" type="url" placeholder="https://..." value={formData.avatar} onChange={handleChange} />
            <small className="text-muted" style={{ display: 'block', marginTop: '4px' }}>Paste an image link. We pre-filled a default avatar for you.</small>
          </div>

          <div className="form-group">
            <label>Password</label>
            <input name="password" type="password" placeholder="Create a password" value={formData.password} onChange={handleChange} required />
          </div>

          {role === 'business' && (
            <div className="form-group">
              <label>Enterprise Name</label>
              <input name="company" type="text" placeholder="e.g., Sarl Agro Equipment" value={formData.company} onChange={handleChange} required />
            </div>
          )}

          <div className="form-group">
            <label>Wilaya</label>
            <select name="wilaya" value={formData.wilaya} onChange={handleChange} required>
              <option value="">Select Wilaya</option>
              <option value="Adrar">01 - Adrar</option>
              <option value="Chlef">02 - Chlef</option>
              <option value="Laghouat">03 - Laghouat</option>
              <option value="Oum El Bouaghi">04 - Oum El Bouaghi</option>
              <option value="Batna">05 - Batna</option>
              <option value="Bejaia">06 - Béjaïa</option>
              <option value="Biskra">07 - Biskra</option>
              <option value="Bechar">08 - Béchar</option>
              <option value="Blida">09 - Blida</option>
              <option value="Bouira">10 - Bouira</option>
              <option value="Tamanrasset">11 - Tamanrasset</option>
              <option value="Tebessa">12 - Tébessa</option>
              <option value="Tlemcen">13 - Tlemcen</option>
              <option value="Tiaret">14 - Tiaret</option>
              <option value="Tizi Ouzou">15 - Tizi Ouzou</option>
              <option value="Algiers">16 - Alger</option>
              <option value="Djelfa">17 - Djelfa</option>
              <option value="Jijel">18 - Jijel</option>
              <option value="Setif">19 - Sétif</option>
              <option value="Saida">20 - Saïda</option>
              <option value="Skikda">21 - Skikda</option>
              <option value="Sidi Bel Abbes">22 - Sidi Bel Abbès</option>
              <option value="Annaba">23 - Annaba</option>
              <option value="Guelma">24 - Guelma</option>
              <option value="Constantine">25 - Constantine</option>
              <option value="Medea">26 - Médéa</option>
              <option value="Mostaganem">27 - Mostaganem</option>
              <option value="MSila">28 - M'Sila</option>
              <option value="Mascara">29 - Mascara</option>
              <option value="Ouargla">30 - Ouargla</option>
              <option value="Oran">31 - Oran</option>
              <option value="El Bayadh">32 - El Bayadh</option>
              <option value="Illizi">33 - Illizi</option>
              <option value="Bordj Bou Arreridj">34 - Bordj Bou Arréridj</option>
              <option value="Boumerdes">35 - Boumerdès</option>
              <option value="El Tarf">36 - El Tarf</option>
              <option value="Tindouf">37 - Tindouf</option>
              <option value="Tissemsilt">38 - Tissemsilt</option>
              <option value="El Oued">39 - El Oued</option>
              <option value="Khenchela">40 - Khenchela</option>
              <option value="Souk Ahras">41 - Souk Ahras</option>
              <option value="Tipaza">42 - Tipaza</option>
              <option value="Mila">43 - Mila</option>
              <option value="Ain Defla">44 - Aïn Defla</option>
              <option value="Naama">45 - Naâma</option>
              <option value="Ain Temouchent">46 - Aïn Témouchent</option>
              <option value="Ghardaia">47 - Ghardaïa</option>
              <option value="Relizane">48 - Relizane</option>
              <option value="Timimoun">49 - Timimoun</option>
              <option value="Bordj Badji Mokhtar">50 - Bordj Badji Mokhtar</option>
              <option value="Ouled Djellal">51 - Ouled Djellal</option>
              <option value="Beni Abbes">52 - Béni Abbès</option>
              <option value="In Salah">53 - In Salah</option>
              <option value="In Guezzam">54 - In Guezzam</option>
              <option value="Touggourt">55 - Touggourt</option>
              <option value="Djanet">56 - Djanet</option>
              <option value="El MGhair">57 - El M'Ghair</option>
              <option value="El Meniaa">58 - El Meniaa</option>
              <option value="Aflou">59 - Aflou</option>
              <option value="Barika">60 - Barika</option>
              <option value="El Kantara">61 - El Kantara</option>
              <option value="Bir El Ater">62 - Bir El Ater</option>
              <option value="El Aricha">63 - El Aricha</option>
              <option value="Ksar Chellala">64 - Ksar Chellala</option>
              <option value="Ain Oussera">65 - Aïn Oussera</option>
              <option value="Messaad">66 - Messaad</option>
              <option value="Ksar El Boukhari">67 - Ksar El Boukhari</option>
              <option value="Bou Saada">68 - Bou Saâda</option>
              <option value="El Abiodh Sidi Cheikh">69 - El Abiodh Sidi Cheikh</option>
            </select>
          </div>

          <div className="privacy-accept-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={acceptedPrivacy}
                onChange={(e) => setAcceptedPrivacy(e.target.checked)}
              />
              J'accepte la{' '}
              <button
                type="button"
                className="text-primary privacy-link-btn"
                onClick={() => setShowPrivacyModal(true)}
              >
                charte de confidentialité
              </button>
            </label>
          </div>

          {privacyError && <div className="text-danger" style={{fontSize: '0.82rem', textAlign: 'center'}}>{privacyError}</div>}

          <button
            type="submit"
            className={`btn-primary full-width auth-btn ${!acceptedPrivacy ? 'btn-disabled' : ''}`}
            style={{ marginTop: 'var(--spacing-md)' }}
            disabled={!acceptedPrivacy}
          >
            Create Account
          </button>
        </form>

        <div className="auth-footer text-center">
          Already have an account? <Link to="/login" className="text-primary font-bold">Log in</Link>
        </div>
      </div>

      <PrivacyPolicyModal
        isOpen={showPrivacyModal}
        onClose={() => setShowPrivacyModal(false)}
        mode="auth"
      />
    </div>
  );
}
