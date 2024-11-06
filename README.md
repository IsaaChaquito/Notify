# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh



# Sistema de Notificaciones Personalizadas

Este sistema de notificaciones permite manejar diferentes tipos de notificaciones en tu aplicación de forma flexible y personalizable. A continuación se detallan los pasos para la configuración y uso de este sistema.

## [Demo](https://www.google.com "Very interactive demo.").

## Configuración

1. **Envolver el componente principal con el `AppProvider`**

    Para utilizar las notificaciones, es necesario envolver el componente `App` en un `Provider`:

    ```javascript
    function App() {
      return (
        <AppProvider>
          <NotifyContainer />
        </AppProvider>
      )
    }

    export default App;
    ```

2. **Definir el `AppProvider`**

    El `AppProvider` utiliza un `useReducer` para manejar el estado de las notificaciones y otros posibles estados globales:

    ```javascript
    export const AppProvider = ({ children }) => {
      const [notifyState, notifyDispatch] = useReducer(notifyReducer);

      return (
        <AppContext.Provider value={{
          notifyState,
          notifyDispatch,
        }}>
          {children}
        </AppContext.Provider>
      );
    };
    ```

    En este `Provider`, se pueden agregar más `reducers`, por ejemplo, uno para un modal o un conjunto de `reducers` si el estado se vuelve complejo.

## Uso del Hook `useNotify`

Con este setup, podemos utilizar las notificaciones (`Notifies`) en cualquier componente usando el `customHook` `useNotify()`. Por ejemplo:

```javascript
const { notify } = useNotify();
const notifyObject = notify.success('Notificación exitosa!');
```

Notese que notify.type retorna un objeto con la notificación, está incluye un id además de sus settings. Es de ayuda cuando se requiere actualizar dicha notificación, ya sea el texto, el icono o cualquier cambio en otra propiedad.

## Para personalizar la notificación, se le puede pasar un objeto de settings
```javascript
const settings = {
  type: 'info',
  filled: true,
  icon: 'info',
  iconFirst: true,
  autoClose: true,
  showProgressBar: true,
  timeSettings: {
    duration: 2000,
    showTimer: true,
    timeFormat: 's',
    timerPosition: 'bottom-right',
  },
  animation: { 
    entrance: 'animate-[zoomIn_.4s_ease]', // Clase de animación (Tailwind o CSS)
    exit: 'animate-[zoomOut_.4s_ease]'
  },
};

notify.success('Notificación exitosa!', settings);
```


## Para cambiar solo una propiedad, se puede modificar directamente:
```javascript
notify.success('Notificación exitosa', { timeSettings: { duration: 5000 } });
```


## Tipos de Notificación Disponibles

### Las opciones para notify['type'] son:

    info
    success
    warning
    error
    neutral
    promise
    
    update
    remove

### Estos tipos son meramente presets, o sea, configuraciones de colores e íconos específicos. Pueden ser cambiados manualmente en las settings...

## Función notifyModel

### Cada tipo de notificación es gestionado por notifyModel, que configura los parámetros de la notificación según el tipo.
```javascript
export const notifyModel = (type, text, options) => {
  // Definición de opciones y parámetros por defecto
};
```


## Para actualizar o remover una notificación manualmente:

```javascript
notify.update() y notify.remove()
```

    Actualizar: notify.update se usa con el identificador de la notificación para cambiar sus propiedades.
    Remover: notify.remove(notifyId)

notify.promise

## Para manejar notificaciones de tipo `promise`, que pueden actualizar su estado según el resultado de una operación asíncrona:
```javascript
const notifyObj = notify.promise('Updating task...', settings);

// Operación asíncrona
updateTaskInCloud(something)
  .then((status) => {
    if (status.ok) {
      notify.update({
        ...notifyObj,
        text: 'Task updated successfully',
        icon: 'success',
        autoClose: true,
      });
    } else {
      notify.update({
        ...notifyObj,
        type: 'error'
        text: 'Error, cannot update task',
        icon: 'error',
        autoClose: true,
        timeSettings: { duration: 5000 },
      });
    }
  });
```

Nota: Las notificacines NO son asíncronas, sino más bien la operación a realizar.


## Estado y Acciones del notifyReducer

#### El estado global de las notificaciones (notifyState) es gestionado por el notifyReducer, y useNotify hace uso de este estado para facilitar el manejo de notificaciones.
```javascript
const initialState = {
  notifies: [],
  screenPositionStyle: positions['top-right'],
  screenPosition: 'top-right',
  maxLength: 7,
};
```


## Las acciones definidas incluyen:

    ADD_NOTIFY: Agregar una notificación
    REMOVE_NOTIFY: Remover una notificación
    UPDATE_NOTIFY: Actualizar una notificación
    IS_OPENING_FALSE: Cambiar el estado de apertura
    IS_CLOSING_TRUE: Cambiar el estado de cierre
    SET_NOTIFIES_POSITION: Configurar la posición de las notificaciones
    SET_MAX_LENGTH: Establecer la longitud máxima de notificaciones

## Tipos de Notificaciones e Iconos

#### El sistema incluye tipos de iconos (iconType) y una configuración de color y estilo (notifyMap) para cada tipo de notificación:
```javascript
export const iconType = {
  info: <WarningSquareIcon className="w-6 h-6" />,
  success: <CheckIcon className="w-6 h-6" />,
  warning: <WarningTriangleIcon className="w-6 h-6" />,
  error: <WarningCircleIcon className="w-6 h-6" />,
  neutral: <ExclamationIcon className="w-8 h-8" />,
  promise: <LoaderIcon className="w-6 h-6" />
};
```


## Posiciones de la Barra de Tiempo

#### Las posiciones de la barra de tiempo se manejan en timerPositionMap:
```javascript
export const timerPositionMap = {
  'top-left': '-top-0.5 left-1',
  'bottom-left': '-bottom-0.5 left-1',
  'bottom-center': '-bottom-0.5 left-1/2 right-1/2 -translate-x-1/2',
  'bottom-right': '-bottom-0.5 right-1',
};
```


## Ejemplo de useNotify
```javascript
/**
 * useNotify es un hook que gestiona el estado de las notificaciones.
 * Recibe un objeto de notificación y devuelve:
 * - notify: Métodos para agregar, actualizar o eliminar notificaciones
 * - handleClose: Función para cerrar una notificación
 * - timer: Valor actual del temporizador
 * - notifyState: Estado actual de las notificaciones
 * - notifyDispatch: Función de dispatch del estado
 * - setNotifiesPosition: Función para cambiar la posición de las notificaciones
 * - pauseTimer: Función para pausar el temporizador
 * - resumeTimer: Función para reanudar el temporizador
 */

const useNotify = (notification) => {
  const { notifyState, notifyDispatch } = useProvider();
  const [timer, setTimer] = useState(notification?.timeSettings?.duration);
  const timerControl = useRef(null);

  // Código adicional...

  return {
    notify,
    handleClose,
    timer,
    notifyState,
    notifyDispatch,
    setNotifiesPosition,
    pauseTimer: () => timerControl.current?.pause(),
    resumeTimer: () => timerControl.current?.resume(),
  };
};
```

### ¡Listo! Con este setup puedes implementar y personalizar notificaciones en tu aplicación.
