<template>
  <v-app>   
    <div>
      <v-app-bar color="primary" dark>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-container>
          <v-row class="text-center">
            <v-col>
              <h1>PAGUINA WEB DE OSWALDO EN VUETIFY</h1>
            </v-col>
          </v-row>
        </v-container>
      </v-app-bar>
       <!--**********INICIO CARRUSEL**********-->
    <v-carousel
      cycle
      height="200"
      hide-delimiter-background
      show-arrows-on-hover
    >
      <v-carousel-item
        v-for="(imagen, i) in imagenes"
        :key="i"
        :src="imagen.src"
      >
        <v-sheet>
          <v-row class="fill-height" align="center" justify="center"> </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>

    <!--**********FIN CARRUSEL**********-->
      <!--**********INICIO NAVIGATION DRAWER (CAJONES DE NAVEGACION)********-->
      <v-navigation-drawer
        v-model="drawer"
        dark
        absolute
        bottom
        temporary
        src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
      >
        <v-list nav>
          <v-list-item-group v-model="group">
            <v-list-item-title class="text-h6 text-center my-5">
              CNB COLOMBIA
            </v-list-item-title>
            <v-spacer></v-spacer>

            <v-list-item-content class="my-5">
              <v-btn text block :to="{ name: 'home' }" exact>Inicio</v-btn>
              <v-btn text block :to="{ name: 'eventos' }">Eventos</v-btn>
              <v-btn text block :to="{ name: 'participantes' }"
                >Participantes</v-btn
              >
              <v-btn text block :to="{ name: 'filtros' }">Filtros</v-btn>
              <v-btn text block :to="{ name: 'estadisticas' }"
                >Estadísticas Rethus</v-btn
              >
              <v-btn text block :to="{ name: 'certificado' }"
                >Certificados</v-btn
              >
              <v-btn text block :to="{ name: 'carnet' }"
                >Carnét Afiliado CNB</v-btn
              >
              <v-btn text block :to="{ name: 'funcionario' }"
                >Funcionario</v-btn
              >
            </v-list-item-content>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </div>
    <!--**********FIN NAVIGATION DRAWER (CAJONES DE NAVEGACION)********-->
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    group: null,
    imagenes: [
      {
        src: require("@/assets/img1.jpg"),
      },

      {
        src: require("@/assets/img2.jpg"),
      },
      {
        src: require("@/assets/img3.jpg"),
      },
      {
        src: require("@/assets/img4.jpg"),
      },
      {
        src: require("@/assets/img5.jpg"),
      },
    ],
  }),
  watch: {
    group() {
      this.drawer = false;
    },
  },
};
const port = process.env.PORT || 3000;

App.listen(port, ()=>{
    console.log('servidor a su servicio en el puerto', port);
    })
</script>
