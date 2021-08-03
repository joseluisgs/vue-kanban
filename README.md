# Vue-Kanban
Sencilla aplicación en Vue.js 3 para gestionar tareas y actividades usando Kanban.

[![Vue Ready](https://img.shields.io/badge/Vue.js%20v3-%20Ready-%2342b983)](https://es.vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178c6)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-Ready-orange)](https://firebase.google.com)
[![Code Style](https://img.shields.io/badge/JS%20Style-AirBnB-ff69b4)](https://airbnb.io/javascript)
[![Licence](https://img.shields.io/github/license/joseluisgs/photo-gallery-ionic)](./LICENSE)
![GitHub](https://img.shields.io/github/last-commit/joseluisgs/vue-kanban)
[![Netlify Status](https://api.netlify.com/api/v1/badges/643fbc00-dfa4-425c-929c-1f9cd79f499f/deploy-status)](https://app.netlify.com/sites/vuekanban/deploys)

![Portada](https://blog.acelerato.com/wp-content/uploads/2016/02/kanban-melhoria-conti%CC%81nua.png)
- [Vue-Kanban](#vue-kanban)
  - [Sobre el proyecto](#sobre-el-proyecto)
    - [Composition Api](#composition-api)
    - [Vuex vs Pinia](#vuex-vs-pinia)
  - [Despliegue](#despliegue)
  - [Project setup](#project-setup)
    - [Compiles and hot-reloads for development](#compiles-and-hot-reloads-for-development)
    - [Compiles and minifies for production](#compiles-and-minifies-for-production)
    - [Run your unit tests](#run-your-unit-tests)
    - [Run your end-to-end tests](#run-your-end-to-end-tests)
    - [Lints and fixes files](#lints-and-fixes-files)
    - [Customize configuration](#customize-configuration)
  - [Autor](#autor)
    - [Contacto](#contacto)
  - [Licencia](#licencia)
      - [Agradecimientos](#agradecimientos)

## Sobre el proyecto
El objetivo de este proyecto es mostrar el uso de Vue.js para hacer un gestor de tareas usando Vue.js siguiendo la filosofía Kanban y usando Firebase para almacenar la información.

### Composition Api 
Además se va a implementar siguiendo algunas de las bondades de Vue.js 3 como es el paso de Options Api a Composition Api y sus ventajas de hacer reutilizable parte del código entre componentes sin repetir. 
- [Vue.js 3 Composition Api](https://v3.vuejs.org/guide/composition-api-introduction.html#why-composition-api)
- [Vue.js 3 ¿Por qué?](https://learnvue.co/2020/01/4-vue3-composition-api-tips-you-should-know/)
- [Vue.js 3 Composable Code](https://markus.oberlehner.net/blog/vue-3-composition-api-vs-options-api/)

En este proyecto intercalaremos las dos opciones para ver pros y contras. De todas maneras las gran ventaja de Composition es cuando tu componente es grande y quieres organizar la lógica o simplemente compartir usando Mixins. Aún así se pueden mezclar las dos filosofías como también se verá.

### Vuex vs Pinia
Sabemos que [Vuex](https://vuex.vuejs.org/) es una solución para manejar el Store de nuestra aplicación en Vue.js. Pero conocemos sus debilidades actuales a la hora de manejar TypeScript. De hecho hay que recurrir a algunos trucos, como los decoradores de TypeScript para que no fracasemos en el intento.

[Pinia](https://pinia.esm.dev/) es una solución propuesta por uno de los creadores de Vuex y marca las nuevas tendencias de lo que Vuex podrá ser. Integra perfectamente TypeScript y su filosofía de trabajo es ágil, a parte de que su rendimiento es algo mayor. Una comparativa puede verse [aquí](https://blog.logrocket.com/pinia-vs-vuex/).

En este proyecto usaremos Pinia, porque mejora enormemente el uso de TypeScript en Vue.js para las Store y nos permite tener una Store desacoplada y accesible sin necesidad de módulos.

## Despliegue
Este proyecto esta desplegado en [Netlify](https://vuekanban.netlify.app/).

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Autor

Codificado con :sparkling_heart: por [José Luis González Sánchez](https://twitter.com/joseluisgonsan)

[![Twitter](https://img.shields.io/twitter/follow/joseluisgonsan?style=social)](https://twitter.com/joseluisgonsan)
[![GitHub](https://img.shields.io/github/followers/joseluisgs?style=social)](https://github.com/joseluisgs)

### Contacto
<p>
  Cualquier cosa que necesites házmelo saber por si puedo ayudarte 💬.
</p>
<p>
    <a href="https://twitter.com/joseluisgonsan" target="_blank">
        <img src="https://i.imgur.com/U4Uiaef.png" 
    height="30">
    </a> &nbsp;&nbsp;
    <a href="https://github.com/joseluisgs" target="_blank">
        <img src="https://cdn.iconscout.com/icon/free/png-256/github-153-675523.png" 
    height="30">
    </a> &nbsp;&nbsp;
    <a href="https://www.linkedin.com/in/joseluisgonsan" target="_blank">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/768px-LinkedIn_logo_initials.png" 
    height="30">
    </a>  &nbsp;&nbsp;
    <a href="https://joseluisgs.github.io/" target="_blank">
        <img src="https://www.lazaroamor.es/img/develop.png" 
    height="30">
    </a>
</p>

## Licencia

Este proyecto esta licenciado bajo licencia **MIT**, si desea saber más, visite el fichero
[LICENSE](./LICENSE) para su uso docente y educativo.

#### Agradecimientos
Este proyecto está basado en el tutorial de [Carlos Azaustre](https://github.com/carlosazaustre/vue-trello). Gracias por el contenido 🙂