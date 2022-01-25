import AllCandidates from './AllCandidates.svelte'
import ByOffice from './ByOffice.svelte'
import ByParty from './ByParty.svelte'
//import Error from './Error.svelte'

export default [
  {
    path: '/',
    component: AllCandidates
  },
  {
    path: '/by-office',
    component: ByOffice
  },
  {
    path: '/by-office/:office',
    component: ByOffice
  },
  {
    path: '/by-party',
    component: ByParty,
  },
  {
    path: '/by-party/:party',
    component: ByParty
  }
]
