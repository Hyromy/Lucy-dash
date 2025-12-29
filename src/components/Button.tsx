import type { ReactNode } from "react"
import { useState } from "react"

type ButtonProps = {
    children: ReactNode,
    isLoading?: boolean,
    callback?: () => any
}
export default function Button({
    children,
    isLoading,
    callback
}: ButtonProps) {
    const handleClick = () => {
        callback?.()
    }

    return <button
        type="button"
        className={`btn btn-${isLoading ? "secondary" : "primary"}`}
        disabled={isLoading}
        onClick={handleClick}>
            {isLoading ? "Cargando..." : children}
    </button>
}
