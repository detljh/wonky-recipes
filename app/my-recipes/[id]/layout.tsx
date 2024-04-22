import React from "react";

export default function MyRecipesLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <div>
            {children}
        </div>
    )
}