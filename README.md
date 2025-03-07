Aquí tienes la consigna para el proyecto de la página de viajes:

---

## **Proyecto: Planificador de Viajes Interactivo** ✈️🌍

### **Objetivo**

Crear una aplicación web que ayude a los usuarios a planificar sus viajes, mostrando recomendaciones de destinos, actividades, clima y opciones gastronómicas basadas en la ciudad seleccionada.

### **Requisitos**

✅ **Uso de React con Hooks avanzados** (`useContext`, `useReducer`, `useMemo`, `useCallback`).  
✅ **Fetching de datos desde APIs externas**.  
✅ **Filtrado y optimización de renderizado con `useMemo`**.  
✅ **Uso de `useReducer` para manejar el estado del itinerario de viaje**.  
✅ **Context global con `useContext` para almacenar preferencias del usuario (moneda, idioma, destinos guardados, etc.)**.

---

### **Funcionalidades Principales**

1. **Búsqueda de destinos**:
   - El usuario ingresa el nombre de una ciudad y obtiene recomendaciones de lugares para visitar.
   - **API sugerida**: [OpenTripMap](https://opentripmap.com/)
2. **Información detallada del destino**:

   - Datos de la ciudad (ubicación, población, puntos turísticos).

3. **Gestión del Itinerario (con `useReducer`)**:

   - Permite agregar actividades a una lista de planificación.
   - El usuario puede eliminar o reordenar actividades.

4. **Preferencias de usuario (con `useContext`)**:

   - Almacena opciones como moneda, idioma y lista de ciudades favoritas.

5. **Optimización de renderizado**:
   - `useMemo`: Para calcular datos como costos estimados o duración de viaje sin recalcular en cada render.
   - `useCallback`: Para evitar re-renderizados innecesarios en funciones de filtrado o búsqueda.

---
