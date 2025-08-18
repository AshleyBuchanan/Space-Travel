import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import './css/App.css';

//pages
import HomePage from './pages/HomePage';
import SpacecraftInventoryPage, {spacecraftLoader} from './pages/SpacecraftInventoryPage';
import SpacecraftBuildPage from './pages/SpacecraftBuildPage';
import SpacecraftDetailsPage, { spacecraftDetailsLoader } from './pages/SpacecraftDetailsPage';
import PlanetInventoryPage, { planetsLoader } from './pages/PlanetInventoryPage';
import PlanetDetailsPage, { planetDetailsLoader } from './pages/PlanetDetailsPage';
//layouts
import RootLayout from './layouts/RootLayout';

//router
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout/>}>
            <Route index element={<HomePage/>}/>

                <Route 
                    path="spacecraft" 
                    element={<SpacecraftInventoryPage/>}
                    loader={spacecraftLoader}
                />
                <Route 
                    path="spacecraft/build" 
                    element={<SpacecraftBuildPage/>}
                />
                <Route 
                    path="spacecraft/details/:id" 
                    element={<SpacecraftDetailsPage/>}
                    loader={spacecraftDetailsLoader}
                />
                <Route 
                    path="planets" 
                    element={<PlanetInventoryPage/>}
                    loader={planetsLoader}
                />
                <Route 
                    path="planets/details/:id" 
                    element={<PlanetDetailsPage/>}
                    loader={planetDetailsLoader}
                />
        </Route>
    )
);

function App() {
    return (
        <RouterProvider router={router}/>
    );
};

export default App;
