import React, { useState } from 'react';
// Podrías importar un ícono si lo deseas, por ejemplo:
// import { FaUserLock } from 'react-icons/fa';

function Login({ onLogin }) {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState(''); // Para manejar mensajes de error

  // --- Paleta de colores y fuentes (similar a Bienvenida.jsx y Tarjetas.jsx) ---
  const palette = {
    fondoClaro: '#E6F2F2',      // Verde azulado muy pálido
    textoPrincipal: '#264653',  // Azul oscuro/petróleo
    textoSecundario: '#2A9D8F', // Verde azulado
    acento: '#F4A261',          // Naranja
    acentoHover: '#E76F51',     // Naranja más oscuro
    blanco: '#FFFFFF',
    grisClaro: '#D1D5DB',       // Para bordes o fondos sutiles
    grisMedio: '#6B7280',
    errorRojo: '#D9534F',       // Rojo para mensajes de error
  };

  // --- Estilos en línea ---
  const styles = {
    contenedorPrincipal: { // Estilo para el div que envuelve todo
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 'calc(100vh - 60px)', // Ajusta si tienes navbar
      padding: '20px', // Padding general
      backgroundColor: palette.fondoClaro,
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    },
    tarjetaLogin: {
      backgroundColor: palette.blanco,
      padding: '30px 25px', // Padding interno de la tarjeta
      borderRadius: '12px',
      boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '400px',
      textAlign: 'center', // Mantenemos tu textAlign: 'center' original para el div interno
    },
    // logoContainer: { // Opcional para un icono
    //   marginBottom: '20px',
    //   fontSize: '48px',
    //   color: palette.textoPrincipal,
    // },
    tituloPrincipal: { // Para "Inicia Secion"
      fontSize: 'calc(1.8em + 1vw)',
      color: palette.textoPrincipal,
      marginBottom: '15px',
      fontWeight: 'bold',
    },
    tituloMocos: { // Para "Mocos"
      fontSize: '1.3em', // Un poco más pequeño
      color: palette.textoSecundario, // Un color diferente para distinguirlo
      marginBottom: '25px',
      fontWeight: 'normal',
    },
    formulario: {
      marginTop: '20px', // Espacio encima del formulario
    },
    input: {
      width: 'calc(100% - 30px)', // Hacemos que ocupe casi todo el ancho menos padding
      padding: '12px 15px',
      fontSize: '1em',
      border: `1px solid ${palette.grisClaro}`,
      borderRadius: '8px',
      boxSizing: 'border-box',
      marginBottom: '10px', // Reemplaza el efecto de <br />
      transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
      display: 'block', // Para que cada input ocupe su línea
      marginLeft: 'auto', // Centrar el input si es más pequeño que el contenedor
      marginRight: 'auto',
    },
    // Para simular el foco
    inputFocus: { // Este estilo se aplicaría con onFocus/onBlur
      borderColor: palette.acento,
      boxShadow: `0 0 0 3px ${palette.acento}40`,
    },
    botonSubmit: {
      backgroundColor: palette.acento,
      color: palette.blanco,
      padding: '12px 30px',
      fontSize: '1.1em',
      border: 'none',
      borderRadius: '25px',
      cursor: 'pointer',
      fontWeight: '600',
      transition: 'background-color 0.3s ease, transform 0.2s ease',
      marginTop: '20px', // Reemplaza el marginTop original y el efecto del <br />
    },
    mensajeError: {
      color: palette.errorRojo,
      fontSize: '0.9em',
      marginTop: '15px',
      minHeight: '1.2em', // Para evitar saltos cuando no hay error
    }
  };

  // --- Lógica de Foco para Inputs ---
  const handleFocus = (e) => {
    e.target.style.borderColor = palette.acento;
    e.target.style.boxShadow = `0 0 0 3px ${palette.acento}40`;
  };

  const handleBlur = (e) => {
    e.target.style.borderColor = palette.grisClaro;
    e.target.style.boxShadow = 'none';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // Limpiar errores previos

    // Aquí puedes agregar validaciones o conexión futura al backend
    if (usuario.trim() && contrasena.trim()) {
      onLogin();
    } else {
      // Usamos el estado de error en lugar de alert
      setError('Por favor, completa todos los campos');
    }
  };

  //Aqui esta la cagada que acabo de hacer
  // (No hay código aquí, así que no hay nada que estilizar o quitar)
  //Fin de la cagada que hice

  return (
    // Aplicamos el estilo al div principal que centra todo
    <div style={styles.contenedorPrincipal}>
      {/* Este div interno mantiene tu estructura original, pero ahora tiene estilos de "tarjeta" */}
      <div style={{ ...styles.tarjetaLogin, marginTop: '50px' /* Ajusta este margen si el de 100px original es mucho */ }}>
        {/* <div style={styles.logoContainer}>
          <FaUserLock />
        </div> */}
        <h2 style={styles.tituloPrincipal}>Inicia Sesion</h2>
        <h2 style={styles.tituloMocos}>Por favor registrate</h2> {/* Mantenemos "Mocos" con su propio estilo */}
        <form onSubmit={handleSubmit} style={styles.formulario}>
          <input
            type="text"
            placeholder="Usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            style={styles.input} // Aplicamos estilo al input
            onFocus={handleFocus}
            onBlur={handleBlur}
            aria-required="true"
          />
          {/* Los <br /> se mantienen, aunque el estilo de input con display:block y marginBottom ya los hace innecesarios */}
          <br /><br />
          <input
            type="password"
            placeholder="Contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            style={styles.input} // Aplicamos estilo al input
            onFocus={handleFocus}
            onBlur={handleBlur}
            aria-required="true"
          />
          <br /><br />
          {error && <p style={styles.mensajeError}>{error}</p>}
          <button
            type="submit"
            style={styles.botonSubmit} // Aplicamos estilo al botón
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = palette.acentoHover;
              e.currentTarget.style.transform = 'scale(1.03)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = palette.acento;
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;