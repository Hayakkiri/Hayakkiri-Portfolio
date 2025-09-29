import {createBrowserRouter} from "react-router-dom";

import App from "../App";

import Homepage from "../pages/Homepage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Homepage />
            }
        ]
    }
])

export default router;