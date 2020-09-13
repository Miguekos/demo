# Cuidappte (formq)

A Quasar Framework app

## Install the dependencies
```bash
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```


### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).


### Updates ###
1.- Camara Nativa \
2.- Guardar en app \
3.- Notificar diariamente las personas que no marquen su temp. \
4.- Reporte por registro \
5.- Modificar reportes por personal \

docker-compose up -d --build quasardemo
docker build -t cuidateappg4s:1.0 .
docker-compose up -d



agregar filtros por fecha
componentes 
FiltroFechas
<FiltroFechas @click="obtenerRegistros" />
components: {
    // Search: () => import("./SearchCU")
    FiltroFechas: () => import("components/FiltroFechas")
  },

    async obtenerRegistros(val) {
      console.log("val", val);
      await this.callRegistroSegui({
        id: "all",
        fi: val.fi,
        ff: val.ff
      });
    }
    
    


copiadeproi
