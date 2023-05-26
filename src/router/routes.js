import {lazy } from 'react';
import Index from '../view/Index';

const routes = [
    {
        path: '/',
        name: 'index',
        component: Index,
        meta: {
            title: '首页'
        },
        children: [
            {
                path: '/system',
                name: 'system',
                component: lazy(() => import('../view/System/Menu')),
                meta: {
                    title: '系统管理'
                },
                children: [
                    {
                        path: '/system/menu',
                        name: 'menu',
                        component: lazy(() => import('../view/System/Menu')),
                        meta: {
                            title: '菜单管理'
                        }
                    }
                ]
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: lazy(() => import('../view/Login')),
        meta: {
            title: '登录页'
        }
    },
    {
        path: '*',
        name: '404',
        component: lazy(() => import('../view/NotFound')),
        meta: {
            title: '404页面'
        }
    }
]

export default routes;
