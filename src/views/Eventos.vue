<template>
  <v-container>
    <v-card class="mx-auto overflow-hidden">      
      <v-data-table :headers="headers" :items="cursos" class="elevation-5">
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title class="text-center">Cursos de Oswaldo en Vuetify</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  Nuevo Evento
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row tile>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.id"
                          label="ID"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.evento"
                          label="Nombre Evento"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.estado"
                          label="Estado"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.horas"
                          label="Numero de Horas"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.diploma"
                          label="Tipo de Diploma"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Cancelar
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="save">
                    Guardar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5"
                  >Esta seguro de eliminar este evento?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >Cancelar</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                    >Aceptar</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <v-row no-gutters class="pa-2">
            <v-col cols="4" sm="2" md="2">
              <v-btn color="primary" x-small fab dark>
                <v-icon small @click="editItem(item)"> mdi-pencil </v-icon>
              </v-btn>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="4" sm="2" md="2">
              <v-btn color="primary" x-small fab dark>
                <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </template>
        
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize"> Reset </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template> 

<script>
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "ID", value: "id", sortable: false, align: "start" },
      { text: "Descripcion del Evento", value: "evento" },
      { text: "Estado", value: "estado" },
      { text: "Numero de Horas", value: "horas" },
      { text: "Tipo de Diploma", value: "diploma" },
      { text: "", value: "actions", sortable: false },
    ],
    cursos: [],
    editedIndex: -1,
    editedItem: {
      id: "",
      evento: "",
      estado: "",
      horas: "",
      diploma: "",
    },
    defaultItem: {
      id: "",
      evento: "",
      estado: "",
      horas: "",
      diploma: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo Evento" : "Editar Evento";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  /*************Metodo que llama la API para llenar array de cursos virtuales del CNB */
  created() {
    this.initialize();
  },

  methods: {
    async initialize() {
      try {
        const cursosDB = await this.axios.get(
          "https://cnbcolombia.com/node/ApiACNB/cursos"
        );

        // console.log(cursosDB.data);

        await cursosDB.data.forEach((element) => {
          // console.log(element);
          let item = {};
          item.id = element.value;
          item.evento = element.text;
          item.estado = element.ESTADO;
          item.horas = element.NumeroHoras;
          item.diploma = element.TipoDiploma;
          this.cursos.push(item);
        });
      } catch (error) {
        console.log(error);
      }
    },

    editItem(item) {
      this.editedIndex = this.cursos.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.cursos.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.cursos.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.cursos[this.editedIndex], this.editedItem);
      } else {
        this.cursos.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>