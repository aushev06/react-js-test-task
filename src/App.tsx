import React, {useState} from 'react';
import './App.css';
import Auth from "./pages/Auth";
import {
    BrowserRouter,
    Routes as Switch,
    Route,
    Link, Navigate, useNavigate,
} from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";
import {useSelector, useDispatch} from "react-redux";
import {selectUser, set} from "./redux/userSlice";
import {getMe} from "./core/api/auth.service";
import {Users} from "./pages/admin/Users";
import {UserForm} from "./pages/admin/Users/component/UserForm";
import {Layouts} from "./components/Layouts";
import {Tests} from "./pages/admin/Tests/Tests";
import {TestsForm} from "./pages/admin/Tests/TestsForm";
import {Test} from "./pages/admin/Tests/Test";
import {RunTest} from "./pages/admin/Tests/RunTest";


function App() {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isReady, setIsReady] = useState(false);


    React.useEffect(() => {
        const token = localStorage.getItem('token')

        if (!isReady && !token) {
            navigate('/login');
            setIsReady(true);
        }

        const effect = async () => {
            if (!user && !isReady && token) {
                const response = await getMe(token);
                dispatch(set(response));

            }
            setIsReady(true);
        }

        effect();

    }, [])

    if (!isReady) {
        return null;
    }

    return (
        <div className="wrapper">
            <Switch>
                <Route path={''} element={
                    <RequireAuth redirectTo={'/login'}>
                        <Layouts>
                            <Home/>
                        </Layouts>
                    </RequireAuth>

                }/>
                <Route path={'/login'} element={<Auth/>}/>
                <Route path={'/register'} element={<Register/>}/>
                <Route path={'/users'} element={<Layouts>
                    <Users/>
                </Layouts>}/>
                <Route path={'/users/create'} element={<Layouts>
                    <UserForm/>
                </Layouts>}/>


                <Route path={'/tests'} element={<Layouts>
                    <Tests/>
                </Layouts>}/>

                <Route path={'/tests/create'} element={<Layouts>
                    <TestsForm/>
                </Layouts>}/>

                <Route path={'/tests/:id'} element={<Layouts>
                    <Test/>
                </Layouts>}/>

                <Route path={'/tests/:id/run'} element={<Layouts>
                    <RunTest/>
                </Layouts>}/>
            </Switch>
        </div>
    );
}

type RequireAuthProps = {
    redirectTo: string;
    children: JSX.Element,
}

function RequireAuth({children, redirectTo}: RequireAuthProps) {
    return children;
}


export default App;
