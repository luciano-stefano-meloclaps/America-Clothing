import { useNavigate } from 'react-router-dom';

const NotFound = () => {
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
        color: '#333',
        textAlign: 'center',
        padding: '20px',
        backgroundColor: '#f8f8f8',
      }}
    >
      <h1 style={{ fontSize: '4rem', fontWeight: 'bold' }}>404</h1>
      <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>Página No Encontrada</h2>
      <p style={{ fontSize: '1.2rem', marginBottom: '30px' }}>La página que buscas no existe o ha sido movida.</p>
      <button
        onClick={handleRedirect}
        style={{
          padding: '10px 20px',
          fontSize: '1rem',
          cursor: 'pointer',
          borderRadius: '5px',
          backgroundColor: '#333',
          color: 'white',
          border: 'none',
        }}
      >
        Volver a la página principal
      </button>
    </div>
  );
};

export default NotFound;