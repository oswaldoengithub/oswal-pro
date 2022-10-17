<template>
  <v-app>    
    <!--**********FORMULARIO INICIO DE SESION**********-->
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="12" md="8" sm="8">
          <v-card class="elevation-12">            
            <v-card-text class="mt-12">
              <h1 class="text-center display-2 teal--text text--accent-3">
                inicia sesion
              </h1>
              <div class="text-center" mt-4>
                <v-btn class="mx-2" fab small outlined color="primary">
                  <v-icon dark> mdi-facebook </v-icon>
                </v-btn>

                <v-btn class="mx-2" fab small outlined color="success">
                  <v-icon dark> mdi-google </v-icon>
                </v-btn>

                <v-btn class="mx-2" fab dark small outlined color="pink">
                  <v-icon dark> mdi-twitter </v-icon>
                </v-btn>
                <v-btn class="mx-2" fab dark small outlined color="pink">
                  <v-icon dark> mdi-linkedin </v-icon>
                </v-btn>
                <v-btn class="mx-2" fab dark small outlined color="pink">
                  <v-icon dark> mdi-instagram </v-icon>
                </v-btn>
              </div>
              <h4 class="text-center mlt-4">
                Siguenos en nuestras Redes Sociales
              </h4>
            </v-card-text>
              <v-form 
                @submit.prevent="submitHandler"
                ref="formulario"
                v-model="validar"
                lazy-validation
              >
                <v-card-text >
                  <v-text-field
                    label="E-mail"
                    name="Email"
                    prepend-icon="email"
                    type="text"
                    color="primary"
                    v-model="email"
                    :rules="emailRules"
                    required
                  />

                  <v-text-field
                    id="contraseña"
                    label="contraseña"
                    name="Contraseña"
                    :type="showpassword ? 'text' : 'password'"
                    color="primary"
                    prepend-icon="lock"
                    :append-icon="showpassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showpassword = !showpassword"
                    v-model="contraseña"
                    :rules="contrasenaRules"
                    required
                  />
                    <v-switch 
                    label="Recuerdame"
                    class="mt-n1" 
                    color="primary"
                    >
                    </v-switch>
                    <div class="text-center ">
                      <v-btn x-small text rounded outlined class="text-center mt-3"
                        >Olvidé mi Contraseña?</v-btn
                      >
                    </div>
                    <div class="text-center pb-2">
                      <v-btn x-small text rounded outlined class="text-center mt-3"
                        >Registrate</v-btn
                      >
                    </div>
                      <v-card-actions class="justify-center ">
                    <div>
                      <v-btn 
                      :disabled ="!validar"
                      :loading ="cargando"
                      type ="submit" 
                      rounded color="primary"
                      >Ingresar
                      </v-btn>
                    </div>
                  </v-card-actions>
                </v-card-text>  
              </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-snackbar top color="green darken-2" v-model="snackbar">inicio de sesion con exito</v-snackbar>
    <!--**********FIN CUADRO INICIO DE SESION**********-->
  </v-app>
</template>

<script>
export default {
  name: 'Inicio',
  data: () => ({
    drawer: false,
    group: null,    
    showpassword: false,
    error:false,
    error_msg:"",
    validar: true,
    cargando:false,
    snackbar:false,    
    email:"",
    emailRules: [
      v => !!v || 'E-mail Requerida',
      v => /.+@.+\..+/.test(v) || ' Tu E-mail debe ser válido',
    ],
    contraseña:"",
    contrasenaRules: [
        v => !!v || 'Contraseña Requerida',
        v => (v && v.length >= 4) || 'Tu Contraseña debe ser mayor de 4 caracteres',        
      ],
        
  }),
  methods:{
    submitHandler(){
      if (this.$refs.formulario.validate()) {
          this.cargando= true
          console.log(this.email, this.contraseña)
        setTimeout(this.handler=()=>{
          this.cargando= false
          this.snackbar= true
        }, 
        this.timeout= 1500,
        this.$refs.formulario.reset())      
      }           
    }     
  },

  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>