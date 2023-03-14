import React from 'react';
import { MyComponent } from '../Components/MyComponent';
import { MyContext } from './MyContext';
import { AllContext } from './MyContext';

import { Route, Routes, Navigate } from 'react-router-dom';

function AppUI() {
    const { s, ls, f, lf } = React.useContext(AllContext);

    React.useEffect(() => {
        f.validateRunMode();
    }, [s?.exinit]);

    // -------------------   Set cookies from front this can be use for validate login   ------------------- //
    React.useEffect(() => {
        const date = new Date();
        const miliseconds = 1000 * 60 * 60 * 10;
        date.setTime(date.getTime() + (miliseconds));
        const dateExpired = date.toUTCString();
        const expires = 'expires=' + dateExpired
        const miCookie = "miCookie=" + 'data_de_mi_cookie' + ";" + expires + ";path=/";
        document.cookie = miCookie;

        f.helloWorld();
    }, []);
    return (
        <div className={`text-${s.classNames.less}`}>
            <div 
                className={`full-page-container page-dark animate__animated ${ls.theme === 'dark' ? 'animate__fadeInLeft' : 'animate__fadeOutRight'}`}
            ></div>
            <div 
                className={`full-page-container page-light animate__animated ${ls.theme === 'light' ? 'animate__fadeInLeft' : 'animate__fadeOutBottomRight'}`}
            ></div>
            <Routes>
                {/* -----------   Home   ----------- */}
                <Route
                    path="/"
                    element={
                        <MyComponent />
                    }
                />
                {/* -----------   Default   ----------- */}

                {/* -----------   404   ----------- */}
                <Route path="not-found/" element={<div className='text-danger h1 text-center mt-5'>404 Not Found</div>} />
                {/* -----------   /404   ----------- */}

                {/* -----------   Redirect   ----------- */}
                <Route path="*" element={<Navigate to="/not-found/" />} />
                {/* -----------   /Redirect   ----------- */}

            </Routes>
        </div>
    );
}

function App(props) {
    return (
        <MyContext>
            <AppUI />
        </MyContext>
    );
}

export default App;
