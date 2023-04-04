import { Link, Outlet, RootRoute, Route, Router, RouterProvider } from "@tanstack/react-router";
import "./App.css";

import { About, Homepage } from "./pages";

// Create a root route
const rootRoute = new RootRoute({
    component: Root,
});

function Root() {
    return (
        <>
            <div>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
            </div>
            <hr />
            <Outlet />
        </>
    );
}

// Create an index route
const indexRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "/",
    component: Homepage,
});

const aboutRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "/about",
    component: About,
});

// Create the route tree using your routes
const routeTree = rootRoute.addChildren([indexRoute, aboutRoute]);

// Create the router using your route tree
const router = new Router({ routeTree });

// Register your router for maximum type safety
declare module "@tanstack/router" {
    interface Register {
        router: typeof router;
    }
}

export default function App() {
    return <RouterProvider router={router} />;
}
