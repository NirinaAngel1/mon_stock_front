'use client';

import React, { ReactNode } from 'react';

type FormField = {
    name: string;
    label: string;
    type?: string;
    placeholder?: string;
    disabled?: boolean;
};

type FormWrapperProps = {
    title?: string;
    description?: string;
    fields: FormField[];
    onSubmit: (data: Record<string, any>) => void | Promise<void>;
    submitLabel?: string;
    children?: ReactNode;
    disabled?: boolean;
};

export default function FormWrapper({
    title,
    description,
    fields,
    onSubmit,
    submitLabel = "Envoyer",
    children,
    disabled
}: FormWrapperProps) {
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(disabled) return;
        const formData = new FormData(e.currentTarget);
        const data: Record<string, any> = {};

        fields.forEach(field => {
            data[field.name] = formData.get(field.name);
        });

        // Supporte aussi bien les fonctions sync que async
        await onSubmit(data);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-indigo-100 p-8 rounded shadow-md w-full max-w-md md:max-w-lg mx-auto flex flex-col justify-center gap-4"
        >
            {title && (
                <h2 className="text-2xl text-primary font-bold text-center my-4">
                    {title}
                </h2>
            )}

            {description && (
                <p className="text-center text-gray-600 mb-2">{description}</p>
            )}

            {fields.map(field =>
                field.type === "textarea" ? (
                    <textarea
                        key={field.name}
                        name={field.name}
                        placeholder={field.placeholder}
                        className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary"
                        disabled={disabled || field.disabled}
                    />
                ) : (
                    <input
                        key={field.name}
                        name={field.name}
                        type={field.type || "text"}
                        placeholder={field.placeholder}
                        disabled={disabled || field.disabled}
                        className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                )
            )}

            {children}

            <button
                type="submit"
                disabled={disabled}
                className="bg-primary hover:bg-primary-light text-white py-2 rounded transition font-medium"
            >
                {submitLabel}
            </button>
        </form>
    );
}
