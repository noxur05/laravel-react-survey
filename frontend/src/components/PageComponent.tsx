import React from 'react';

interface PageComponentProps {
    title: string;
    buttons: React.ReactNode;
    children: React.ReactNode;
}

const PageComponent: React.FC<PageComponentProps> = ({ title, children, buttons  }) => {
    return (
        <>
         <header className="bg-white shadow-sm">
            <div className="flex justify-between items-center mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                    {title}
                </h1>
                {buttons}
            </div>
        </header>
        <main>
            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                {children}
            </div>
        </main>
        </>
    );
};

export default PageComponent;