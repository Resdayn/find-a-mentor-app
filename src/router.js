import {createRouter, createWebHistory} from "vue-router ";

const router = createRouter({
    history: createWebHistory(), 
    routes: [
        {path: '/', redirect: '/mentors'},
        {path: '/mentors', component: null},
        {path: '/mentors/:id', component: null, children: [
           {path: 'contact', component: null}, // This will load the contact page for a specific mentor
        ]},
        {path: '/register', component: null},
        {path: '/requests', component: null},
        {path: '/:notFound(.*)', component: null}
        
    ]
});

export default router;