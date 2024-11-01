import {
  ComplaintPage,
  HomePage,
  ForumListPage,
  ForumListChannelPage,
  ForumSavePage,
  ForumDetailPage,
  BawasluUpdateListPage,
  BawasluUpdateDetailPage,
  GalleryPage,
  FactCheckPage,
  lembagaPage,
  FormKerjasama
} from 'views'

const PublicRoutes = [
  {
    path: '/home',
    component: HomePage,
    meta: {
      publicRoute: true
    },
    className: '!max-w-full !px-0'
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
    path: '/forum/channel/:channelid',
    component: ForumListChannelPage,
    meta: {
      publicRoute: true
    },
    className: 'bg-grey-lighter-1'
  },
  {
    path: '/forum/:slug',
    component: ForumDetailPage,
    meta: {
      publicRoute: true
    },
    className: 'bg-grey-lighter-1'
  },
  {
    path: '/bawaslu-update',
    component: BawasluUpdateListPage,
    meta: {
      publicRoute: true
    }
  },
  {
    path: '/bawaslu-update/:slug',
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
  },
  {
    path: '/pengaduan',
    component: ComplaintPage,
    meta: {
      publicRoute: true
    },
    className: 'bg-grey-lighter-1'
  },
  {
    path: '/cek-fakta',
    component: FactCheckPage,
    meta: {
      publicRoute: true
    }
  },
  {
    path: '/hubungan-antar-lembaga',
    component: lembagaPage,
    meta: {
      publicRoute: true
    }
  },
  {
    path: '/hubungan-antar-lembaga/form_kerja_sama',
    component: FormKerjasama,
    meta: {
      publicRoute: true
    }
  }
]

export default PublicRoutes
