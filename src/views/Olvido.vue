<template>
<v-app>
    <v-container>
        <v-row justify="center">
            <v-card 
            v-model="dialog"
            max-height="400px"
            max-width="400px"
            class="elevation-12"
            >
                <v-card-title>
                <span class="text-h5">Restablecer Contraseña</span>
                </v-card-title>
                <v-form 
                    @submit.prevent="submitHandler"
                    ref="formulario"
                    v-model="validar"
                    lazy-validation
                >
                    <v-card-text >
                        <v-select
                        label="Tipo de Documento *"
                        name="Tipo"
                        v-model="item"
                        :rules="[v => !!v || 'Item is required']"
                        :items="items"                                            
                        required
                        ></v-select>
                    
                        <v-text-field
                            label="Numero de Documento *"
                            name="Numero"                            
                            v-model="numero"
                            required
                        />      
                        <small>* Campos Obligatorios</small>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="blue darken-1"
                                text
                                :disabled ="!validar" 
                                type ="submit"                                           
                            >Restablecer Contraseña
                            </v-btn>
                        </v-card-actions>
                    </v-card-text>
                </v-form>
            </v-card>    
        </v-row>
    </v-container>
  <v-snackbar
    color="green darken-2"
    v-model="snackbar"
    >Contraseña Restablecida con exito
  </v-snackbar>
  </v-app>
</template>
<script>
  export default {
    data: () => ({
      dialog:"",
      snackbar:false,
      validar: true,      
      item: null,
      numero:"",      
      items: [
        'Cedula de Ciudadania',
        'Cedula de Extranjeria',
        'Tarjeta de Identidad',
        'Pasaporte',
      ],
    }),
    methods:{
        submitHandler(){
            if (this.$refs.formulario.validate()) {
                console.log(this.item, this.numero)
                setTimeout(this.handler = () => {
                this.snackbar = true
                }, 
                this.timeout = 500,
                this.$refs.formulario.reset())
                this.to="{ name: 'olvido' }"           
            }           
        }
    } 
  }
</script>