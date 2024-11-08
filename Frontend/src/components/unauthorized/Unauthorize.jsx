import { useNavigate } from 'react-router-dom';
import backgroundImage from "../../assets/pexels-technobulka-7375091.jpg";

const Unauthorized = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/'); 
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        textAlign: 'center',
        padding: '20px',
      }}
    >
      <h1 style={{ fontSize: '3rem', fontWeight: 'bold' }}>401 - No autorizado</h1>
      <p style={{ fontSize: '1.5rem' }}>No tienes permiso para acceder a esta página.</p>
      <button
        onClick={handleRedirect}
        style={{
          marginTop: '20px',
          padding: '15px 25px',
          fontSize: '1.2rem',
          cursor: 'pointer',
          borderRadius: '8px',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          color: '#333',
          border: 'none',
        }}
      >
        Redirigirse a la página principal
      </button>
    </div>
  );
};

export default Unauthorized;