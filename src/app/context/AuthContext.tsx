import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React, { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import { AuthApi } from "../../api";
import { IUserFull } from "../../types";

interface IUseAuth {
    user: IUserFull | null;
    authState: "idle" | "success" | "fail" | "inProgress";
    logIn: (loginCred: { login: string; password: string }) => void;
    logOut: (action: () => void) => void;
    authenticate: () => void;
    updateUnreadMessages: () => void;
    loginError: string | undefined;
    loginLoading: boolean;
}

const initAuth: IUseAuth = {
    loginLoading: false,
    user: null,
    loginError: undefined,
    authState: "idle",
    logIn: () => {},
    logOut: () => {},
    authenticate: () => {},
    updateUnreadMessages: () => {},
};

function useProvideAuth() {
    const [user, setUser] = useState<IUserFull | null>(null);
    const [loginError, setLoginError] = useState<string | undefined>();

    const [authState, setAuthState] = useState<"idle" | "success" | "fail" | "inProgress">("idle");

    const { mutate: authenticate } = useMutation({
        mutationFn: () => {
            setAuthState("inProgress");
            return AuthApi.authenticate();
        },
        onSuccess: (resp) => {
            setUser(resp[0]);
            setAuthState("success");
        },
        onError: (err: AxiosError<{ message: string }>) => {
            setAuthState("fail");
            toast.error(`Authenticate Error |${err.response?.data.message || ""}`);
        },
    });

    const { mutate: logIn, isLoading: loginLoading } = useMutation({
        mutationFn: (data: { login: string; password: string }) => {
            setAuthState("inProgress");
            return AuthApi.logIn(data);
        },
        onSuccess: (resp) => {
            localStorage.setItem("access_token", resp.access_token);
            localStorage.setItem("refresh_token", resp.refresh_token);
            setUser(resp.items[0]);
            setAuthState("success");
        },
        onError: (err: AxiosError<{ message: string }>) => {
            setAuthState("fail");
            setLoginError(err.response?.data.message);
        },
    });

    const logOut = (action: () => void) => {
        return AuthApi.logoutRefreshToken()
            .then(() => {
                return AuthApi.logoutAccessToken();
            })
            .then(() => {
                setUser(null);
                setAuthState("success");
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                action();
                return null;
            });
    };

    const updateUnreadMessages = () => {
        setUser((tmpUser) => {
            if (tmpUser) return { ...tmpUser, unread_messages: 0 };
            else return null;
        });
    };

    return { user, authState, logIn, loginError, loginLoading, logOut, authenticate, updateUnreadMessages };
}

export const AuthContext: React.Context<IUseAuth> = createContext<IUseAuth>(initAuth);

export const useAuth = () => {
    return useContext(AuthContext);
};

export function AuthProvider(props: { children: JSX.Element }) {
    const auth = useProvideAuth();
    return <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>;
}
