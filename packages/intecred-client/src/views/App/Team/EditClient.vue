<script>
import axios from 'axios';
import api from '../../../services/api';
import { date } from '../../../helpers';
import Label from '../../../components/Label.vue';
import IntModal from '../../../components/Modal.vue';
import IconPlus from '../../../assets/svgs/icon-plus.svg';
import IntInput from '../../../components/Input.vue';
import InputCpf from '../../../components/InputCpf.vue';
import IntUpload from '../../../components/Upload.vue';
import IconCheck from '../../../assets/svgs/icon-checked.svg';
import IconArrow from '../../../assets/svgs/icon-arrow-left.svg';
import IconDelete from '../../../assets/svgs/icon-delete.svg';

export default {
  components: {
    Label,
    InputCpf,
    IntModal,
    IntInput,
    IconPlus,
    IntUpload,
    IconCheck,
    IconArrow,
    IconDelete,
  },
  data: () => ({
    step: 0,
    key: false,
    edit: false,
    time: null,
    active: '',

    form: {
      type: 'CPF',
      single: {
        rg: '',
        car: '',
        name: '',
        rural: '',
        status: '',
        document: '',
        spouse: {
          rg: '',
          cpf: '',
          name: '',
        },
        documents: {
          personal: [],
          registration: [],
        },
      },
      legal: {
        name: '',
        fantasy: '',
        document: '',
        documents: {
          assembly: [],
          contract: [],
        },
        representative: {
          rg: '',
          cpf: '',
          name: '',
          status: '',
          location: {
            uf: '',
            cep: '',
            county: '',
            address: '',
            regional: '',
            neighborhood: '',
          },
          profession: '',
          nationality: '',
        },
      },
      location: {
        uf: '',
        cep: '',
        county: '',
        number: '',
        address: '',
        regional: '',
        complement: '',
        neighborhood: '',
      },
      contact: {
        emails: [
          {
            emailId: '',
            email: '',
          },
        ],
        phones: [
          {
            phoneId: '',
            phone: '',
          },
        ],
        comments: '',
      },
    },
    feedback: false,
  }),

  provide: () => ({
    onCreateTeam: true,
  }),

  computed: {

    steps() {
      return [
        {
          path: 'identificacao',
          label: 'Identificação',
        },
        {
          path: 'endereco',
          label: 'Endereço',
        },
        {
          path: 'contatos',
          label: 'Contatos',
        },
        {
          path: 'procuradores',
          label: 'Representante',
        },
        {
          path: 'documentos',
          label: 'Documentos pessoais',
        },
      ];
    },
    status() {
      return [
        {
          value: 'single',
          label: 'Solteiro',
        },
        {
          value: 'married',
          label: 'Casado',
        },
        {
          value: 'divorced',
          label: 'Divorciado',
        },
      ];
    },
    states() {
      return [
        {
          value: 'SP',
          label: 'São Paulo',
        },
        {
          value: 'MG',
          label: 'Minas Gerais',
        },
        {
          value: 'RJ',
          label: 'Rio de Janeiro',
        },
        {
          value: 'ES',
          label: 'Espírito Santo',
        },
      ];
    },
    cities() {
      return [
        {
          value: 'Araguari',
          label: 'Araguari',
        },
        {
          value: 'Goiânia',
          label: 'Goiânia',
        },
        {
          value: 'Ituiutaba',
          label: 'Ituiutaba',
        },
        {
          value: 'Uberlândia',
          label: 'Uberlândia',
        },
        {
          value: 'Indianópolis',
          label: 'Indianópolis',
        },
      ];
    },
    regions() {
      return [
        {
          value: 'Araguari',
          label: 'Araguari',
        },
        {
          value: 'Goiânia',
          label: 'Goiânia',
        },
        {
          value: 'Ituiutaba',
          label: 'Ituiutaba',
        },
        {
          value: 'Uberlândia',
          label: 'Uberlândia',
        },
        {
          value: 'Indianópolis',
          label: 'Indianópolis',
        },
      ];
    },

    isDisabled() {
      const {
        id = null,
      } = this.$route.params;

      return id && !this.edit;
    },
  },
  methods: {

    load_cep() {
      // const url_cep;
      this.form.location.cep = this.form.location.cep.trim().replace(/[^0-9]/g, '');
      // this.cep = 'https://viacep.com.br/ws/' + this.cep + '/json';
      // clear all headers axios to viacep
      // axios.defaults.headers.common = null;
      axios.get(`https://cors-anywhere.herokuapp.com/https://viacep.com.br/ws/${this.form.location.cep}/json`).then((response) => {
        this.form.location.address = response.data.logradouro;
        this.form.location.neighborhood = response.data.bairro;
        this.form.location.uf = response.data.uf;
        this.form.location.county = response.data.localidade;
      }).catch((error) => {
        console.log(error.statusText);
      });
    },
    load_cep_rep() {
      // const url_cep;
      this.form.legal.representative.location.cep = this.form.legal.representative.location.cep.trim().replace(/[^0-9]/g, '');
      // this.cep = 'https://viacep.com.br/ws/' + this.cep + '/json';
      // clear all headers axios to viacep
      // axios.defaults.headers.common = null;
      axios.get(`https://cors-anywhere.herokuapp.com/https://viacep.com.br/ws/${this.form.representante.cep}/json`).then((response) => {
        this.form.legal.representative.location.address = response.data.logradouro;
        this.form.legal.representative.location.neighborhood = response.data.bairro;
        this.form.legal.representative.location.uf = response.data.uf;
        this.form.legal.representative.location.county = response.data.localidade;
      }).catch((error) => {
        console.log(error.statusText);
      });
    },

    handleScroll(id) {
      const {
        offsetTop = null,
      } = document.querySelector(`#${id}`) || {};

      if (!offsetTop) {
        return;
      }

      this.active = id;

      const top = ['endereco', 'contatos', 'procuradores'].includes(id)
        ? offsetTop - 80
        : offsetTop;

      window.scrollTo({
        top,
        behavior: 'smooth',
      });
    },

    async HandleClient(id) {
      const {
        data: {
          type,
          user,
          contact,
          created,
          location,
        },
      } = await axios.get(`${this.$url}/cliente/CarregarCliente?clienteId=${id}`,
        {
          headers:
          {
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
            empresaId: localStorage.getItem('empresa_Id').toString(),
          },
        });
      console.log('Editando', axios.get(`${this.$url}/cliente/CarregarCliente?clienteId=${id}`,
        {
          headers:
          {
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
            empresaId: localStorage.getItem('empresa_Id').toString(),
          },
        }));
      const typeUser = type === 'CPF' ? 'single' : 'legal';

      this.form = {
        ...this.form,
        type,
        contact,
        created,
        location,
        [typeUser]: user,
      };
      console.log('form', this.form);
    },

    back() {
      if (this.time) {
        clearTimeout(this.time);
      }

      this.$router.push('/clientes');
    },

    clear() {
      /**
       * @todo clear data
       */
      if (this.time) {
        clearTimeout(this.time);
      }

      this.feedback = false;

      this.form = {
        type: 'CPF',
        single: {
          rg: '',
          car: '',
          name: '',
          rural: '',
          status: '',
          document: '',
          spouse: {
            rg: '',
            cpf: '',
            name: '',
          },
          documents: {
            personal: [],
            registration: [],
          },
        },
        legal: {
          name: '',
          fantasy: '',
          document: '',
          documents: {
            assembly: [],
            contract: [],
          },
          representative: {
            rg: '',
            cpf: '',
            name: '',
            status: '',
            location: {
              uf: '',
              cep: '',
              county: '',
              address: '',
              regional: '',
              neighborhood: '',
            },
            profession: '',
            nationality: '',
          },
        },
        location: {
          uf: '',
          cep: '',
          county: '',
          number: '',
          address: '',
          regional: '',
          complement: '',
          neighborhood: '',
        },
        contact: {
          emails: [
            {
              emailId: '',
              email: '',
            },
          ],
          phones: [
            {
              phoneId: '',
              phone: '',
            },
          ],
          comments: '',
        },
      };

      this.key = !this.key;

      this.handleScroll('identificacao');
    },

    async submit() {
      const {
        type,
        legal,
        single,
        contact,
        location,
      } = this.form;
      const user = type === 'CPF' ? single : legal;

      const updatedObj = {
        type,
        user,
        contact,
        location,
        created: date(),
      };

      const {
        id = null,
      } = this.$route.params || {};

      if (id) {
        updatedObj.id = id;
        // await api.put(`/cliente/clients/${id}`, updatedObj)
        console.log('Put ->', id);
        await axios.post(`${this.$url}/cliente/${id}`, updatedObj,
          {
            headers:
            {
              Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
              empresaId: localStorage.getItem('empresa_Id').toString(),
            },
          }).then(() => {
          this.feedback = true;

          // const {
          //   //documents,
          // } = data.user;

          const { form } = this;
          /**
           * Exemplo de implementação do envio de arquivos para a API
           */
          const formData = new FormData();
          console.log('docs->', form.single.documents);
          console.log('conta->', user.documents.personal.length);

          form.single.documents.personal.forEach((file) => {
            formData.append('documentospessoais', file.file.raw);
          });
          form.single.documents.registration.forEach((file) => {
            formData.append('comprovantesendereco', file.file.raw);
          });
          form.legal.documents.contract.forEach((file) => {
            formData.append('contratos', file.file.raw);
          });
          form.legal.documents.assembly.forEach((file) => {
            formData.append('atasassembleias', file.file.raw);
          });
          // Inicio
          // for (let i = 0; i < user.documents.personal.length; i += 1) {
          //   const file = form.single.documents.personal[i].raw;
          //   formData.append('documentospessoais', file[i]);

          //   // form.append(`file[${i}]`, user.documents.personal[i].raw);
          // }
          // for (let i = 0; i < user.documents.registration.length; i += 1) {
          //   const file = form.single.documents.registration[i].raw;
          //   formData.append('comprovantesendereco', file[i]);

          //   // form.append(`file[${i}]`, user.documents.personal[i].raw);
          // }
          // -- Acaba
          // for (let i = 0; i < user.documents.residence.length; i += 1) {
          //   const file = form.single.documents.residence[i].raw;
          //   formData.append('comprovantesendereco', file);
          // }
          console.log('Cliente Id', id);
          console.log('Personal Length', user.documents.personal.length);
          console.log('Registration Length', user.documents.registration.length);
          if (form.single.documents.personal.length > 0
          || form.single.documents.registration.length > 0
          || form.legal.documents.contract.length > 0 || form.legal.documents.assembly.length) {
            axios.post(`${this.$url}/cliente/upload?clienteId=${id.toString()}`, formData,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
                  'Content-Type': 'multipart/form-data',
                },
              })
              .catch(() => {
                this.errors.submit = 'Desculpe, verifique os dados e tente novamente.';
              });
          }

          // if (user.documents.residence.length > 0) {
          //   axios.post(`${this.$url}/cliente/upload?clienteId=${id.toString()}`, formData,
          //     {
          //       headers: {
          //         Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
          //         'Content-Type': 'multipart/form-data',
          //       },
          //     });
          // }

          this.time = () => {
            this.feedback = false;

            this.$nextTick(() => {
              const {
                fullPath = '',
              } = this.$route || {};

              if (fullPath !== '/clientes') {
                this.$router.push('/clientes');
              }
            });
          };
        });

        return;
      }

      await api.post('/clients', updatedObj)
        .then(async ({ data }) => {
          this.feedback = true;

          const {
            documents,
          } = data.user;

          /**
           * Exemplo de implementação do envio de arquivos para a API
           */
          const form = new FormData();

          for (let i = 0; i < documents.personal.length; i += 1) {
            form.append(`file[${i}]`, user.documents.personal[i].raw);
          }
          for (let i = 0; i < documents.registration.length; i += 1) {
            form.append(`file[${i}]`, user.documents.registration[i].raw);
          }
          for (let i = 0; i < documents.contract.length; i += 1) {
            form.append(`file[${i}]`, user.documents.contract[i].raw);
          }
          for (let i = 0; i < documents.assembly.length; i += 1) {
            form.append(`file[${i}]`, user.documents.assembly[i].raw);
          }

          // for (let i = 0; i < documents.residence.length; i += 1) {
          //   form.append(`file[${i}]`, user.documents.residence[i].raw);
          // }

          await api.post('/images', form, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          this.time = () => {
            this.feedback = false;

            this.$nextTick(() => {
              const {
                fullPath = '',
              } = this.$route || {};

              if (fullPath !== '/clientes') {
                this.$router.push('/clientes');
              }
            });
          };
        });
    },

    addValue(type) {
      if (type === 'phone') this.form.contact.phones.push({ phone: '', phoneId: '' });
      if (type === 'email') this.form.contact.emails.push({ email: '', emailId: '' });
    },

    deleteValue(type, index) {
      if (type === 'phone') this.form.contact.phones.splice(index, 1);
      if (type === 'email') this.form.contact.emails.splice(index, 1);
    },
  },

  mounted() {
    const {
      id = null,
    } = this.$route.params;

    if (id !== null) {
      this.HandleClient(id);
    }
  },
};
</script>

<template>
  <div class="create-user">
    <div class="create-user__head">
      <RouterLink
        to="/clientes"
        class="p1"
      >
        <IconArrow />Clientes
      </RouterLink>

      <h2>Novo cliente</h2>
    </div>

    <div
      ref="body"
      class="create-user__body"
      id="identificacao"
    >
      <ul class="create-user__steps">
        <li
          :key="path"
          v-text="label"
          class="create-user__steps-item p1"
          v-for="({ label, path }) in steps"
          @click.prevent="handleScroll(path)"
          :class="{ 'is-active': path === active }"
          v-show="form.type === 'CPF' && path !== 'representantes' || form.type === 'CNPJ'"
        />
      </ul>

      <form
        :key="key"
        class="create-user__form"
        @submit.prevent="submit"
        enctype="multipart/form-data"
      >
        <Label label="Identificação do Cliente" />

        <!-- Tipo do cliente -->
        <div class="create-user__form-type create-user__radio-box">
          <p class="p2">Tipo do cliente:</p>

          <el-radio-group
            v-model="form.type"
            :disabled="isDisabled"
          >
            <el-radio
              label="CPF"
              :class="{ 'create-user__radio': form.type === 'CPF' }"
            >
              Pessoa Física
            </el-radio>

            <el-radio
              label="CNPJ"
              class="create-user__radio-box--last"
              :class="{ 'create-user__radio': form.type === 'CNPJ' }"
            >
              Pessoa Jurídica
            </el-radio>
          </el-radio-group>
        </div>

        <!-- Informações básicas do cliente - CPF -->
        <div
          v-if="form.type === 'CPF'"
          class="create-user__form-group"
        >
          <!-- Nome -->
          <div class="create-user__form-item">
            <int-input
              :disabled="isDisabled"
              label="Nome do cliente"
              v-model="form.single.name"
              placeholder="Nome completo"
              :class="{ 'is-disabled': isDisabled }"
            />
          </div>

          <!-- CPF e RG -->
          <div class="create-user__form-item is-multi">
            <InputCpf
              label="CPF"
              :disabled="isDisabled"
              v-model="form.single.document"
              placeholder="000.000.000-00"
              v-mask="'###.###.###-##'"
              :class="{ 'is-disabled': isDisabled }"
            />

            <int-input
              label="RG"
              :disabled="isDisabled"
              v-model="form.single.rg"
              placeholder="000000000"
              :class="{ 'is-disabled': isDisabled }"
            />
          </div>

          <!-- Número de inscrição -->
          <div class="create-user__form-item">
            <int-input
              :disabled="isDisabled"
              label="Número de inscrição de Produtor Rural"
              v-model="form.single.rural"
              placeholder="Número de inscrição de Produtor Rural"
              :class="{ 'is-disabled': isDisabled }"
            />
          </div>

          <!-- Número do CAR -->
          <div class="create-user__form-item">
            <int-input
              :disabled="isDisabled"
              label="Número do CAR (Cadastro Ambiental Rural)"
              v-model="form.single.car"
              placeholder="CAR (Cadastro Ambiental Rural)"
              :class="{ 'is-disabled': isDisabled }"
            />
          </div>

          <!-- Estado civil -->
          <div class="create-user__form-item">
            <int-input
              filterable
              label="Estado civil"
              :disabled="isDisabled"
              v-model="form.single.status"
              placeholder="Selecione o estado civil"
              :class="{ 'is-disabled': isDisabled }"
              isSelect
            >

              <el-option
                v-for="item in status"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </int-input>
          </div>

          <!-- Nome do cônjuge -->
          <div
            class="create-user__form-item"
            v-if="form.single.status === 'married'"
          >
            <int-input
              label="Nome do cônjuge"
              :disabled="isDisabled"
              v-model="form.single.spouse.name"
              :class="{ 'is-disabled': isDisabled }"
              placeholder="Nome completo do cônjuge"
            />
          </div>

          <!-- CPF e RG do cônjuge -->
          <div
            class="create-user__form-item is-multi"
            v-if="form.single.status === 'married'"
          >
            <InputCpf
              label="CPF do cônjuge"
              :disabled="isDisabled"
              v-model="form.single.spouse.cpf"
              placeholder="000.000.000-00"
              v-mask="'###.###.###-##'"
              :class="{ 'is-disabled': isDisabled }"
            />

            <int-input
              label="RG do cônjuge"
              :disabled="isDisabled"
              v-model="form.single.spouse.rg"
              placeholder="00.000.000-0"
              v-mask="'##.###.###-#'"
              :class="{ 'is-disabled': isDisabled }"
            />
          </div>
        </div>

        <!-- Informações básicas do cliente - CNPJ -->
        <div
          v-else
          class="create-user__form-group"
        >
          <!-- Razão social -->
          <div class="create-user__form-item">
            <int-input
              label="Razão social"
              :disabled="isDisabled"
              v-model="form.legal.name"
              placeholder="Razão social"
              :class="{ 'is-disabled': isDisabled }"
            />
          </div>

          <!-- Nome fantasia e CNPJ -->
          <div class="create-user__form-item is-multi">
            <int-input
              label="Nome fantasia"
              :disabled="isDisabled"
              v-model="form.legal.fantasy"
              placeholder="Nome fantasia"
              :class="{ 'is-disabled': isDisabled }"
            />

            <int-input
              label="CNPJ"
              :disabled="isDisabled"
              v-model="form.legal.document"
              placeholder="00.000.000/0000-00"
              v-mask="'##.###.###/####-##'"
              :class="{ 'is-disabled': isDisabled }"
            />
          </div>
        </div>

        <!-- Informações de endereço do cliente -->
        <div
          class="create-user__form-group"
          id="endereco"
        >
          <Label label="Endereço" />

          <!-- CEP -->
          <div class="create-user__form-item">
            <int-input
              label="CEP"
              :disabled="isDisabled"
              v-model="form.location.cep"
              placeholder="000000-000"
              v-mask="'#########'"
              v-on:input="load_cep"
              :class="{ 'is-disabled': isDisabled }"
            />
          </div>

          <!-- Endereço -->
          <div class="create-user__form-item">
            <int-input
              label="Endereço"
              :disabled="isDisabled"
              v-model="form.location.address"
              placeholder="Endereço completo do cliente"
              :class="{ 'is-disabled': isDisabled }"
            />
          </div>

          <!-- Número e Complemento -->
          <div class="create-user__form-item is-multi">
            <int-input
              label="Número"
              :disabled="isDisabled"
              v-model="form.location.number"
              placeholder="Número da residência"
              :class="{ 'is-disabled': isDisabled }"
            />

            <int-input
              label="Complemento"
              :disabled="isDisabled"
              v-model="form.location.complement"
              placeholder="Complemento da residência"
              :class="{ 'is-disabled': isDisabled }"
            />
          </div>

          <!-- Bairro -->
          <div class="create-user__form-item">
            <int-input
              label="Bairro"
              :disabled="isDisabled"
              v-model="form.location.neighborhood"
              placeholder="Bairro da residência"
              :class="{ 'is-disabled': isDisabled }"
            />
          </div>

          <!-- Cidade -->
          <div class="create-user__form-item">
            <int-input
              label="Cidade"
              :disabled="isDisabled"
              v-model="form.location.county"
              placeholder="Cidade"
              maxlength="50"
              :class="{ 'is-disabled': isDisabled }"
            />
          </div>

          <!-- UF -->
          <div class="create-user__form-item">
            <int-input
              label="UF"
              :disabled="isDisabled"
              v-model="form.location.uf"
              placeholder="UF"
              maxlength="2"
              :class="{ 'is-disabled': isDisabled }"
            />
          </div>

          <!-- UF e Munícipio
          <div class="create-user__form-item is-multi">
            <int-input
              label="UF"
              :disabled="isDisabled"
              v-model="form.location.uf"
              placeholder="Estado"
              :class="{ 'is-disabled': isDisabled }"
              remote
              isSelect
              filterable
            >
              <el-option
                v-for="item in states"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </int-input>

            <int-input
              label="Município"
              :disabled="isDisabled"
              v-model="form.location.county"
              placeholder="Selecione o munícipio"
              :class="{ 'is-disabled': isDisabled }"
              remote
              isSelect
              filterable
            >
              <el-option
                v-for="item in cities"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </int-input>
          </div> -->

        <!-- Regional -->
          <div class="create-user__form-item">
            <int-input
              label="Regional"
              :disabled="isDisabled"
              v-model="form.location.regional"
              placeholder="Digite a Regional do cliente"
              :class="{ 'is-disabled': isDisabled }"
              maxlength="30"
            />
          </div>
        </div>

        <!-- Informações de contato do cliente -->
        <div
          class="create-user__form-group"
          id="contatos"
        >
          <Label label="Contatos" />

          <!-- Telefones -->
          <div class="create-user__form-item is-multi">
            <div class="group-input">
              <int-input
                :disabled="isDisabled"
                v-for="(item, index) in form.contact.phones"
                :key="item.phoneId"
                :label="`Telefone ${index > 0 ? index + 1 : ''}`"
                v-model="item.phone"
                placeholder="(xx) xxxx-xxxx"
                :class="{ 'is-disabled': isDisabled }"
                v-mask="['(##) ####-####', '(##) #####-####']"
              >
                <template #action>
                  <button
                    v-if="form.contact.phones.length > 1 && !isDisabled"
                    @click.prevent="deleteValue('phone', item.phoneId)"
                    class="input__icon icon-button"
                  >
                    <IconDelete />
                  </button>
                </template>
              </int-input>
            </div>

            <button
              v-if="!isDisabled"
              class="input__icon icon-button"
              @click.prevent="addValue('phone')"
            >
              <IconPlus />
            </button>
          </div>

          <!-- Emails -->
          <div class="create-user__form-item is-multi">
            <div class="group-input">
              <int-input
                :disabled="isDisabled"
                v-for="(item, index) in form.contact.emails"
                :key="item.emailId"
                :label="`Email ${index > 0 ? index + 1 : ''}`"
                v-model="item.email"
                :class="{ 'is-disabled': isDisabled }"
                placeholder="Digite o email"
              >
                <template #action>
                  <button
                    v-if="form.contact.emails.length > 1 && !isDisabled"
                    @click.prevent="deleteValue('email', item.emailId)"
                    class="input__icon icon-button"
                  >
                    <IconDelete />
                  </button>
                </template>
              </int-input>
            </div>

            <button
              v-if="!isDisabled"
              class="input__icon icon-button"
              @click.prevent="addValue('email')"
            >
              <IconPlus />
            </button>
          </div>

          <!-- Observações -->
          <div class="create-user__form-item">
            <int-input
              label="Observações"
              :disabled="isDisabled"
              v-model="form.contact.comments"
              :class="{ 'is-disabled': isDisabled }"
              placeholder="Observações do contato"
            />
          </div>
        </div>

        <!-- Informações do representante de pessoa jurídica -->
        <div
          id="procuradores"
          :disabled="isDisabled"
          v-if="form.type === 'CNPJ'"
          class="create-user__form-group"
        >
          <Label label="Representante de pessoa jurídica" />

          <!-- Nome -->
          <div class="create-user__form-item">
            <int-input
              :disabled="isDisabled"
              label="Nome do representante"
              :class="{ 'is-disabled': isDisabled }"
              v-model="form.legal.representative.name"
              placeholder="Nome completo"
            />
          </div>

          <!-- CPF e RG -->
          <div class="create-user__form-item is-multi">
            <InputCpf
              label="CPF"
              :disabled="isDisabled"
              v-model="form.legal.representative.cpf"
              placeholder="000.000.000-00"
              v-mask="'###.###.###-##'"
              :class="{ 'is-disabled': isDisabled }"
            />

            <int-input
              label="RG"
              :disabled="isDisabled"
              v-model="form.legal.representative.rg"
              placeholder="000000000"
              :class="{ 'is-disabled': isDisabled }"
            />
          </div>

          <!-- Profissão -->
          <div class="create-user__form-item">
            <int-input
              label="Profissão"
              :disabled="isDisabled"
              v-model="form.legal.representative.profession"
              placeholder="Profissão"
              :class="{ 'is-disabled': isDisabled }"
            />
          </div>

          <!-- Nacionalidade e Estado civil -->
          <div class="create-user__form-item is-multi">
            <!-- Nacionalidade -->
            <int-input
              label="Nacionalidade"
              :disabled="isDisabled"
              v-model="form.legal.representative.nationality"
              placeholder="Nacionalidade"
              :class="{ 'is-disabled': isDisabled }"
            />

            <!-- Estado civil -->
            <int-input
              label="Estado civil"
              :disabled="isDisabled"
              v-model="form.legal.representative.status"
              placeholder="Selecione o estado civil"
              :class="{ 'is-disabled': isDisabled }"
              isSelect
              filterable
            >
              <el-option
                v-for="item in status"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </int-input>
          </div>

          <!-- CEP -->
          <div class="create-user__form-item">
            <int-input
              label="CEP"
              :disabled="isDisabled"
              v-model="form.legal.representative.location.cep"
              placeholder="Cep da residencia"
              v-mask="'########'"
              :class="{ 'is-disabled': isDisabled }"
            />
          </div>

          <!-- Endereço -->
          <div class="create-user__form-item">
            <int-input
              label="Endereço"
              :disabled="isDisabled"
              :class="{ 'is-disabled': isDisabled }"
              v-model="form.legal.representative.location.address"
              placeholder="Endereço"
            />
          </div>

          <!-- Bairro -->
          <div class="create-user__form-item">
            <int-input
              label="Bairro"
              :disabled="isDisabled"
              v-model="form.location.neighborhood"
              placeholder="Bairro da residência"
              :class="{ 'is-disabled': isDisabled }"
            />
          </div>

          <!-- UF e Munícipio -->
          <div class="create-user__form-item is-multi">
            <int-input
              label="UF"
              :disabled="isDisabled"
              v-model="form.location.uf"
              placeholder="Estado"
              :class="{ 'is-disabled': isDisabled }"
              remote
              isSelect
              filterable
            >
              <el-option
                v-for="item in states"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </int-input>

            <int-input
              label="Município"
              :disabled="isDisabled"
              v-model="form.location.county"
              placeholder="Selecione o munícipio"
              :class="{ 'is-disabled': isDisabled }"
              remote
              isSelect
              filterable
            >
              <el-option
                v-for="item in cities"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </int-input>
          </div>

          <!-- Regional -->
          <div class="create-user__form-item">
            <int-input
              label="Regional"
              :disabled="isDisabled"
              v-model="form.location.regional"
              :class="{ 'is-disabled': isDisabled }"
              placeholder="Selecione a regional do cliente"
              remote
              isSelect
              filterable
            >
              <el-option
                v-for="item in regions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </int-input>
          </div>
        </div>

        <!-- Informações de documento do cliente - CPF -->
        <div
          id="documentos"
          v-if="form.type === 'CPF'"
          class="create-user__form-group"
        >
          <Label label="Documentos pessoais" />

          <int-upload
            :disabled="isDisabled"
            title="Documentos pessoais"
            description="Como RG, CPF e CNH."
            v-model="form.single.documents.personal"
            :key="form.single.documents.personal.length"
          />

          <int-upload
            :disabled="isDisabled"
            title="Comprovante de Endereço"
            v-model="form.single.documents.registration"
            description="Para atestar o endereço cadastrado."
            :key="form.single.documents.registration.length"
          />
        </div>

        <!-- Informações de documento do cliente - CNPJ -->
        <div
          id="documentos"
          v-if="form.type === 'CNPJ'"
          class="create-user__form-group"
        >
          <Label label="Documentos pessoais" />

          <int-upload
            :disabled="isDisabled"
            title="Contrato ou Estatuto Social"
            description="Anexar última versão do contrato ou estatuto social da empresa."
            v-model="form.legal.documents.assembly"
          />

          <int-upload
            :disabled="isDisabled"
            title="Última ata de assembléia"
            description="Para cooperativas."
            v-model="form.legal.documents.contract"
          />
        </div>

        <div class="create-user__form-actions">
          <el-button
            type="terciary"
            @click.prevent="back"
          >
            {{ isDisabled ? 'Voltar' : 'Cancelar' }}
          </el-button>

          <RouterLink
            v-if="isDisabled"
            to="#identificacao"
          >
            <el-button
              type="primary"
              @click="edit = true"
            >
              Editar
            </el-button>
          </RouterLink>

          <el-button
            v-else
            type="primary"
            native-type="submit"
          >
            Concluir
          </el-button>
        </div>
      </form>
    </div>

    <int-modal :show="feedback">
      <div class="modal-feedback">
        <div class="modal-feedback__message">
          <span>
            <IconCheck />
          </span>
          <h2>
            {{ edit ? 'Cliente editado com sucesso!' : 'Cliente cadastrado com sucesso!' }}
          </h2>
        </div>

        <div class="modal-feedback__actions">
          <el-button
            :type="edit ? 'primary' : 'terciary'"
            @click.prevent="back"
          >
            Visualizar clientes
          </el-button>

          <el-button
            v-if="!edit"
            type="primary"
            @click.prevent="clear"
            class="modal-feedback__actions--create"
          >
            Cadastrar novo cliente
          </el-button>
        </div>
      </div>
    </int-modal>
  </div>
</template>

<style lang="scss">
.create-user {
  &__head {
    top: 112px;
    display: flex;
    position: fixed;
    flex-direction: column;
    a {
      color: $--color-gray-6;
      display: flex;
      align-items: center;
      svg {
        margin-right: 10px;
      }
    }
    h2 {
      color: $--color-gray-7;
      margin-top: 4px;
    }
  }
  &__body {
    display: flex;
    margin-top: 36px;
  }
  &__steps {
    top: 212px;
    width: fit-content;
    padding: 32px;
    position: fixed;
    box-shadow: $--box-shadow-base;
    border-radius: 4px;
    background-color: $--color-gray-1;
    &-item {
      color: $--color-gray-6;
      cursor: pointer;
      display: flex;
      align-items: center;
      transition: all 0.4s ease-in-out;
      &:hover {
        color: $--color-gray-7;
      }
      &:not(:first-child) {
        margin-top: 12px;
      }
      &::before {
        width: 4px;
        height: 4px;
        content: '';
        display: flex;
        margin-right: 8px;
        border-radius: 4px;
        background-color: transparent;
      }

      &.is-active {
        color: $--color-primary;
        &::before {
          background-color: $--color-primary;
        }
      }
    }
  }
  &__form {
    width: 100%;
    margin: 100px 0 0 280px;
    &-type {
      display: flex;
      margin-top: 40px;
      align-items: center;
      p {
        color: $--color-gray-6;
      }
      .el-radio-group {
        margin-left: 30px;
      }
    }
    &-group {
      margin-top: 48px;
      .upload {
        margin-top: 28px;
      }
    }
    &-item {
      &.is-multi {
        display: flex;
        align-items: flex-end;
        .group-input {
          width: 100%;
          & > .input:not(:first-child) {
            margin-top: 24px;
          }
        }
        & > .input:not(:first-child) {
          margin-left: 16px;
        }
      }
      &:not(:first-child) {
        margin-top: 28px;
      }

      .is-disabled {
        .el-input {
          &__inner {
            padding: 0px !important;

            &::placeholder {
              color: $--color-secondary-dark-1 !important;
            }

            &:hover {
              border-color: transparent !important;
            }
          }

          &__suffix {
            display: none;
          }
        }
      }

      .is-disabled {
         &.input label {
          color: $--color-gray-6 !important;
        }
      }
    }
    &-actions {
      display: flex;
      border-top: 1px solid $--color-gray-5;
      margin-top: 32px;
      padding-top: 32px;
      align-items: center;
      justify-content: flex-end;
      .el-button {
        margin-left: 24px !important;
      }
    }
  }

  &__radio {
    .el-radio__label {
      color: $--color-gray-7 !important;
    }
  }

  .modal-feedback {
    display: flex;
    flex-direction: column;
    &__message {
      display: flex;
      align-items: center;
      span {
        height: 64px;
        display: flex;
        min-width: 64px;
        align-items: center;
        border-radius: 50%;
        justify-content: center;
        background-color: $--color-success-light-2;
      }
      h2 {
        color: $--color-success;
        margin-left: 16px;
      }
    }
    &__actions {
      display: flex;
      margin-top: 36px;
      align-items: center;
      justify-content: center;

      &--create {
        margin-left: 10px;
      }
    }
  }
}

  @media screen and (min-width: 375px) and (max-width: 768px) {
    .create-user {
      display: flex;
      padding: 0px 20px;
      box-sizing: border-box;
      flex-flow: column nowrap;

      &__radio-box {
        align-items: flex-start;

        .p2 {
          flex-shrink: 0;
        }

        &--last {
          margin-left: 0px !important;
        }

        .el-radio-group {
          display: flex;
          flex-flow: column nowrap;
        }
      }

      &__head {
        top: 0px;
        position: relative;
      }

      &__body {
        margin-top: 20px;
        flex-flow: column nowrap;
      }

      &__steps {
        display: none;
      }

      &__form {
        margin: 0px;
      }
    }
  }

  @media screen and (min-width: 768px) and (max-width: 1080px) {
    .create-user {
      padding: 0px 20px;
    }
  }
</style>
