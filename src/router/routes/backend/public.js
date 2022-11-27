import {
  HomePage,
  ForumListPage,
  ForumSavePage,
  BawasluUpdateListPage,
  BawasluUpdateDetailPage,
  GalleryPage
} from 'views'

const PublicRoutes = [
  {
    path: '/home',
    component: HomePage,
    meta: {
      publicRoute: true
    }
  },
  {
    path: '/forum',
    component: ForumListPage,
    meta: {
      publicRoute: true
    },
    className: 'bg-grey-lighter-1'
  },
  {
    path: '/forum/create',
    component: ForumSavePage,
    meta: {
      publicRoute: true
    },
    className: 'bg-grey-lighter-1'
  },
  {
    path: '/bawaslu_update',
    component: BawasluUpdateListPage,
    meta: {
      publicRoute: true
    }
  },
  {
    path: '/bawaslu_update/:slug',
    component: BawasluUpdateDetailPage,
    meta: {
      publicRoute: true
    }
  },
  {
    path: '/gallery',
    component: GalleryPage,
    meta: {
      publicRoute: true
    }
  }
]

export default PublicRoutes
