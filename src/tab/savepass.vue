<template>
  <div>


    <mt-card title="Save Pass">
      <div class="row">
        <!--<div class="col-sm-6">
         <mt-card title="Form" minTitle="">
          <textarea class="mt-textarea" rows="10" cols="60"></textarea>
          <mt-button bg="bluegray">Submit</mt-button>
        </mt-card>
        </div> -->
        <div class="col-sm-8">
         <mt-card title="" minTitle="">
          <mt-input placeholder="Domain" inputSize="large" v-model="dataModelToSave.domain" isFlag></mt-input>
          <mt-input placeholder="Username" inputSize="large" v-model="dataModelToSave.username" isFlag></mt-input>
          <mt-input placeholder="Password" inputSize="large" v-model="dataModelToSave.password" isFlag></mt-input>
          <textarea placeholder="Description" class="app_textarea" v-model="dataModelToSave.description" isFlag></textarea>
          <component v-for="item in items" ref="itemRefs" :is="item" :key="item.name"></component>
        <div class="row" >
          <div class="custom_label_container" >
                <div class="custom_label" v-for="val in dataModelToSave.selectedLabels">{{val.value}}</div>
          </div>
      </div>
          <mt-button bg="bluegray" @click="saveData">Submit</mt-button>
          <mt-button @click="addComponent">Add Field</mt-button>
          <mt-button @click="addLabel">Add Label</mt-button>

        </mt-card>
        </div>
        
        
      </div>
    </mt-card>
    <mt-dialog title="Add Label" @confirm="dialogOkClick" v-model="add_label">
      
      <div class="row">
          <div class="col-sm-8">
            <mt-input placeholder="Label" inputSize="large" v-model="labelNameToInsert" isFlag></mt-input>
          </div>
          <div class="col-sm-4">
            <mt-button class="insert_label_btn" @click="insertLabel">Add New</mt-button>
          </div>
      </div>
       <div class="row">
          <table>
    <tbody>
      <tr v-for="val in presentLabels" class="mt-table">
        <td>
          <mt-checkbox class="m-r-20" v-model="val.checked">{{val.value}}</mt-checkbox>
        </td>
      </tr>
    </tbody>
  </table>
      </div>
     
    </mt-dialog>

    
  </div>
</template>

<script>
import ReusableInput from "./reusableInput.vue";
import CredDao from "../ext/credDao";
import CredLabels from "../ext/credLabels";
import util from "../ext/util";

export default {
  name: "SavePass",
  data() {
    return {
      dataModelToSave: {
        domain: "",
        username: "",
        password: "",
        description: "",
        extraKeyVal: [],
        selectedLabels: []
      },
      presentLabels: [],
      items: [],
      add_label: false,
      labelNameToInsert: "",
      credDao: null
    };
  },

  methods: {
    saveData() {
      const encrypted = this.credDao.encryptData(this.dataModelToSave);
      console.log("Encrypted :: ", encrypted);
      this.credDao.saveCredentail(this.dataModelToSave.domain, encrypted);
    },
    insertLabel() {
      const newLabel = { checked: false, value: "" + this.labelNameToInsert };
      this.presentLabels.push(newLabel);
    },
    initWorks() {},
    addLabel() {
      const credLabels = new CredLabels();
      this.presentLabels = credLabels.getAll();
      this.add_label = true;
    },
    addComponent() {
      const renderComponent = {
        render(h) {
          return h(ReusableInput, {
            class: ["foo"],

            props: {
              name: "Foo"
            }
          });
        }
      };

      this.items.push(renderComponent);
    },
    dialogOkClick() {
      this.dataModelToSave.selectedLabels = this.presentLabels.filter(item => {
        return item.checked;
      });
      console.log("Dialog submitted", this.dataModelToSave.selectedLabels);
      this.add_label = false;
    }
  },
  created: function() {
    const _loginObj = util.isAuth();
    this.credDao = new CredDao(_loginObj.password);
    this.initWorks();
  }
};
</script>

<style scoped>
.insert_label_btn {
  margin-top: 10px;
}

.custom_label {
  background: #2196f3;
  color: #fff;
  padding: 7px 15px;
  border-radius: 20px;
  margin: 6px;
}
.custom_label_container {
  display: flex;
  margin: 8px;
  flex-flow: wrap;
}

.app_textarea {
  border: none;
  border-bottom: 1px solid #eaeaea;
  width: 100% !important;
  height: 150px;
  font-size: 16px;
  color: #000;
}

.app_textarea :focus {
  border-bottom: 1.5px solid rgb(87, 125, 253) !important;
}

.app_textarea :active {
  border-bottom: 1.5px solid rgb(87, 125, 253) !important;
}
</style>