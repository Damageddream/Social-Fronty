import { useState } from "react";

type value = boolean | null

export default function useToggle(defaultValue:value) {
    const [value, setValue] = useState(defaultValue)

    function toggleValue(value:value) {
        setValue(currentValue => typeof value === 'boolean'? value: !currentValue)
    }

    return [value, toggleValue]
}