import React from 'react';
import Tarjetas from '../components/Tarjetas'; 



function Bienvenida() {
  const [irATarjetas, setIrATarjetas] = React.useState(false);

  
  if (irATarjetas) {
    return <Tarjetas />;
  }

  
  const styles = {
    contenedorPrincipal: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 'calc(100vh - 60px)', 
      padding: '40px 20px',
      textAlign: 'center',
      backgroundColor: '#E6F2F2', 
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
      color: '#333', 
    },
   
    titulo: {
      fontSize: 'calc(1.8em + 1.5vw)', // Tamaño de fuente responsive
      color: '#264653', // Un azul oscuro para contraste y seriedad amigable
      marginBottom: '25px',
      fontWeight: 'bold',
      lineHeight: '1.2',
    },
    parrafo: {
      fontSize: 'calc(1em + 0.2vw)', // Tamaño de fuente responsive
      color: '#2A9D8F', // Verde azulado para el texto, armoniza con el fondo
      maxWidth: '700px', // Limita el ancho para mejor legibilidad
      lineHeight: '1.6',
      marginBottom: '40px',
      paddingLeft: '15px',
      paddingRight: '15px',
    },
    botonEmpezar: {
      backgroundColor: '#F4A261', // Un color cálido y acogedor para el botón (contraste)
      color: '#FFFFFF', // Texto blanco para legibilidad sobre el color del botón
      padding: '15px 30px',
      fontSize: 'calc(1em + 0.3vw)', // Tamaño de fuente responsive
      border: 'none',
      borderRadius: '50px', // Botón completamente redondeado, más amigable
      cursor: 'pointer',
      textDecoration: 'none',
      boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.15)', // Sombra más pronunciada para destacar
      transition: 'transform 0.2s ease-out, backgroundColor 0.3s ease',
      fontWeight: '600',
    },
    // Efecto hover simulado (opcional, pero mejora la UX)
    // Este estado se manejará directamente en el botón con onMouseEnter/onMouseLeave
  };

  // --- JSX del Componente ---
  return (
    <div style={styles.contenedorPrincipal}>
      {/*
      Descomenta esto si quieres añadir un logo o icono:
      <div style={styles.logoContainer}>
        <FaBrain style={styles.logoIcon} />
      </div>
      */}

      <h1 style={styles.titulo}>
        Bienvenido a MenteSana
      </h1>
      <p style={styles.parrafo}>
        Esta plataforma está diseñada para acompañarte en el camino hacia una
        mejor salud mental, especialmente pensada para estudiantes de ingeniería en sistemas.
        Aquí encontrarás recursos, ejercicios y preguntas que te ayudarán a conocerte
        mejor y gestionar tu bienestar emocional.
      </p>
      <button
        style={styles.botonEmpezar}
        onClick={() => setIrATarjetas(true)}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#E76F51'; // Un naranja más oscuro al pasar el mouse
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = styles.botonEmpezar.backgroundColor;
          e.currentTarget.style.transform = 'scale(1)';
        }}
        onFocus={(e) => { // Estilo para accesibilidad (foco con teclado)
            e.currentTarget.style.outline = '2px solid #264653';
            e.currentTarget.style.outlineOffset = '2px';
        }}
        onBlur={(e) => {
            e.currentTarget.style.outline = 'none';
        }}
      >
        Empezar autoevaluación
      </button>
    </div>
  );
}

export default Bienvenida;