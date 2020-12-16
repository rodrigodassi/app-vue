import Vue from 'vue';
import VueRouter from 'vue-router';

import Auth from './layouts/auth.vue';
import Blank from './layouts/blank.vue';
import Navigate from './layouts/navigate.vue';

import Team from './views/App/Team/Team.vue';
import Titles from './views/App/Title/Titles.vue';
import CreatePhysicalTitle from './views/App/Title/Physical/Create.vue';
import CreateGuarantee from './views/App/Guarante/Create.vue';
import TeamCreate from './views/App/Team/Create.vue';
import Dashboard from './views/App/Dashboard.vue';
import AuthSignIn from './views/Auth/SignIn.vue';
import AuthSignInExternal from './views/Auth/SignInExternal.vue';
import AuthRecovery from './views/Auth/Recovery.vue';
import Document from './views/App/Document/Document.vue';
import Part from './views/App/Part/Part.vue';
import Draft from './views/App/Draft/Draft.vue';
import DraftAnalyse from './views/App/Draft/DraftAnalyse.vue';
import CompleteCPR from './views/App/CompleteCPR/CompleteCPR.vue';
import CreateFinancialTitle from './views/App/Title/Financial/FinancialCreate.vue';

/**
 * Install Vue Router.
 */
Vue.use(VueRouter);

/**
 * Auth routes.
 */
const auth = {
  path: '/auth/',
  redirect: '/auth/login',
  component: Auth,
  name: 'Login',
  children: [
    {
      path: 'login',
      component: AuthSignIn,
      meta: {
        requiresVisitor: true,
      },
    },
    {
      path: 'recovery',
      component: AuthRecovery,
      meta: {
        requiresVisitor: true,
      },
    },
    {
      path: 'external/:email/:pass?',
      name: 'External',
      component: AuthSignInExternal,
      meta: {
        requiresVisitor: true,
      },
    },
  ],
};

/**
 * Team routes.
 */
const team = {
  path: 'clientes',
  name: 'Team',
  component: Blank,
  children: [
    {
      path: '',
      component: Team,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: 'novo',
      component: TeamCreate,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/clientes/criar/:id?',
      component: TeamCreate,
      name: 'CreateTeam',
      meta: {
        requiresAuth: true,
      },
    },
  ],
};

/**
 * Main routes.
 */
const main = {
  path: '/',
  component: Navigate,
  children: [
    {
      path: '',
      redirect: '/auth/login',
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: 'titulos',
      component: Titles,
      name: 'Titles',
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/titulo-cpr-fisica/:titulo/editar/passo/:step',
      component: CreatePhysicalTitle,
      name: 'CreatePhysicalTitle',
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: 'titulo-cpr-fisica/:titulo/garantias/criar',
      component: CreateGuarantee,
      name: 'Guarantee',
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: 'titulo-cpr-fisica/:titulo/documentos',
      component: Document,
      name: 'Document',
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: 'titulo-cpr-fisica/:titulo/partes',
      component: Part,
      name: 'Part',
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: 'titulo-cpr-fisica/:titulo/minuta',
      component: Draft,
      name: 'Draft',
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: 'titulo-cpr-fisica/:titulo/cpr-completa',
      component: CompleteCPR,
      name: 'CompleteCPR',
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/titulo-cpr-financeira/:titulo/editar/passo/:step',
      component: CreateFinancialTitle,
      name: 'CreateFinancialTitle',
      meta: {
        requiresAuth: true,
      },
    },
    team,
  ],
};

const drafts = {
  name: 'DraftAnalyse',
  path: '/drafts/analyse',
  component: DraftAnalyse,
  meta: {
    requiresAuth: true,
  },
};

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  duplicateNavigationPolicy: 'ignore',
  scrollBehavior(to) {
    if (to.hash) {
      return { selector: to.hash };
    }
    return { x: 0, y: 0 };
  },
  routes: [
    auth,
    main,
    drafts,
  ],
});

export default router;
