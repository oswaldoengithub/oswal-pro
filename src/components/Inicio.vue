<template>
  <v-app>    
    <!--**********FORMULARIO INICIO DE SESION**********-->
    <v-container>
       <v-dialog
        v-model="dialog"
        persistent
        max-width="600px"
      >
        <v-row align="center" justify="center">
          <v-col cols="12" md="8" sm="8">
            <v-card class="elevation-12">            
              <v-card-text class="mt-12">
                <h1 class="text-center display-2 teal--text text--accent-3">
                  inicia sesion
                </h1>
                <div class="text-center" mt-4>
                  <v-btn class="mx-2" fab small outlined color="indigo">
                    <v-icon dark> mdi-facebook </v-icon>
                  </v-btn>

                  <v-btn class="mx-2" fab small outlined color="success">
                    <v-icon dark> mdi-google </v-icon>
                  </v-btn>

                  <v-btn class="mx-2" fab dark small outlined color="blue">
                    <v-icon dark> mdi-twitter </v-icon>
                  </v-btn>
                  <v-btn class="mx-2" fab dark small outlined color="blue darken-2">
                    <v-icon dark> mdi-linkedin </v-icon>
                  </v-btn>
                  <v-btn class="mx-2" fab dark small outlined color="pink darken-4">
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
                      id="contrase??a"
                      label="contrase??a"
                      name="Contrase??a"
                      :type="showpassword ? 'text' : 'password'"
                      color="primary"
                      prepend-icon="lock"
                      :append-icon="showpassword ? 'mdi-eye' : 'mdi-eye-off'"
                      @click:append="showpassword = !showpassword"
                      v-model="contrase??a"
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
                          :to="{ name: 'olvido' }"
                          >Olvid?? mi Contrase??a?</v-btn
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
      </v-dialog>
    </v-container>
    <v-snackbar  color="green darken-2" v-model="snackbar">inicio de sesion exitoso</v-snackbar>
    <!--**********FIN CUADRO INICIO DE SESION**********-->
  </v-app>
</template>

<script>
export default {
  name: 'Inicio',
  data: () => ({
    dialog: true,
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
      v => /.+@.+\..+/.test(v) || ' Tu E-mail debe ser v??lido',
    ],
    contrase??a:"",
    contrasenaRules: [
        v => !!v || 'Contrase??a Requerida',
        v => (v && v.length >= 4) || 'Tu Contrase??a debe ser mayor de 4 caracteres',        
      ],
        
  }),
  methods:{
    submitHandler(){
      if (this.$refs.formulario.validate()) {
          this.cargando = true
          console.log(this.email, this.contrase??a)
        setTimeout(this.handler = () => {
          this.cargando = false
          this.snackbar = true
        }, 
        this.timeout = 500,
        this.$refs.formulario.reset())
        this.dialog = false             
      }           
    }
    /* axios.post()
    .then()
    .catch() */   
  } 
};
</script>