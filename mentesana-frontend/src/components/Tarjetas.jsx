import React, { useState } from 'react';

// Datos de las preguntas (sin cambios en la estructura de datos)
const preguntas = [
  {
    pregunta: "¿Cómo describes tu nivel de estrés durante la semana?",
    opciones: ["Bajo", "Moderado", "Alto"],
    consejos: {
      "Bajo": "¡Genial! Sigue manteniendo hábitos saludables y rutinas que te ayuden a gestionar el estrés.",
      "Moderado": "Considera tomar pequeños descansos activos durante el día y practicar técnicas de relajación breve.",
      "Alto": "Es importante que identifiques tus detonantes de estrés. Practica ejercicios de respiración profunda y considera buscar apoyo adicional si es necesario."
    }
  },
  {
    pregunta: "¿Con qué frecuencia duermes al menos 7 horas por noche?",
    opciones: ["Siempre", "A veces", "Casi nunca"],
    consejos: {
      "Siempre": "El buen descanso mejora tu concentración y estado de ánimo. ¡Sigue así!",
      "A veces": "Trata de establecer una rutina de sueño consistente. Crea un ambiente relajante en tu habitación.",
      "Casi nunca": "Dormir bien es esencial para la salud mental. Intenta reducir el uso de pantallas antes de dormir y busca estrategias para mejorar tu higiene del sueño."
    }
  },
  {
    pregunta: "¿Con qué frecuencia hablas de tus emociones con personas de confianza?",
    opciones: ["Siempre", "A veces", "Nunca"],
    // Corregido: "Simpre" a "Siempre" para que coincida con la opción
    consejos: {
      "Siempre": "¡Excelente! Compartir tus emociones es un hábito muy saludable.",
      "A veces": "Intenta abrirte un poco más con personas en las que confías. Hablar puede aliviar la carga emocional.",
      "Nunca": "Expresar tus emociones es importante para tu bienestar. Considera hablar con un amigo, familiar o profesional."
    }
  }
];

function Tarjetas() {
  const [indice, setIndice] = useState(0);
  const [respuestas, setRespuestas] = useState([]);
  const [resultadoFinal, setResultadoFinal] = useState(null);
  const [botonPresionado, setBotonPresionado] = useState(null); // Para efecto visual en botones

  // --- Paleta de colores y fuentes (similar a Bienvenida.jsx para consistencia) ---
  const palette = {
    fondoClaro: '#E6F2F2', // Verde azulado muy pálido
    textoPrincipal: '#264653', // Azul oscuro/petróleo
    textoSecundario: '#2A9D8F', // Verde azulado
    acento: '#F4A261', // Naranja
    acentoHover: '#E76F51', // Naranja más oscuro
    blanco: '#FFFFFF',
    grisClaro: '#D1D5DB', // Para bordes o fondos sutiles
    grisMedio: '#6B7280',
    verdeConsejo: '#2A9D8F', // Color específico para consejos positivos
    amarilloConsejo: '#E7B800', // Color para consejos de atención media
    rojoConsejo: '#D9534F' // Color para consejos de atención alta
  };

  const styles = {
    contenedorGlobal: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start', // Alinea al inicio para ver la primera tarjeta arriba
      minHeight: 'calc(100vh - 60px)', // Ajustar según altura del navbar
      padding: '40px 20px',
      backgroundColor: palette.fondoClaro,
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
      color: palette.textoPrincipal,
    },
    tarjetaPregunta: {
      backgroundColor: palette.blanco,
      padding: '30px',
      borderRadius: '12px',
      boxShadow: '0px 8px 25px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '650px',
      textAlign: 'center',
      marginBottom: '30px', // Espacio por si hay una barra de progreso debajo
    },
    tituloPregunta: {
      fontSize: 'calc(1.5em + 0.5vw)',
      color: palette.textoPrincipal,
      marginBottom: '30px',
      lineHeight: '1.4',
    },
    contenedorOpciones: {
      display: 'flex',
      flexDirection: 'column', // Opciones una debajo de otra
      gap: '15px', // Espacio entre botones de opción
      marginTop: '20px',
    },
    botonOpcion: {
      backgroundColor: palette.blanco,
      color: palette.textoSecundario,
      padding: '15px 25px',
      fontSize: 'calc(1em + 0.2vw)',
      border: `2px solid ${palette.textoSecundario}`,
      borderRadius: '25px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontWeight: '600',
      width: '100%', // Botones ocupan todo el ancho disponible
      boxSizing: 'border-box',
    },
    // Vista de Resultados
    contenedorResultados: {
      backgroundColor: palette.blanco,
      padding: '30px',
      borderRadius: '12px',
      boxShadow: '0px 8px 25px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '700px',
      textAlign: 'left', // Alineación a la izquierda para mejor lectura de resultados
    },
    tituloResultados: {
      fontSize: 'calc(1.7em + 0.5vw)',
      color: palette.textoPrincipal,
      marginBottom: '30px',
      textAlign: 'center',
      borderBottom: `2px solid ${palette.grisClaro}`,
      paddingBottom: '15px',
    },
    itemResultado: {
      marginBottom: '25px',
      padding: '20px',
      border: `1px solid ${palette.grisClaro}`,
      borderRadius: '8px',
      backgroundColor: '#FAFAFA', // Un fondo muy sutil para cada item
    },
    preguntaResultado: {
      fontWeight: 'bold',
      fontSize: '1.1em',
      color: palette.textoPrincipal,
      marginBottom: '8px',
    },
    respuestaUsuario: {
      fontStyle: 'italic',
      color: palette.grisMedio,
      marginBottom: '5px',
    },
    consejoResultado: {
      color: palette.textoSecundario, // Color base del consejo
      marginTop: '10px',
      padding: '10px',
      borderRadius: '4px',
      borderLeft: `4px solid ${palette.verdeConsejo}`, // Default a verde
      backgroundColor: '#F0FDF4', // Fondo claro para el consejo
    },
    // Estilos específicos para consejos basados en la respuesta (ejemplo)
    consejoBajo: {
      borderLeft: `4px solid ${palette.verdeConsejo}`,
      backgroundColor: '#F0FDF4', // Verde claro
      color: '#166534', // Verde oscuro
    },
    consejoModerado: {
      borderLeft: `4px solid ${palette.amarilloConsejo}`,
      backgroundColor: '#FFFBEB', // Amarillo claro
      color: '#B45309', // Naranja oscuro
    },
    consejoAlto: {
      borderLeft: `4px solid ${palette.rojoConsejo}`,
      backgroundColor: '#FEF2F2', // Rojo claro
      color: '#991B1B', // Rojo oscuro
    },
    botonVolver: {
        backgroundColor: palette.acento,
        color: palette.blanco,
        padding: '12px 25px',
        fontSize: '1em',
        border: 'none',
        borderRadius: '25px',
        cursor: 'pointer',
        textDecoration: 'none',
        boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
        transition: 'background-color 0.3s ease, transform 0.2s ease',
        marginTop: '30px',
        display: 'block', // Para centrar con margin auto si es necesario
        marginLeft: 'auto',
        marginRight: 'auto',
    }
  };

  const handleRespuesta = (opcion) => {
    setBotonPresionado(opcion); // Marcar el botón presionado

    const nuevaRespuesta = {
      pregunta: preguntas[indice].pregunta,
      respuesta: opcion,
      consejo: preguntas[indice].consejos[opcion]
    };

    const nuevasRespuestas = [...respuestas, nuevaRespuesta];

    // Pequeña demora para el efecto visual antes de pasar a la siguiente pregunta
    setTimeout(() => {
      if (indice + 1 < preguntas.length) {
        setRespuestas(nuevasRespuestas);
        setIndice(indice + 1);
      } else {
        setResultadoFinal(nuevasRespuestas);
      }
      setBotonPresionado(null); // Resetear el botón presionado
    }, 300); // 300ms de demora
  };

  // Función para obtener el estilo del consejo basado en la respuesta
  const getConsejoStyle = (respuestaOpcion) => {
    // Ajusta estas condiciones según las opciones de tus preguntas
    if (respuestaOpcion === "Bajo" || respuestaOpcion === "Siempre") {
      return { ...styles.consejoResultado, ...styles.consejoBajo };
    }
    if (respuestaOpcion === "Moderado" || respuestaOpcion === "A veces") {
      return { ...styles.consejoResultado, ...styles.consejoModerado };
    }
    if (respuestaOpcion === "Alto" || respuestaOpcion === "Casi nunca" || respuestaOpcion === "Nunca") {
      return { ...styles.consejoResultado, ...styles.consejoAlto };
    }
    return styles.consejoResultado; // Estilo por defecto
  };


  if (resultadoFinal) {
    return (
      <div style={styles.contenedorGlobal}>
        <div style={styles.contenedorResultados}>
          <h2 style={styles.tituloResultados}>Resultados y Consejos</h2>
          {resultadoFinal.map((r, i) => (
            <div key={i} style={styles.itemResultado}>
              <strong style={styles.preguntaResultado}>{r.pregunta}</strong><br />
              <em style={styles.respuestaUsuario}>Tu respuesta:</em> {r.respuesta}<br />
              <div style={getConsejoStyle(r.respuesta)}>
                <strong>Consejo:</strong> {r.consejo}
              </div>
            </div>
          ))}
           <button
            style={styles.botonVolver}
            onClick={() => {
              // Resetear estados para permitir una nueva autoevaluación
              setIndice(0);
              setRespuestas([]);
              setResultadoFinal(null);
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = palette.acentoHover;
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = palette.acento;
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            Volver a Empezar
          </button>
        </div>
      </div>
    );
  }

  const preguntaActual = preguntas[indice];

  return (
    <div style={styles.contenedorGlobal}>
      <div style={styles.tarjetaPregunta}>
        <h2 style={styles.tituloPregunta}>{preguntaActual.pregunta}</h2>
        <div style={styles.contenedorOpciones}>
          {preguntaActual.opciones.map((opcion, i) => (
            <button
              key={i}
              onClick={() => handleRespuesta(opcion)}
              style={{
                ...styles.botonOpcion,
                // Cambia el estilo si el botón está presionado
                backgroundColor: botonPresionado === opcion ? palette.textoSecundario : palette.blanco,
                color: botonPresionado === opcion ? palette.blanco : palette.textoSecundario,
              }}
              onMouseEnter={(e) => {
                if (botonPresionado !== opcion) {
                  e.currentTarget.style.backgroundColor = palette.textoSecundario;
                  e.currentTarget.style.color = palette.blanco;
                }
              }}
              onMouseLeave={(e) => {
                if (botonPresionado !== opcion) {
                  e.currentTarget.style.backgroundColor = palette.blanco;
                  e.currentTarget.style.color = palette.textoSecundario;
                }
              }}
              onFocus={(e) => {
                if (botonPresionado !== opcion) {
                    e.currentTarget.style.outline = `2px solid ${palette.acento}`;
                    e.currentTarget.style.outlineOffset = '2px';
                }
              }}
              onBlur={(e) => {
                e.currentTarget.style.outline = 'none';
              }}
            >
              {opcion}
            </button>
          ))}
        </div>
      </div>
      {/* Aquí podrías añadir una barra de progreso si lo deseas */}
      {/* <div style={{ marginTop: '20px', width: '100%', maxWidth: '650px', backgroundColor: palette.grisClaro, borderRadius: '5px' }}>
        <div style={{ width: `${((indice + 1) / preguntas.length) * 100}%`, height: '10px', backgroundColor: palette.textoSecundario, borderRadius: '5px', transition: 'width 0.3s ease' }}></div>
      </div> */}
    </div>
  );
}

export default Tarjetas;