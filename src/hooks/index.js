import { useState } from "react";

export const useField = (type) => {
    const [value, setValue] = useState("");

    const onChange = (event) => {
        setValue(event.target.value);
    };

    const reset = () => {
        setValue("");
    };

    const obj = {
        type,
        value,
        onChange,
        reset,
    };
    console.log(obj);
    return obj;
};

// modules can have several named exports

export const useAnotherHook = () => {
    // ...
};
