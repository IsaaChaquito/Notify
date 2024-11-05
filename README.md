# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh



# Sistema de Notificaciones Personalizadas

Este sistema de notificaciones permite manejar diferentes tipos de notificaciones en tu aplicación de forma flexible y personalizable. A continuación se detallan los pasos para la configuración y uso de este sistema.

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
notify.success('Notificación exitosa!');


##Para personalizar la notificación, se le puede pasar un objeto de settings

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
