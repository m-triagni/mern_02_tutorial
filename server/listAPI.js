exports.listAPI = {
    API:'/api',
    API_Test:'/test',

    API_Register: '/register',
    API_Activate: '/register/activate',
    API_Login: '/login',
    API_ForgetPassword: '/forget-password',
    API_ResetPassword: '/reset-password',

    API_User: '/user',  
    API_Admin: '/admin', 

    API_CategoryList: '/categories',
    API_CategorySave:  '/category',
    API_CategoryDelete: '/category/:id', 
    API_CategoryRead: '/category/:categorySlug', 
  
    API_LinkSave: '/link',
    API_LinkList: '/links',
    API_LinkListByUser: '/links-byuser',
    API_LinkRead: '/link/:id', 
    API_LinkReadPopular: '/link-popular', 
    API_LinkReadPopularByCategory: '/link-popular-bycategory/:slug', 
    API_LinkReadNewest: '/link-newest', 
    API_LinkDelete: '/link/:id',  
    API_LinkUpdateClickCount: '/link-clickcount',
     
}

