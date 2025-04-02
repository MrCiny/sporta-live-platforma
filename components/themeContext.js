import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useState, useEffect } from "react";
import { Appearance, Platform } from "react-native";

const ThemeContext = createContext();

export function useTheme() {
    return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(Appearance.getColorScheme() || "light");

    useEffect(() => {
        async function loadTheme() {
            const getItem = async (key) => {
                if (Platform.OS === 'web')
                    return AsyncStorage.getItem(key)
                  else
                    return SecureStore.getItemAsync(key)
            }
            const savedTheme = await getItem("theme");
            if (savedTheme) {
                setTheme(savedTheme);
            }
        }
        loadTheme();
    }, []);

    const toggleTheme = async () => {
        const setItem = async (key, value) => {
            if (Platform.OS === 'web')
                return AsyncStorage.setItem(key, value)
              else
                return SecureStore.setItemAsync(key, value)
        }
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        await setItem("theme", newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}
