import React, { Suspense } from 'react';
import { Routes, Route, useNavigate, useLocation, useParams, useSearchParams } from 'react-router-dom';
import routes from './routes';
import { Spin } from 'antd';


/*统一路由配置*/
const Element = function Element(props){
    let { component: Component, meta } = props;
    //修改页面title
    let { title = "首页" } = meta || {};
    document.title = title;

    //获取路由信息，基于属性传递给组件
    const navigate = useNavigate(),
          location = useLocation(),
          params = useParams(),
          [usp] = useSearchParams();

    return <Component navigate={navigate}
           location={location}
           params={params}
           usp={usp}/>
};

export default function RouterView(){
    return (
        <Suspense fallback={<Spin tip="Loading..."/>}>
            <Routes>
                { routes.map((item, index) =>{
                    let { name, path } = item;
                    return <Route
                           key= {name}
                           path= {path}
                           element= {<Element {...item}/>}/>
                  })
                }
            </Routes>
        </Suspense>
    )
};
